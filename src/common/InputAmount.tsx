import React, {Component} from "react"
import {Appearance, TextInput} from "react-native"
import CommonViewModel from "../CommonViewModel"
import {COLORS, COLORS_NIGHT} from "./Constants"

type Props = {
  value: string,
  onChangeText?: (text: string) => void
  textSize?: number,
  editable?: boolean,
}
type State = {
  isDarkMode: boolean,
}

class InputAmount extends Component<Props, State> {
  commonViewModel: CommonViewModel = new CommonViewModel(Appearance.getColorScheme() as string)

  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.state = {
      isDarkMode: false,
    }
  }

  componentDidMount(): void {
    this.commonViewModel.isDarkMode.subscribe(value => this.setState({isDarkMode: value}))
  }

  render(): Element {
    const THEME = this.state.isDarkMode ? COLORS_NIGHT : COLORS
    return (
      <TextInput
        editable={this.props.editable ? this.props.editable : true}
        style={[
          {
            color: THEME.primaryColor,
            fontSize: this.props.textSize ? this.props.textSize : 18,
            padding: 8,
            borderWidth: 1,
            borderColor: THEME.primaryColorLight,
            borderRadius: 4,
            margin: 12,
            textAlign: "right",
            fontFamily: "Rubik-Regular",
          },
        ]}
        onChangeText={this.props.onChangeText}
        value={this.props.value}/>
    )
  }
}

export default InputAmount
