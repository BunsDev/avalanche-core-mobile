import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  TokenWithBalance,
  useWalletContext,
} from '@avalabs/wallet-react-components';
import {getSwapRate} from 'swap/getSwapRate';
import BN from 'bn.js';
import {getDecimalsForEVM} from 'utils/TokenTools';
import {Utils} from '@avalabs/avalanche-wallet-sdk';
import {SwapSide} from 'paraswap';
import {firstValueFrom, from} from 'rxjs';
import {map} from 'rxjs/operators';
import {performSwap} from 'swap/performSwap';
import {OptimalRate} from 'paraswap-core';
import {useGasPrice} from 'utils/GasPriceHook';

export interface SwapEntry {
  token: TokenWithBalance | undefined;
  setToken: Dispatch<TokenWithBalance>;
  amount: number;
  setAmount: Dispatch<number>;
  usdValue: string;
}

export interface TrxDetails {
  rate: string;
  slippageTol: string;
  networkFee: string;
  networkFeeUsd: string;
  avaxWalletFee: string;
}

export interface SwapContextState {
  swapFrom: SwapEntry;
  swapTo: SwapEntry;
  minDestAmount: string;
  swapFromTo: () => void;
  trxDetails: TrxDetails;
  doSwap: () => Promise<{
    swapTxHash: string;
    approveTxHash: string;
  }>;
  error: string | undefined;
}

export const SwapContext = createContext<SwapContextState>({} as any);

export const SwapContextProvider = ({children}: {children: any}) => {
  const {wallet} = useWalletContext();
  const {gasPrice$} = useGasPrice();
  const [srcToken, setSrcToken] = useState<TokenWithBalance>();
  const [srcAmount, setSrcAmount] = useState<number>(0);
  const [srcUsdAmount, setSrcUsdAmount] = useState<string>('');
  const [destToken, setDestToken] = useState<TokenWithBalance>();
  const [destAmount, setDestAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<string>('0');
  const [minAmountBig, setMinAmountBig] = useState<string>('');
  const [destUsdAmount, setDestUsdAmount] = useState<string>('');
  const [trxRate, setTrxRate] = useState<string>('');
  const [slipTol, setSlipTol] = useState<string>('.12');
  const [networkFee, setNetworkFee] = useState<string>('- AVAX');
  const [networkFeeUsd, setNetworkFeeUsd] = useState<string>('$- USD');
  const [avaxWalletFee, setAvaxWalletFee] = useState<string>('0 AVAX');
  const [swapSide, setSwapSide] = useState<SwapSide>(SwapSide.SELL);
  const [error, setError] = useState<string | undefined>(undefined);
  const [priceRoute, setPriceRoute] = useState<OptimalRate>();

  useEffect(() => {
    const amount = Utils.numberToBN(
      swapSide === SwapSide.SELL ? srcAmount : destAmount,
      getDecimalsForEVM(swapSide === SwapSide.SELL ? srcToken : destToken) ?? 0,
    ).toString();

    const subscription = from(
      getSwapRate({
        srcToken: srcToken,
        destToken: destToken,
        amount: amount,
        swapSide,
      }),
    )
      .pipe(
        map(({result, error}) => {
          if (error) {
            throw Error(error);
          }
          if (!result) {
            throw Error('No result');
          }

          const destAmount = Utils.bnToBig(
            new BN(result.destAmount),
            result.destDecimals,
          );
          const srcAmount = Utils.bnToBig(
            new BN(result.srcAmount),
            result.srcDecimals,
          );
          if (srcAmount.toNumber() === 0) {
            return;
          }
          const destAmountBySrcAmount = destAmount
            .div(srcAmount)
            .toFixed(4)
            .toString();

          setPriceRoute(result);
          setSrcAmount(srcAmount.toNumber());
          setDestAmount(destAmount.toNumber());
          setSrcUsdAmount(result.srcUSD);
          setDestUsdAmount(result.destUSD);
          setAvaxWalletFee(`${result.partnerFee} AVAX`);
          setTrxRate(
            `1 ${srcToken?.symbol} ≈ ${destAmountBySrcAmount} ${destToken?.symbol}`,
          );
          const minAmnt = destAmount.times(1 - 0.12 / 100).toFixed(8); //fixme unfix 0.12 with slippage
          setMinAmount(minAmnt);
          setMinAmountBig(
            Utils.stringToBN(minAmnt, result.destDecimals).toString(),
          );
          setError(undefined);
        }),
      )
      .subscribe({
        error: err => {
          setPriceRoute(undefined);
          setError(err.message);
          console.error(err);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [srcToken, destToken, srcAmount, destAmount]);

  const _setSrcAmount = (amount: number) => {
    setSwapSide(SwapSide.SELL);
    setSrcAmount(amount);
  };
  const _setDestAmount = (amount: number) => {
    setSwapSide(SwapSide.BUY);
    setDestAmount(amount);
  };

  const swapFromTo = () => {
    const tempToken = destToken;
    setDestToken(srcToken);
    setSrcToken(tempToken);
    const tempAmount = destAmount;
    setDestAmount(srcAmount);
    setSrcAmount(tempAmount);
  };

  const doSwap = async () => {
    if (!priceRoute) {
      throw Error('no price route');
    }

    const {result, error} = await performSwap(
      {
        priceRoute: priceRoute,
        srcAmount: priceRoute.srcAmount,
        destAmount: minAmountBig,
        gasLimit: priceRoute.gasCost,
        gasPrice: await firstValueFrom(gasPrice$),
      },
      wallet,
    );
    if (error) {
      throw Error(error);
    }
    if (!result) {
      throw Error('undefined result');
    }

    return result;
  };

  const state: SwapContextState = {
    swapFrom: {
      token: srcToken,
      setToken: setSrcToken,
      amount: srcAmount,
      setAmount: _setSrcAmount,
      usdValue: srcUsdAmount,
    },
    swapTo: {
      token: destToken,
      setToken: setDestToken,
      amount: destAmount,
      setAmount: _setDestAmount,
      usdValue: destUsdAmount,
    },
    minDestAmount: minAmount,
    swapFromTo,
    trxDetails: {
      rate: trxRate,
      slippageTol: slipTol,
      networkFee,
      networkFeeUsd,
      avaxWalletFee,
    },
    doSwap,
    error,
  };
  return <SwapContext.Provider value={state}>{children}</SwapContext.Provider>;
};

export function useSwapContext() {
  return useContext(SwapContext);
}
