import { Network } from '@avalabs/chains-sdk'
import {
  XChainLinearTransaction,
  XChainNonLinearTransaction
} from '@avalabs/glacier-sdk'
import { Transaction } from 'store/transaction'
import { getExplorerAddressByNetwork } from 'utils/ExplorerUtils'
import { Avalanche } from '@avalabs/wallets-sdk'
import { Avax } from 'types'
import { stripChainAddress } from 'store/account/utils'
import { TokenType } from '@avalabs/vm-module-types'

export function convertXChainTransaction(
  tx: XChainNonLinearTransaction | XChainLinearTransaction,
  network: Network,
  address: string
): Transaction {
  const froms = new Set(tx.consumedUtxos.flatMap(utxo => utxo.addresses) || [])
  const tos = new Set(tx.emittedUtxos.flatMap(utxo => utxo.addresses) || [])

  const avaxAssetIds = [
    Avalanche.MainnetContext.avaxAssetID,
    Avalanche.FujiContext.avaxAssetID
  ]
  const avaxUnlocked = tx.amountUnlocked
    .filter(value => avaxAssetIds.includes(value.assetId))
    .reduce((acc, nextValue) => {
      return acc.add(Avax.fromNanoAvax(nextValue.amount))
    }, new Avax(0))
  const avaxCreated = tx.amountCreated
    .filter(value => avaxAssetIds.includes(value.assetId))
    .reduce((acc, nextValue) => {
      return acc.add(Avax.fromNanoAvax(nextValue.amount))
    }, new Avax(0))

  const isSender = froms.has(stripChainAddress(address))

  return {
    hash: tx.txHash,
    isBridge: false,
    isContractCall: false,
    isIncoming: !isSender,
    isOutgoing: isSender,
    from: [...froms.values()].join(','),
    to: [...tos.values()].join(','),
    isSender,
    timestamp: tx.timestamp * 1000, // to millis
    tokens: [
      {
        decimal: network.networkToken.decimals.toString(),
        name: network.networkToken.name,
        symbol: network.networkToken.symbol,
        type: TokenType.NATIVE,
        amount: avaxCreated.toDisplay()
      }
    ],
    gasUsed: avaxUnlocked.sub(avaxCreated).toSubUnit().toString(),
    explorerLink: getExplorerAddressByNetwork(network, tx.txHash, 'tx'),
    txType: tx.txType,
    chainId: network.chainId.toString()
  }
}
