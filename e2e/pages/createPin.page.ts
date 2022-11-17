import createPinLoc from '../locators/createPin.loc'
import Action from '../helpers/actions'
import delay from '../helpers/waits'

class CreatePinPage {
  get numPadZero() {
    return by.id(createPinLoc.numPadZero)
  }

  get emptyCheckBox() {
    return by.id(createPinLoc.emptyCheckBox)
  }

  get nextBtn() {
    return by.text(createPinLoc.nextBtn)
  }

  async tapNumpadZero() {
    await Action.tap(this.numPadZero)
  }

  async tapNextBtn() {
    await Action.tap(this.nextBtn)
  }

  async tapEmptyCheckbox() {
    await Action.tapElementAtIndex(this.emptyCheckBox, 0)
    await Action.tapElementAtIndex(this.emptyCheckBox, 0)
  }

  async createPin() {
    for (let i = 0; i < 12; i++) {
      await this.tapNumpadZero()
      await delay(500)
    }
  }
}

export default new CreatePinPage()
