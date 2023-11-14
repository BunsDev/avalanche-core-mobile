import Actions from '../../helpers/actions'
import LoginRecoverWallet from '../../helpers/loginRecoverWallet'
import BottomTabsPage from '../../pages/bottomTabs.page'
import AccountManagePage from '../../pages/accountManage.page'
import { warmup } from '../../helpers/warmup'
import GetStartedScreenPage from '../../pages/Stake/getStartedScreen.page'

describe('Stake: get started screen', () => {
  beforeAll(async () => {
    await warmup()
    await LoginRecoverWallet.recoverWalletLogin()
  })

  it('should verify get started screen on Mainnet', async () => {
    await AccountManagePage.createAccount(4)
    await BottomTabsPage.tapStakeTab()
    await Actions.waitForElement(GetStartedScreenPage.getStartedTitle)
    await GetStartedScreenPage.verifyGetStartedScreenItems()
  })

  it('should verify Disclamer Text on Mainnet', async () => {
    await GetStartedScreenPage.tapDisclaimerText()
    await GetStartedScreenPage.verifyDisclaimerScreenItems()
  })
})
