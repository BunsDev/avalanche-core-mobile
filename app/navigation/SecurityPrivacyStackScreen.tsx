import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import AppNavigation from 'navigation/AppNavigation';
import PinOrBiometryLogin from 'screens/login/PinOrBiometryLogin';
import CreatePIN from 'screens/onboarding/CreatePIN';
import SecurityPrivacy from 'screens/drawer/security/SecurityPrivacy';
import AppViewModel from 'AppViewModel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import CreateWallet from 'screens/onboarding/CreateWallet';
import {MainHeaderOptions} from 'navigation/NavUtils';

export type SecurityStackParamList = {
  [AppNavigation.Wallet.SecurityPrivacy]: undefined;
  [AppNavigation.Onboard.Login]: {revealMnemonic: (mnemonic: string) => void};
  [AppNavigation.CreateWallet.CreatePin]: undefined;
  [AppNavigation.CreateWallet.CreateWallet]: undefined;
};

type SecurityNavigationType = NativeStackNavigationProp<SecurityStackParamList>;

const SecurityStack = createStackNavigator<SecurityStackParamList>();

function SecurityPrivacyStackScreen() {
  const navigation = useNavigation<SecurityNavigationType>();

  function gotBackToTopOfStack() {
    navigation.navigate(AppNavigation.Wallet.SecurityPrivacy);
  }

  const PinOrBiometryLoginWithProps = memo(() => (
    <PinOrBiometryLogin
      onEnterWallet={mnemonic => {
        AppViewModel.onSavedMnemonic(mnemonic, true);
        navigation.navigate(AppNavigation.CreateWallet.CreatePin);
      }}
      onSignInWithRecoveryPhrase={() => console.log('onSignIn')}
      isResettingPin
    />
  ));

  const CreatePinWithProps = memo(() => (
    <CreatePIN
      onBack={gotBackToTopOfStack}
      onPinSet={pin => {
        AppViewModel.onPinCreated(pin, true).subscribe({
          error: () => console.log('ignored'),
        });
        gotBackToTopOfStack();
      }}
      isResettingPin
    />
  ));

  const CreateWalletWithProps = memo(() => (
    <CreateWallet onBack={gotBackToTopOfStack} isRevealingCurrentMnemonic />
  ));

  return (
    <SecurityStack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <SecurityStack.Group>
        <SecurityStack.Screen
          name={AppNavigation.Wallet.SecurityPrivacy}
          options={MainHeaderOptions('Security & Privacy')}
          component={SecurityPrivacy}
        />
      </SecurityStack.Group>
      <SecurityStack.Group screenOptions={{presentation: 'modal'}}>
        <SecurityStack.Screen
          options={MainHeaderOptions('Enter your pin')}
          name={AppNavigation.Onboard.Login}
          component={PinOrBiometryLoginWithProps}
        />
        <SecurityStack.Screen
          name={AppNavigation.CreateWallet.CreatePin}
          component={CreatePinWithProps}
        />
        <SecurityStack.Screen
          options={MainHeaderOptions('Recovery phrase')}
          name={AppNavigation.CreateWallet.CreateWallet}
          component={CreateWalletWithProps}
        />
      </SecurityStack.Group>
    </SecurityStack.Navigator>
  );
}

export default SecurityPrivacyStackScreen;
