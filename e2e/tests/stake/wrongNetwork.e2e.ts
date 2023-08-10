/* eslint-disable jest/expect-expect */
import Actions from '../../helpers/actions'
import LoginRecoverWallet from '../../helpers/loginRecoverWallet'
import BottomTabsPage from '../../pages/bottomTabs.page'
import { warmup } from '../../helpers/warmup'
import PortfolioPage from '../../pages/portfolio.page'
import StakePage from '../../pages/Stake/stake.page'

describe('Add and edit accounts', () => {
  beforeAll(async () => {
    await warmup()
    await LoginRecoverWallet.recoverWalletLogin()
  })

  it('should verify wrong network screen for staking on mainnet', async () => {
    await PortfolioPage.tapNetworksDropdown()
    await PortfolioPage.tapNetworksDropdownETH()
    await BottomTabsPage.tapStakeTab()
    const startTime = new Date().getTime()
    await Actions.waitForElement(StakePage.switchNetworkTitle)
    const endTime = new Date().getTime()
    await StakePage.verifySwitchNetworkScreenItems()
    await Actions.reportUIPerformance(
      startTime,
      endTime,
      'SwitchNetworkScreen',
      1,
      3
    )
  })

  it('should verify switching on Avax network for staking', async () => {
    await StakePage.tapSwitchNetworkButton()
    await StakePage.verifyStakeTopItems()
  })
})
