import Actions from '../../helpers/actions'
import burgerMenu from '../../locators/burgerMenu/bugerMenu.loc'
import { Platform } from '../../helpers/constants'
import commonElsLoc from '../../locators/commonEls.loc'

const platformIndex2 = Actions.platform() === Platform.iOS ? 2 : 0

class BurgerMenuPage {
  get advanced() {
    return by.text(burgerMenu.advanced)
  }

  get addressBook() {
    return by.text(burgerMenu.addressBook)
  }

  get currency() {
    return by.text(burgerMenu.currency)
  }

  get backbutton() {
    return by.id(commonElsLoc.backButton)
  }

  get burgerMenuButton() {
    return by.id(burgerMenu.burgerbutton)
  }

  get securityAndPrivacy() {
    return by.text(burgerMenu.securityAndPrivacy)
  }

  get notifications() {
    return by.text(burgerMenu.notifications)
  }

  get deleteWalletBtn() {
    return by.text(burgerMenu.deleteWalletBtn)
  }

  get iUnderstand() {
    return by.text(burgerMenu.iUnderstand)
  }

  async swipeLeft() {
    await Actions.swipeLeft(
      by.id(commonElsLoc.carrotSVG),
      'slow',
      0.5,
      platformIndex2
    )
  }

  async tapAdvanced() {
    await Actions.tapElementAtIndex(this.advanced, 0)
  }

  async tapAddressBook() {
    await Actions.tapElementAtIndex(this.addressBook, 0)
  }

  async tapBurgerMenuButton() {
    await Actions.waitForElement(this.burgerMenuButton, 10000)
    await Actions.tapElementAtIndex(this.burgerMenuButton, 0)
  }

  async tapNotifications() {
    await Actions.tapElementAtIndex(this.notifications, 0)
  }
  async tapCurrency() {
    await Actions.tapElementAtIndex(this.currency, 0)
  }

  async tapSecurityAndPrivacy() {
    await Actions.tapElementAtIndex(this.securityAndPrivacy, 0)
  }

  async tapBackbutton() {
    await Actions.tapElementAtIndex(this.backbutton, 0)
  }

  async dismissBurgerMenu() {
    await this.swipeLeft()
  }

  async exitBurgerMenu() {
    await this.tapBackbutton()
    await this.dismissBurgerMenu()
  }

  async deleteWallet() {
    await Actions.tapElementAtIndex(this.deleteWalletBtn, 0)
    await Actions.tapElementAtIndex(this.iUnderstand, 0)
  }
}

export default new BurgerMenuPage()
