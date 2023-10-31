import type { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { DrawerScreenProps as RNDrawerScreenProps } from '@react-navigation/drawer'
import { TokenWithBalance } from 'store/balance'
import {
  NoWalletDrawerParamList,
  NoWalletScreenStackParams
} from 'navigation/NoWalletScreenStack'
import { NoWalletTabNavigatorParamList } from 'navigation/wallet/NoWalletTabNavigator'
import { AdvancedStackParamList } from 'navigation/wallet/AdvancedStackScreen'
import { AvalancheCreateContactRequest as AvalancheCreateContactRequestV2 } from 'store/walletConnectV2/handlers/contact/avalanche_createContact/avalanche_createContact'
import { AvalancheRemoveContactRequest as AvalancheRemoveContactRequestV2 } from 'store/walletConnectV2/handlers/contact/avalanche_removeContact/avalanche_removeContact'
import { Contact as SharedContact } from '@avalabs/types'
import { AvalancheUpdateContactRequest as AvalancheUpdateContactRequestV2 } from 'store/walletConnectV2/handlers/contact/avalanche_updateContact/avalanche_updateContact'
import { AvalancheSelectAccountRequest as AvalancheSelectAccountRequestV2 } from 'store/walletConnectV2/handlers/account/avalanche_selectAccount/avalanche_selectAccount'
import { Account } from 'store/account'
import { EthSendTransactionRpcRequest as EthSendTransactionRpcRequestV2 } from 'store/walletConnectV2/handlers/eth_sendTransaction/eth_sendTransaction'
import { AvalancheBridgeAssetRequest as AvalancheBridgeAssetRequestV2 } from 'store/walletConnectV2/handlers/avalanche_bridgeAsset/avalanche_bridgeAsset'
import { Asset, Blockchain } from '@avalabs/bridge-sdk'
import { EthSignRpcRequest as EthSignRpcRequestV2 } from 'store/walletConnectV2/handlers/eth_sign/eth_sign'
import { WalletAddEthereumChainRpcRequest as WalletAddEthereumChainRpcRequestV2 } from 'store/walletConnectV2/handlers/chain/wallet_addEthereumChain/wallet_addEthereumChain'
import { Network } from '@avalabs/chains-sdk'
import { WalletSwitchEthereumChainRpcRequest as WalletSwitchEthereumChainRpcRequestV2 } from 'store/walletConnectV2/handlers/chain/wallet_switchEthereumChain/wallet_switchEthereumChain'
import { SessionProposal } from 'store/walletConnectV2'
import { TransactionParams } from 'store/walletConnectV2/handlers/eth_sendTransaction/utils'
import {
  OldTypedData,
  TypedData
} from 'store/walletConnectV2/handlers/eth_sign/schemas/ethSignTypedData'
import {
  SendTransactionApproveData,
  AvalancheSendTransactionRpcRequest as AvalancheSendTransactionRpcRequestV2
} from 'store/walletConnectV2/handlers/avalanche_sendTransaction/avalanche_sendTransaction'
import {
  AvalancheSignTransactionApproveData as AvalancheSignTransactionApproveDataV2,
  AvalancheSignTransactionRpcRequest as AvalancheSignTransactionRpcRequestV2
} from 'store/walletConnectV2/handlers/avalanche_signTransaction/avalanche_signTransaction'
import { EarnStackParamList } from 'navigation/wallet/EarnScreenStack/EarnScreenStack'
import { RootScreenStackParamList } from './RootScreenStack'
import { OnboardingScreenStackParamList } from './OnboardScreenStack'
import { WelcomeScreenStackParamList } from './onboarding/WelcomeScreenStack'
import { CreateWalletStackParamList } from './onboarding/CreateWalletStack'
import { EnterWithMnemonicStackParamList } from './onboarding/EnterWithMnemonicStack'
import { WalletScreenStackParams } from './WalletScreenStack/WalletScreenStack'
import { DrawerParamList } from './wallet/DrawerScreenStack'
import { TabNavigatorParamList } from './wallet/TabNavigator'
import { SendStackParamList } from './wallet/SendScreenStack'
import { ReceiveStackParamList } from './wallet/ReceiveScreenStack'
import { SwapStackParamList } from './wallet/SwapScreenStack'
import { NFTStackParamList } from './wallet/NFTScreenStack'
import { NFTSendStackParamList } from './wallet/NFTSendStack'
import { AddressBookStackParamList } from './wallet/AddressBookStack'
import { SecurityStackParamList } from './wallet/SecurityPrivacyStackScreen'
import { BridgeStackParamList } from './wallet/BridgeScreenStack'
import { PortfolioStackParamList } from './wallet/PortfolioScreenStack'
import { StakeSetupStackParamList } from './wallet/EarnScreenStack/StakeSetupScreenStack'

export type { RootScreenStackParamList }

export type TokenSelectParams = {
  hideZeroBalance?: boolean
  onTokenSelected: (token: TokenWithBalance) => void
}

export type BridgeTransactionStatusParams = {
  txHash: string
}

export type EditGasLimitParams = {
  network: Network
  onSave: (newGasLimit: number) => void
  gasLimit: number
  gasPrice: bigint
}

export type SessionProposalV2Params = {
  request: SessionProposal
  chainIds: number[]
}

export type CreateRemoveContactV2Params = {
  request: AvalancheCreateContactRequestV2 | AvalancheRemoveContactRequestV2
  contact: SharedContact
  action: 'create' | 'remove'
}

export type UpdateContactV2Params = {
  request: AvalancheUpdateContactRequestV2
  contact: SharedContact
}

export type SelectAccountV2Params = {
  request: AvalancheSelectAccountRequestV2
  account: Account
}

export type BuyCarefullyParams = {
  tokenType: string
}

export type SignTransactionV2Params = {
  request: EthSendTransactionRpcRequestV2
  transaction: TransactionParams
}

export type AvalancheSendTransactionV2Params = {
  request: AvalancheSendTransactionRpcRequestV2
  data: SendTransactionApproveData
}

export type AvalancheSignTransactionV2Params = {
  request: AvalancheSignTransactionRpcRequestV2
  data: AvalancheSignTransactionApproveDataV2
}

export type SignMessageV2Params = {
  request: EthSignRpcRequestV2
  network: Network
  account: Account
  data: string | TypedData | OldTypedData
}

export type BridgeAssetV2Params = {
  request: AvalancheBridgeAssetRequestV2
  amountStr: string
  asset: Asset
  currentBlockchain: Blockchain
}

export type AddEthereumChainV2Params = {
  request: WalletAddEthereumChainRpcRequestV2
  network: Network
  isExisting: boolean
}

export type SwitchEthereumChainV2Params = {
  request: WalletSwitchEthereumChainRpcRequestV2
  network: Network
}

export type QRCodeParams = {
  onScanned: (qrText: string) => void
}

/** ROOT **/
export type RootStackScreenProps<T extends keyof RootScreenStackParamList> =
  StackScreenProps<RootScreenStackParamList, T>

/** ROOT -> ONBOARD **/
export type OnboardScreenProps<T extends keyof OnboardingScreenStackParamList> =
  CompositeScreenProps<
    StackScreenProps<OnboardingScreenStackParamList, T>,
    RootStackScreenProps<keyof RootScreenStackParamList>
  >

/** ROOT -> ONBOARD -> WELCOME **/
export type WelcomeScreenProps<T extends keyof WelcomeScreenStackParamList> =
  CompositeScreenProps<
    StackScreenProps<WelcomeScreenStackParamList, T>,
    OnboardScreenProps<keyof OnboardingScreenStackParamList>
  >

/** ROOT -> ONBOARD -> WELCOME -> CREATE WALLET **/
export type CreateWalletScreenProps<
  T extends keyof CreateWalletStackParamList
> = CompositeScreenProps<
  StackScreenProps<CreateWalletStackParamList, T>,
  WelcomeScreenProps<keyof WelcomeScreenStackParamList>
>

/** ROOT -> ONBOARD -> WELCOME -> ENTER WITH MNEMONIC **/
export type EnterWithMnemonicScreenProps<
  T extends keyof EnterWithMnemonicStackParamList
> = CompositeScreenProps<
  StackScreenProps<EnterWithMnemonicStackParamList, T>,
  WelcomeScreenProps<keyof WelcomeScreenStackParamList>
>

/** ROOT -> WALLET **/
export type WalletScreenProps<T extends keyof WalletScreenStackParams> =
  CompositeScreenProps<
    StackScreenProps<WalletScreenStackParams, T>,
    RootStackScreenProps<keyof RootScreenStackParamList>
  >

/** ROOT -> NO WALLET **/
export type NoWalletScreenProps<T extends keyof NoWalletScreenStackParams> =
  CompositeScreenProps<
    StackScreenProps<NoWalletScreenStackParams, T>,
    RootStackScreenProps<keyof RootScreenStackParamList>
  >

/** ROOT -> WALLET -> DRAWER **/
export type DrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    RNDrawerScreenProps<DrawerParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> NO WALLET -> DRAWER **/
export type NoWalletDrawerScreenProps<T extends keyof NoWalletDrawerParamList> =
  CompositeScreenProps<
    RNDrawerScreenProps<NoWalletDrawerParamList, T>,
    NoWalletScreenProps<keyof NoWalletScreenStackParams>
  >

/** ROOT -> WALLET -> DRAWER -> TABS **/
export type TabsScreenProps<T extends keyof TabNavigatorParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorParamList, T>,
    DrawerScreenProps<keyof DrawerParamList>
  >

/** ROOT -> WALLET -> DRAWER -> TABS **/
export type NoTabsScreenProps<T extends keyof NoWalletTabNavigatorParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<NoWalletTabNavigatorParamList, T>,
    NoWalletDrawerScreenProps<keyof NoWalletDrawerParamList>
  >

/** ROOT -> WALLET -> DRAWER -> TABS -> PORTFOLIO **/
export type PortfolioScreenProps<T extends keyof PortfolioStackParamList> =
  CompositeScreenProps<
    StackScreenProps<PortfolioStackParamList, T>,
    TabsScreenProps<keyof TabNavigatorParamList>
  >

/** ROOT -> WALLET -> SEND TOKENS **/
export type SendTokensScreenProps<T extends keyof SendStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SendStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> RECEIVE TOKENS **/
export type ReceiveTokensScreenProps<T extends keyof ReceiveStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ReceiveStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> SWAP **/
export type SwapScreenProps<T extends keyof SwapStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SwapStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> EARN **/
export type EarnScreenProps<T extends keyof EarnStackParamList> =
  CompositeScreenProps<
    StackScreenProps<EarnStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> EARN -> STAKE SETUP **/
export type StakeSetupScreenProps<T extends keyof StakeSetupStackParamList> =
  CompositeScreenProps<
    StackScreenProps<StakeSetupStackParamList, T>,
    EarnScreenProps<keyof EarnStackParamList>
  >

/** ROOT -> WALLET -> NFT DETAILS **/
export type NFTDetailsScreenProps<T extends keyof NFTStackParamList> =
  CompositeScreenProps<
    StackScreenProps<NFTStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> NFT DETAILS -> SEND **/
export type NFTDetailsSendScreenProps<T extends keyof NFTSendStackParamList> =
  CompositeScreenProps<
    StackScreenProps<NFTSendStackParamList, T>,
    NFTDetailsScreenProps<keyof NFTStackParamList>
  >

/** ROOT -> WALLET -> ADDRESS BOOK **/
export type AddressBookScreenProps<T extends keyof AddressBookStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AddressBookStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> SECURITY PRIVACY **/
export type SecurityPrivacyScreenProps<T extends keyof SecurityStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SecurityStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> SECURITY PRIVACY **/
export type AdvancedScreenProps<T extends keyof AdvancedStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AdvancedStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >

/** ROOT -> WALLET -> BRIDGE **/
export type BridgeScreenProps<T extends keyof BridgeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<BridgeStackParamList, T>,
    WalletScreenProps<keyof WalletScreenStackParams>
  >