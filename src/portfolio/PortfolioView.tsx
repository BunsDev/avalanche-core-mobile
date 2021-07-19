import React, {Component} from "react"
import {Appearance, StyleSheet, View} from "react-native"
import CommonViewModel from "../CommonViewModel"
import PortfolioViewModel from "./PortfolioViewModel"
import Header from "../mainView/Header"
import Balances from "../portfolio/Balances"
import TabbedAddressCards from "../portfolio/TabbedAddressCards"
import {BehaviorSubject} from "rxjs"
import {WalletProvider} from "@avalabs/avalanche-wallet-sdk/dist/Wallet/Wallet"

type Props = {
  wallet: BehaviorSubject<WalletProvider>,
  onExit: () => void,
  onSwitchWallet: () => void,
}
type State = {
  isDarkMode: boolean
  backgroundStyle: any
  avaxPrice: number
  addressX: string
  addressP: string
  addressC: string
  sendXVisible: boolean
  sendCVisible: boolean
  crossChainVisible: boolean
  walletCAddress: string
  walletEvmAddress: string
}

class PortfolioView extends Component<Props, State> {
  viewModel!: PortfolioViewModel
  commonViewModel: CommonViewModel = new CommonViewModel(Appearance.getColorScheme())

  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.state = {
      isDarkMode: false,
      backgroundStyle: {},
      avaxPrice: 0,
      addressX: "",
      addressP: "",
      addressC: "",
      sendXVisible: false,
      sendCVisible: false,
      crossChainVisible: false,
      walletCAddress: "",
      walletEvmAddress: "",
    }
    this.viewModel = new PortfolioViewModel(props.wallet)
  }

  componentDidMount(): void {
    this.commonViewModel.isDarkMode.subscribe(value => this.setState({isDarkMode: value}))
    this.commonViewModel.backgroundStyle.subscribe(value => this.setState({backgroundStyle: value}))
    this.viewModel.avaxPrice.subscribe(value => this.setState({avaxPrice: value}))
    this.viewModel.walletCAddress.subscribe(value => this.setState({walletCAddress: value}))
    this.viewModel.walletEvmAddrBech.subscribe(value => this.setState({walletEvmAddress: value}))
    this.viewModel.addressX.subscribe(value => this.setState({addressX: value}))
    this.viewModel.addressP.subscribe(value => this.setState({addressP: value}))
    this.viewModel.addressC.subscribe(value => this.setState({addressC: value}))

    this.viewModel.onComponentMount()
  }

  componentWillUnmount(): void {
    this.viewModel.onComponentUnMount()
  }

  private onExit = (): void => {
    this.props.onExit()
  }

  private onSwitchWallet = (): void => {
    this.props.onSwitchWallet()
  }

  render(): Element {

    return (
      <View style={styles.container}>
        <Header showExit onExit={this.onExit} showSwitchWallet onSwitchWallet={this.onSwitchWallet}/>
        <Balances wallet={this.props.wallet}/>
        <TabbedAddressCards addressP={this.state.addressP} addressX={this.state.addressX} addressC={this.state.addressC}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
})

export default PortfolioView