import AppNavigation from 'navigation/AppNavigation'
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState
} from 'react'
import CreateWallet from 'screens/onboarding/CreateWallet'
import { useNavigation } from '@react-navigation/native'
import CheckMnemonic from 'screens/onboarding/CheckMnemonic'
import CreatePIN from 'screens/onboarding/CreatePIN'
import BiometricLogin from 'screens/onboarding/BiometricLogin'
import { createStackNavigator } from '@react-navigation/stack'
import { MainHeaderOptions } from 'navigation/NavUtils'
import { useApplicationContext } from 'contexts/ApplicationContext'
import WarningModal from 'components/WarningModal'
import { usePosthogContext } from 'contexts/PosthogContext'
import TermsNConditionsModal from 'components/TermsNConditionsModal'
import { CreateWalletScreenProps } from '../types'

export type CreateWalletStackParamList = {
  [AppNavigation.CreateWallet.CreateWallet]: undefined
  [AppNavigation.CreateWallet.ProtectFunds]: undefined
  [AppNavigation.CreateWallet.CheckMnemonic]: undefined
  [AppNavigation.CreateWallet.CreatePin]: undefined
  [AppNavigation.CreateWallet.BiometricLogin]: undefined
  [AppNavigation.CreateWallet.TermsNConditions]: undefined
}
const CreateWalletS = createStackNavigator<CreateWalletStackParamList>()

const CreateWalletContext = createContext<{
  mnemonic: string
  setMnemonic: Dispatch<string>
}>({} as any)

const CreateWalletStack: () => JSX.Element = () => {
  const [mnemonic, setMnemonic] = useState('')

  return (
    <CreateWalletContext.Provider value={{ setMnemonic, mnemonic }}>
      <CreateWalletS.Navigator screenOptions={{ headerShown: false }}>
        <CreateWalletS.Screen
          options={MainHeaderOptions('')}
          name={AppNavigation.CreateWallet.CreateWallet}
          component={CreateWalletScreen}
        />
        <CreateWalletS.Screen
          options={{ presentation: 'transparentModal' }}
          name={AppNavigation.CreateWallet.ProtectFunds}
          component={CreateWalletWarningModal}
        />
        <CreateWalletS.Screen
          options={MainHeaderOptions('')}
          name={AppNavigation.CreateWallet.CheckMnemonic}
          component={CheckMnemonicScreen}
        />
        <CreateWalletS.Screen
          options={MainHeaderOptions('')}
          name={AppNavigation.CreateWallet.CreatePin}
          component={CreatePinScreen}
        />
        <CreateWalletS.Screen
          options={{ headerShown: true, headerTitle: '' }}
          name={AppNavigation.CreateWallet.BiometricLogin}
          component={BiometricLoginScreen}
        />
        <CreateWalletS.Screen
          options={{ presentation: 'transparentModal' }}
          name={AppNavigation.CreateWallet.TermsNConditions}
          component={TermsNConditionsModalScreen}
        />
      </CreateWalletS.Navigator>
    </CreateWalletContext.Provider>
  )
}

type CreateWalletNavigationProp = CreateWalletScreenProps<
  typeof AppNavigation.CreateWallet.CreateWallet
>['navigation']

const CreateWalletScreen = () => {
  const createWalletContext = useContext(CreateWalletContext)
  const { navigate, addListener, removeListener } =
    useNavigation<CreateWalletNavigationProp>()
  const { capture } = usePosthogContext()
  const { userSettingsRepo } = useApplicationContext().repo

  useEffect(captureBackEventFx, [
    addListener,
    capture,
    removeListener,
    userSettingsRepo
  ])

  function captureBackEventFx() {
    const callback = (e: { data: { action: { type: string } } }) => {
      if (e.data.action.type === 'GO_BACK') {
        capture('OnboardingCancelled').catch(() => undefined)
        userSettingsRepo.setSetting('CoreAnalytics', undefined)
      }
    }
    addListener('beforeRemove', callback)
    return () => removeListener('beforeRemove', callback)
  }

  const onSavedMyPhrase = (mnemonic: string) => {
    createWalletContext.setMnemonic(mnemonic)
    navigate(AppNavigation.CreateWallet.ProtectFunds)
  }

  return <CreateWallet onSavedMyPhrase={onSavedMyPhrase} />
}

type ProtectFundsNavigationProp = CreateWalletScreenProps<
  typeof AppNavigation.CreateWallet.ProtectFunds
>['navigation']

const CreateWalletWarningModal = () => {
  const { navigate, goBack } = useNavigation<ProtectFundsNavigationProp>()
  const { capture } = usePosthogContext()

  const onUnderstand = () => {
    capture('OnboardingMnemonicCreated').catch(() => undefined)
    goBack()
    navigate(AppNavigation.CreateWallet.CheckMnemonic)
  }

  const onBack = () => {
    goBack()
  }

  return (
    <WarningModal
      title={'Protect your funds'}
      message={
        ' Losing this phrase will result in lost funds. Please be sure to store it\n' +
        '        in a secure location.'
      }
      actionText={'I understand'}
      dismissText={'Back'}
      onAction={onUnderstand}
      onDismiss={onBack}
    />
  )
}

type CheckMnemonicNavigationProp = CreateWalletScreenProps<
  typeof AppNavigation.CreateWallet.CheckMnemonic
>['navigation']

const CheckMnemonicScreen = () => {
  const createWalletContext = useContext(CreateWalletContext)
  const { navigate, goBack } = useNavigation<CheckMnemonicNavigationProp>()
  return (
    <CheckMnemonic
      onSuccess={() => {
        navigate(AppNavigation.CreateWallet.CreatePin)
      }}
      onBack={() => goBack()}
      mnemonic={createWalletContext.mnemonic}
    />
  )
}

type CreatePinNavigationProp = CreateWalletScreenProps<
  typeof AppNavigation.CreateWallet.CreatePin
>['navigation']

const CreatePinScreen = () => {
  const createWalletContext = useContext(CreateWalletContext)
  const walletSetupHook = useApplicationContext().walletSetupHook
  const { navigate } = useNavigation<CreatePinNavigationProp>()
  const { capture } = usePosthogContext()

  const onPinSet = (pin: string): void => {
    capture('OnboardingPasswordSet').catch(() => undefined)
    walletSetupHook
      .onPinCreated(createWalletContext.mnemonic, pin, false)
      .then(value => {
        switch (value) {
          case 'useBiometry':
            navigate(AppNavigation.CreateWallet.BiometricLogin)
            break
          case 'enterWallet':
            navigate(AppNavigation.CreateWallet.TermsNConditions)
            break
        }
      })
  }

  return <CreatePIN onPinSet={onPinSet} />
}

type BiometricLoginNavigationProp = CreateWalletScreenProps<
  typeof AppNavigation.CreateWallet.BiometricLogin
>['navigation']

const BiometricLoginScreen = () => {
  const createWalletContext = useContext(CreateWalletContext)
  const { navigate } = useNavigation<BiometricLoginNavigationProp>()
  return (
    <BiometricLogin
      mnemonic={createWalletContext.mnemonic}
      onBiometrySet={() => {
        navigate(AppNavigation.CreateWallet.TermsNConditions)
      }}
      onSkip={() => navigate(AppNavigation.CreateWallet.TermsNConditions)}
    />
  )
}

const TermsNConditionsModalScreen = () => {
  const createWalletContext = useContext(CreateWalletContext)
  const walletSetupHook = useApplicationContext().walletSetupHook
  const { resetNavToRoot } = useApplicationContext().appNavHook

  return (
    <TermsNConditionsModal
      onNext={() => {
        walletSetupHook.enterWallet(createWalletContext.mnemonic)
      }}
      onReject={() => resetNavToRoot()}
    />
  )
}

export default CreateWalletStack
