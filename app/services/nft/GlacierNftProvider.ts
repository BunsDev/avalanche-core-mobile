import { NftProvider } from 'services/nft/types'
import { Erc721TokenBalance, Glacier } from '@avalabs/glacier-sdk'
import { NftResponse } from 'store/nft'
import Logger from 'utils/Logger'
import DevDebuggingConfig from 'utils/debugging/DevDebuggingConfig'
import { GLACIER_URL } from 'utils/glacierUtils'
import { addMissingFields } from './utils'

const demoAddress = '0x188c30e9a6527f5f0c3f7fe59b72ac7253c62f28'

export class GlacierNftProvider implements NftProvider {
  private glacierSdk = new Glacier({ BASE: GLACIER_URL })

  async isProviderFor(chainId: number): Promise<boolean> {
    const isHealthy = await this.isHealthy()
    if (!isHealthy) {
      return false
    }
    const supportedChainsResp = await this.glacierSdk.evm.supportedChains()
    const chainInfos = supportedChainsResp.chains
    const chains = chainInfos.map(chain => chain.chainId)
    return chains.some(value => value === chainId.toString())
  }

  async fetchNfts(
    chainId: number,
    address: string,
    pageToken?: string
  ): Promise<NftResponse> {
    Logger.info('fetching nfts using Glacier')

    const nftBalancesResp = await this.glacierSdk.evm.listErc721Balances({
      chainId: chainId.toString(),
      address: DevDebuggingConfig.SHOW_DEMO_NFTS ? demoAddress : address,
      // glacier has a cap on page size of 100
      pageSize: 10,
      pageToken: pageToken
    })
    const nftBalances =
      nftBalancesResp.erc721TokenBalances as Erc721TokenBalance[]
    const nextPageToken = nftBalancesResp.nextPageToken

    const fullNftData = nftBalances.map(nft => addMissingFields(nft, address))

    return {
      nfts: fullNftData,
      nextPageToken
    }
  }

  private async isHealthy() {
    const healthStatus = await this.glacierSdk.healthCheck.healthCheck()
    const status = healthStatus?.status?.toString()
    return status === 'ok'
  }
}

export default new GlacierNftProvider()
