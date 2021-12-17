import {WalletType} from '@avalabs/avalanche-wallet-sdk';
import {TokenWithBalance, wallet$} from '@avalabs/wallet-react-components';
import {APIError, ParaSwap, SwapSide} from 'paraswap';
import {OptimalRate} from 'paraswap-core';
import {firstValueFrom} from 'rxjs';
import {paraSwap$} from './swap';
import {getDecimalsForEVM} from 'utils/TokenTools';
import {getSrcToken, incrementalPromiseResolve, resolve} from 'swap/utils';

const SERVER_BUSY_ERROR = 'Server too busy';

export async function getSwapRate(request: {
  srcToken?: TokenWithBalance;
  destToken?: TokenWithBalance;
  amount?: string;
  swapSide: SwapSide;
}) {
  const {srcToken, destToken, amount, swapSide} = request || [];

  if (!srcToken) {
    return {
      ...request,
      error: 'no source token on request',
    };
  }

  if (!destToken) {
    return {
      ...request,
      error: 'no destination token on request',
    };
  }

  if (!amount) {
    return {
      ...request,
      error: 'no amount on request',
    };
  }

  const [paraSwap, err] = await resolve(firstValueFrom(paraSwap$));
  const [wallet, walletError] = await resolve(firstValueFrom(wallet$));

  if (err) {
    return {
      ...request,
      error: err,
    };
  }

  if (walletError) {
    return {
      ...request,
      error: walletError,
    };
  }

  const optimalRates = (paraSwap as ParaSwap).getRate(
    getSrcToken(srcToken),
    getSrcToken(destToken),
    amount,
    (wallet as WalletType).getAddressC(),
    swapSide,
    {
      partner: 'Avalanche',
    },
    getDecimalsForEVM(srcToken),
    getDecimalsForEVM(destToken),
  );

  function checkForErrorsInResult(result: OptimalRate | APIError) {
    return (result as APIError).message === SERVER_BUSY_ERROR;
  }

  const result = await incrementalPromiseResolve(
    () => optimalRates,
    checkForErrorsInResult,
  );

  console.log('----------result', result);

  return {
    result,
  };
}
