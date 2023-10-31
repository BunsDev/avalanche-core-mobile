import React from 'react'
import AppNavigation from 'navigation/AppNavigation'
import { WalletScreenProps } from 'navigation/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import EditGasLimitBottomSheet from 'screens/shared/EditGasLimitBottomSheet'
import AccountDropdown from 'screens/portfolio/account/AccountDropdown'
import SessionProposalV2 from 'screens/rpc/components/v2/SessionProposal/SessionProposal'
import SelectTokenBottomSheet from 'screens/swap/SelectTokenBottomSheet'
import AccountBottomSheet from 'screens/portfolio/account/AccountBottomSheet'
import CreateRemoveContactV2 from 'screens/rpc/components/v2/CreateRemoveContact'
import UpdateContactV2 from 'screens/rpc/components/v2/UpdateContact/UpdateContact'
import SelectAccountV2 from 'screens/rpc/components/v2/SelectAccount'
import SignTransactionV2 from 'screens/rpc/components/v2/SignTransaction'
import BridgeAssetV2 from 'screens/rpc/components/v2/BridgeAsset'
import SignMessageV2 from 'screens/rpc/components/v2/SignMessage'
import AddEthereumChainV2 from 'screens/rpc/components/v2/AddEthereumChain'
import SwitchEthereumChainV2 from 'screens/rpc/components/v2/SwitchEthereumChain'
import BuyCarefully from 'screens/rpc/buy/BuyCarefully'
import AvalancheSendTransactionV2 from 'screens/rpc/components/v2/AvalancheSendTransaction'
import { DisclaimerBottomSheet } from 'screens/earn/components/DisclaimerBottomSheet'
import { SignOutModalScreen, WalletScreenSType } from './WalletScreenStack'

export const createModals = (WalletScreenS: WalletScreenSType) => {
  /* we have to disable gesture here so bottom sheet swipe down gesture
      doesn't conflict with react navigation swipe down */
  const walletConnectV2Modals = (
    <WalletScreenS.Group screenOptions={{ gestureEnabled: false }}>
      <WalletScreenS.Screen
        name={AppNavigation.Modal.SessionProposalV2}
        component={SessionProposalV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.SignMessageV2}
        component={SignMessageV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.CreateRemoveContactV2}
        component={CreateRemoveContactV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.UpdateContactV2}
        component={UpdateContactV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.SelectAccountV2}
        component={SelectAccountV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.AddEthereumChainV2}
        component={AddEthereumChainV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.SwitchEthereumChainV2}
        component={SwitchEthereumChainV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.BridgeAssetV2}
        component={BridgeAssetV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.SignTransactionV2}
        component={SignTransactionV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.AvalancheSendTransactionV2}
        component={AvalancheSendTransactionV2}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.AvalancheSignTransactionV2}
        component={AvalancheSendTransactionV2}
      />
    </WalletScreenS.Group>
  )

  return (
    <WalletScreenS.Group screenOptions={{ presentation: 'transparentModal' }}>
      {walletConnectV2Modals}
      <WalletScreenS.Screen
        options={{
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 300 } }
          }
        }}
        name={AppNavigation.Modal.AccountDropDown}
        component={AccountDropdownComp}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.AccountBottomSheet}
        component={AccountBottomSheet}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.SignOut}
        component={SignOutModalScreen}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.SelectToken}
        component={SelectTokenBottomSheet}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.EditGasLimit}
        component={EditGasLimit}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.StakeDisclaimer}
        component={StakeDisclaimer}
      />
      <WalletScreenS.Screen
        name={AppNavigation.Modal.BuyCarefully}
        component={BuyCarefully}
      />
    </WalletScreenS.Group>
  )
}

type AccountDropDownNavigationProp = WalletScreenProps<
  typeof AppNavigation.Modal.AccountDropDown
>['navigation']

const AccountDropdownComp = () => {
  const navigation = useNavigation<AccountDropDownNavigationProp>()
  return (
    <AccountDropdown
      onAddEditAccounts={() => {
        navigation.goBack()
        navigation.navigate(AppNavigation.Modal.AccountBottomSheet)
      }}
    />
  )
}
type EditGasLimitScreenProps = WalletScreenProps<
  typeof AppNavigation.Modal.EditGasLimit
>

const EditGasLimit = () => {
  const { goBack } = useNavigation<EditGasLimitScreenProps['navigation']>()
  const { params } = useRoute<EditGasLimitScreenProps['route']>()

  const onSave = (newGasLimit: number) => params.onSave(newGasLimit)

  return (
    <EditGasLimitBottomSheet
      onClose={goBack}
      onSave={onSave}
      gasLimit={params.gasLimit}
      gasPrice={params.gasPrice}
      network={params.network}
    />
  )
}

type StakeDisclaimerScreenProps = WalletScreenProps<
  typeof AppNavigation.Modal.StakeDisclaimer
>

const StakeDisclaimer = () => {
  const { goBack } = useNavigation<StakeDisclaimerScreenProps['navigation']>()

  return <DisclaimerBottomSheet onClose={goBack} />
}