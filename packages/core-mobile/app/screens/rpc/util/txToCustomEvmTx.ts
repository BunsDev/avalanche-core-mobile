import { TransactionParams } from 'store/walletConnectV2/handlers/eth_sendTransaction/utils'

export async function txToCustomEvmTx(
  networkFee: bigint,
  txParams: TransactionParams
) {
  if (!txParams) {
    throw new Error('params is malformed')
  }

  const { gas, to, from, data, value, gasPrice } = txParams

  const sureGasPrice = BigInt(gasPrice ?? networkFee)

  if (!gas || !sureGasPrice) {
    throw new Error('Gas or gas estimate is malformed')
  }

  if (!to && !data) {
    throw new Error('the to or data is malformed')
  }

  const gasLimit = Number(gas)

  return {
    gasPrice: sureGasPrice,
    gasLimit: gasLimit,
    to,
    from,
    data,
    value
  }
}