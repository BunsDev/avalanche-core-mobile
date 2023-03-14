import Action from '../helpers/actions'
import networksManage from '../locators/networksManage.loc'
import { Platform } from '../helpers/constants'

const platformIndex = Action.platform() === Platform.iOS ? 1 : 0

class NetworksPage {
  get addNetwork() {
    return by.id(networksManage.addNetwork)
  }

  get dropdown() {
    return by.id(networksManage.dropdown)
  }

  get deleteNetwork() {
    return by.text(networksManage.deleteNetwork)
  }

  get favoriteNetwork() {
    return by.id(networksManage.favoriteNetwork)
  }

  get favoritesTab() {
    return by.text(networksManage.favoritesTab)
  }

  get headerBack() {
    return by.id(networksManage.headerBack)
  }

  get inputTextField() {
    return by.id(networksManage.inputTextField)
  }

  get networksTab() {
    return by.text(networksManage.networksTab)
  }

  get networkInfo() {
    return by.id(networksManage.networkInfo)
  }

  get customTab() {
    return by.text(networksManage.customTab)
  }

  get saveButton() {
    return by.text(networksManage.saveButton)
  }

  get customNetwork() {
    return by.text(networksManage.customNetworkName)
  }

  async addBtcNetwork() {
    await Action.tapElementAtIndex(this.favoriteNetwork, 0)
  }

  async tapAddNetwork() {
    await Action.tapElementAtIndex(this.addNetwork, 0)
  }

  async tapCustomTab() {
    await Action.tapElementAtIndex(this.customTab, 0)
  }

  async tapDropdown() {
    await Action.tapElementAtIndex(this.dropdown, 0)
  }

  async tapFavoritesTab() {
    await Action.tapElementAtIndex(this.favoritesTab, 0)
  }

  async tapHeaderBack() {
    await Action.tapElementAtIndex(this.headerBack, 0)
  }

  async tapNetworksTab() {
    await Action.tapElementAtIndex(this.networksTab, 1)
  }

  async tapNetworkInfo() {
    await Action.tapElementAtIndex(this.networkInfo, 0)
  }

  async tapSaveButton() {
    await Action.tapElementAtIndex(this.saveButton, 0)
  }

  async tapCustomNetwork() {
    await Action.tapElementAtIndex(this.customNetwork, 0)
  }

  async tapDeleteNetwork() {
    await Action.tapElementAtIndex(this.deleteNetwork, platformIndex)
  }

  async inputNetworkRpcUrl() {
    await Action.setInputText(
      this.inputTextField,
      networksManage.customRpcUrl,
      0
    )
  }

  async inputNetworkName() {
    await Action.setInputText(
      this.inputTextField,
      networksManage.customNetworkName,
      1
    )
  }

  async inputChainId() {
    await Action.setInputText(
      this.inputTextField,
      networksManage.customChainID,
      2
    )
  }

  async inputNativeTokenSymbol() {
    await Action.setInputText(
      this.inputTextField,
      networksManage.customNativeTokenSymbol,
      3
    )
  }

  async inputExplorerUrl() {
    await Action.setInputText(
      this.inputTextField,
      networksManage.customExplorerUrl,
      5
    )
  }

  async swipeUp() {
    await Action.swipeUp(this.inputTextField, 'fast', 0.5, 5)
  }
}

export default new NetworksPage()