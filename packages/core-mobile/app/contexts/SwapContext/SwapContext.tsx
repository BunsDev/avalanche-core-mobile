import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { getSwapRate, getTokenAddress } from 'swap/getSwapRate'
import { SwapSide } from 'paraswap'
import { OptimalRate } from 'paraswap-core'
import { TokenWithBalance } from 'store/balance'
import Logger from 'utils/Logger'
import { showSnackBarCustom } from 'components/Snackbar'
import TransactionToast, {
  TransactionToastType
} from 'components/toast/TransactionToast'
import { resolve } from '@avalabs/utils-sdk'
import { Amount, NetworkTokenUnit } from 'types'
import { InteractionManager } from 'react-native'
import SentryWrapper from 'services/sentry/SentryWrapper'
import { humanizeSwapErrors } from 'localization/errors'
import { useAvalancheProvider } from 'hooks/networks/networkProviderHooks'
import { useSelector } from 'react-redux'
import { selectActiveAccount } from 'store/account'
import { useNetworkFee } from 'hooks/useNetworkFee'
import AnalyticsService from 'services/analytics/AnalyticsService'
import { RpcMethod } from 'store/rpc/types'
import { useInAppRequest } from 'hooks/useInAppRequest'
import { useNetworks } from 'hooks/networks/useNetworks'
import { performSwap } from './performSwap/performSwap'

// success here just means the transaction was sent, not that it was successful/confirmed
export type SwapStatus = 'Idle' | 'Swapping' | 'Success' | 'Fail'

export type SwapParams = {
  srcTokenAddress: string
  isSrcTokenNative: boolean
  destTokenAddress: string
  isDestTokenNative: boolean
  priceRoute: OptimalRate
  swapGasLimit: number
  swapMaxFeePerGas: NetworkTokenUnit
  swapMaxPriorityFeePerGas: NetworkTokenUnit
  swapSlippage: number
}

export interface SwapContextState {
  fromToken?: TokenWithBalance
  toToken?: TokenWithBalance
  setFromToken: Dispatch<TokenWithBalance | undefined>
  setToToken: Dispatch<TokenWithBalance | undefined>
  optimalRate?: OptimalRate
  refresh: () => void
  swap(params: SwapParams): void
  maxFeePerGas: NetworkTokenUnit
  setMaxFeePerGas: Dispatch<NetworkTokenUnit>
  maxPriorityFeePerGas: NetworkTokenUnit
  setMaxPriorityFeePerGas: Dispatch<NetworkTokenUnit>
  gasLimit: number
  setCustomGasLimit: Dispatch<number>
  slippage: number
  setSlippage: Dispatch<number>
  destination: SwapSide
  setDestination: Dispatch<SwapSide>
  swapStatus: SwapStatus
  setAmount: Dispatch<Amount>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  isFetchingOptimalRate: boolean
  getOptimalRateForAmount: (amnt: Amount | undefined) => Promise<
    [
      {
        optimalRate?: OptimalRate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error?: any
      },
      { customGasLimit?: number } //needed for calculating maxAmount to swap
    ]
  >
}

export const SwapContext = createContext<SwapContextState>(
  {} as SwapContextState
)

export const SwapContextProvider = ({
  children
}: {
  children: ReactNode
}): JSX.Element => {
  const { request } = useInAppRequest()
  const { activeNetwork } = useNetworks()
  const activeAccount = useSelector(selectActiveAccount)
  const avalancheProvider = useAvalancheProvider()
  const { data: networkFee } = useNetworkFee()
  const [fromToken, setFromToken] = useState<TokenWithBalance>()
  const [toToken, setToToken] = useState<TokenWithBalance>()
  const [optimalRate, setOptimalRate] = useState<OptimalRate>()
  const [error, setError] = useState('')
  const [gasLimit, setGasLimit] = useState<number>(0)
  const [customGasLimit, setCustomGasLimit] = useState<number | undefined>(
    undefined
  )
  const trueGasLimit = customGasLimit || gasLimit
  const [maxFeePerGas, setMaxFeePerGas] = useState<NetworkTokenUnit>(
    NetworkTokenUnit.fromNetwork(activeNetwork)
  )
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] =
    useState<NetworkTokenUnit>(NetworkTokenUnit.fromNetwork(activeNetwork))
  const [slippage, setSlippage] = useState<number>(1)
  const [destination, setDestination] = useState<SwapSide>(SwapSide.SELL)
  const [swapStatus, setSwapStatus] = useState<SwapStatus>('Idle')
  const [amount, setAmount] = useState<Amount | undefined>() //the amount that's gonna be passed to paraswap
  const [isFetchingOptimalRate, setIsFetchingOptimalRate] = useState(false)

  const getOptimalRateForAmount = useCallback(
    (amnt: Amount | undefined) => {
      if (activeAccount && amnt) {
        const swapRatePromise = getSwapRate({
          fromTokenAddress: getTokenAddress(fromToken),
          toTokenAddress: getTokenAddress(toToken),
          fromTokenDecimals: fromToken?.decimals,
          toTokenDecimals: toToken?.decimals,
          amount: amnt.bn.toString(),
          swapSide: destination,
          network: activeNetwork,
          account: activeAccount
        })
        return Promise.all([
          swapRatePromise,
          Promise.resolve({ customGasLimit })
        ])
      } else {
        return Promise.reject('invalid data')
      }
    },
    [
      activeAccount,
      activeNetwork,
      customGasLimit,
      destination,
      fromToken,
      toToken
    ]
  )

  const getOptimalRate = useCallback(() => {
    if (activeAccount && amount) {
      setIsFetchingOptimalRate(true)
      getOptimalRateForAmount(amount)
        .then(([{ optimalRate: opRate, error: err }]) => {
          setError(err)
          setOptimalRate(opRate)
          setGasLimit(Number(opRate?.gasCost ?? 0))
        })
        .catch(reason => {
          setOptimalRate(undefined)
          Logger.warn('Error getSwapRate', reason)
        })
        .finally(() => {
          setIsFetchingOptimalRate(false)
        })
    }
  }, [activeAccount, amount, getOptimalRateForAmount])

  useEffect(() => {
    //call getOptimalRate every time its params change to get fresh rates
    getOptimalRate()
  }, [getOptimalRate])

  const refresh = useCallback(() => {
    getOptimalRate()
  }, [getOptimalRate])

  function onSwap({
    srcTokenAddress,
    isSrcTokenNative,
    destTokenAddress,
    isDestTokenNative,
    priceRoute,
    swapGasLimit,
    swapSlippage,
    swapMaxFeePerGas,
    swapMaxPriorityFeePerGas
  }: SwapParams): void {
    setSwapStatus('Swapping')

    InteractionManager.runAfterInteractions(async () => {
      const sentryTrx = SentryWrapper.startTransaction('swap')
      if (!avalancheProvider || !activeAccount) {
        return
      }

      resolve(
        performSwap({
          srcTokenAddress,
          isSrcTokenNative,
          destTokenAddress,
          isDestTokenNative,
          priceRoute,
          gasLimit: swapGasLimit,
          maxFeePerGas: swapMaxFeePerGas.toSubUnit(),
          maxPriorityFeePerGas: swapMaxPriorityFeePerGas.toSubUnit(),
          slippage: swapSlippage,
          activeNetwork,
          provider: avalancheProvider,
          signAndSend: txParams =>
            request({
              method: RpcMethod.ETH_SEND_TRANSACTION,
              params: txParams,
              chainId: activeNetwork.chainId.toString()
            }),
          userAddress: activeAccount.address,
          networkGasPrice: networkFee?.low.maxFeePerGas.toSubUnit() ?? 0n
        })
      )
        .then(([result, err]) => {
          if (err || (result && 'error' in result)) {
            setSwapStatus('Fail')
            AnalyticsService.captureWithEncryption('SwapTransactionFailed', {
              address: activeAccount.address,
              chainId: activeNetwork.chainId
            })
            showSnackBarCustom({
              component: (
                <TransactionToast
                  message={humanizeSwapErrors(err)}
                  type={TransactionToastType.ERROR}
                />
              ),
              duration: 'long'
            })
          } else {
            setSwapStatus('Success')
            AnalyticsService.captureWithEncryption('SwapTransactionSucceeded', {
              txHash: result?.swapTxHash ?? '',
              chainId: activeNetwork.chainId
            })
          }
        })
        .catch(Logger.error)
        .finally(() => {
          SentryWrapper.finish(sentryTrx)
        })
    })
  }

  const state: SwapContextState = {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    optimalRate,
    refresh,
    maxFeePerGas,
    setMaxFeePerGas,
    maxPriorityFeePerGas,
    setMaxPriorityFeePerGas,
    gasLimit: trueGasLimit,
    setCustomGasLimit,
    slippage,
    setSlippage,
    destination,
    setDestination,
    swap: onSwap,
    swapStatus,
    setAmount,
    error,
    isFetchingOptimalRate,
    getOptimalRateForAmount
  }

  return <SwapContext.Provider value={state}>{children}</SwapContext.Provider>
}

export function useSwapContext(): SwapContextState {
  return useContext(SwapContext)
}
