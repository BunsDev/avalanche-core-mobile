import Actions from '../helpers/actions'
import AccountManagePage from '../pages/accountManage.page'
import BottomTabsPage from '../pages/bottomTabs.page'
import PlusMenuPage from '../pages/plusMenu.page'
import popUpModalPage from '../pages/popUpModal.page'
import Send from '../locators/send.loc'
import delay from '../helpers/waits'

class SendPage {
  get addressBook() {
    return by.id(Send.addressBook)
  }

  get amountToSendInput() {
    return by.id(Send.amountToSend)
  }

  get tokenDropdown() {
    return by.id(Send.tokenDropdown)
  }

  get carrotSVG() {
    return by.id('carrot_svg')
  }

  get amountField() {
    return by.id(Send.amountField)
  }

  get myAccounts() {
    return by.text(Send.myAccounts)
  }

  get nextButton() {
    return by.id(Send.nextBtn)
  }

  get sendTitle() {
    return by.text(Send.sendTitle)
  }

  get approveButton() {
    return by.id(Send.approveBtn)
  }

  get rejectButton() {
    return by.text(Send.rejectBtn)
  }

  get addressField() {
    return by.id(Send.addressField)
  }

  get searchBarOnSelectToken() {
    return by.id(Send.searchBarOnSelectToken)
  }

  get selectTokenTitle() {
    return by.text(Send.selectTokenTitle)
  }

  async tapAddressBook() {
    await Actions.tap(this.addressBook)
  }

  async tapSendTitle() {
    await Actions.tap(this.sendTitle)
  }

  async tapNextButton() {
    await Actions.tapElementAtIndex(this.nextButton, 0)
  }

  async waitForNextBtnEnabled() {
    await Actions.waitForElement(this.nextButton, 5000)
  }

  async tapCarrotSVG() {
    await Actions.tap(this.carrotSVG)
  }

  async tapMyAccounts() {
    await Actions.tap(this.myAccounts)
  }

  async tapSendField() {
    await Actions.tap(this.amountToSendInput)
  }

  async tapTokenDropdown() {
    await Actions.tap(this.tokenDropdown)
  }

  async tapApproveButton() {
    await Actions.waitForElement(this.approveButton, 5000)
    await Actions.tapElementAtIndex(this.approveButton, 0)
  }

  async tapRejectButton() {
    await Actions.tapElementAtIndex(this.rejectButton, 0)
  }

  async enterWalletAddress(address: string) {
    await Actions.setInputText(this.addressField, address, 0)
  }

  async selectToken(tokenName: string) {
    await Actions.waitForElement(this.searchBarOnSelectToken)
    await Actions.setInputText(this.searchBarOnSelectToken, tokenName)
    await delay(1000)
    await Actions.tapElementAtIndex(by.id(`token_selector__${tokenName}`), 0)
  }

  async enterAmount(amount: string) {
    await Actions.setInputText(this.amountToSendInput, amount, 0)
  }

  async sendTokenTo2ndAccount(token: string, sendingAmmount: string) {
    await Actions.waitForElement(BottomTabsPage.plusIcon)
    await BottomTabsPage.tapPlusIcon()
    await PlusMenuPage.tapSendButton()
    await this.tapAddressBook()
    await this.tapMyAccounts()
    await AccountManagePage.tapSecondAccountMenu()
    await this.tapTokenDropdown()
    await this.selectToken(token)
    await this.enterAmount(sendingAmmount)
    await this.waitForNextBtnEnabled()
    await this.tapSendTitle()
    await this.tapNextButton()
    await this.tapApproveButton()
  }

  async verifySuccessToast() {
    await Actions.waitForElement(popUpModalPage.successfulToastMsg, 120000)
    await delay(3000)
  }
}

export default new SendPage()
