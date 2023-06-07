/* eslint-disable jest/expect-expect */
/* eslint-env detox/detox, jest */
/**
 * @jest-environment ./environment.ts
 */
import Assert from '../../helpers/assertions'
import LoginRecoverWallet from '../../helpers/loginRecoverWallet'
import NetworksManagePage from '../../pages/networksManage.page'
import BurgerMenuPage from '../../pages/burgerMenu/burgerMenu.page'
import PortfolioPage from '../../pages/portfolio.page'
import { warmup } from '../../helpers/warmup'
import AdvancedPage from '../../pages/burgerMenu/advanced.page'

describe('Enable Testnet', () => {
  beforeAll(async () => {
    await warmup()
    await LoginRecoverWallet.recoverWalletLogin()
  })

  it('Should verify Avax Network', async () => {
    await BurgerMenuPage.tapBurgerMenuButton()
    await BurgerMenuPage.tapAdvanced()
    await AdvancedPage.switchToTestnet()
    await BurgerMenuPage.tapBackbutton()
    await BurgerMenuPage.swipeLeft()

    await PortfolioPage.tapAvaxNetwork()
    await Assert.isVisible(PortfolioPage.avaxNetwork)
  })

  it('Should verify Bitcoin & Eth Goerly Networks', async () => {
    await PortfolioPage.tapNetworksDropdown()
    await PortfolioPage.tapManageNetworks()
    await NetworksManagePage.tapNetworksTab()
    await Assert.isVisible(NetworksManagePage.ethereumGoerlyNetwork)
    await Assert.isVisible(NetworksManagePage.bitcoinTestnet)
  })
})
