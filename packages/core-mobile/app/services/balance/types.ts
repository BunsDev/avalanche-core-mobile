import { Network } from '@avalabs/chains-sdk'
import { PTokenWithBalance, XTokenWithBalance } from 'store/balance/types'
import { Transaction } from '@sentry/types'
import {
  NetworkContractToken,
  NetworkTokenWithBalance,
  TokenWithBalanceERC20
} from '@avalabs/vm-module-types'

export type TokenAddress = string

export type GetBalancesParams = {
  network: Network
  accountAddress: string
  currency: string
  customTokens?: NetworkContractToken[]
  sentryTrx?: Transaction
}

export interface BalanceServiceProvider {
  isProviderFor(network: Network): Promise<boolean>

  getBalances({
    network,
    accountAddress,
    currency,
    sentryTrx,
    customTokens
  }: GetBalancesParams): Promise<
    (
      | NetworkTokenWithBalance
      | TokenWithBalanceERC20
      | PTokenWithBalance
      | XTokenWithBalance
    )[]
  >
}
