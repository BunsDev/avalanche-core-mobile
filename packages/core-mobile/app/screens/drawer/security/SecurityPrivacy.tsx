import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useApplicationContext } from 'contexts/ApplicationContext'
import AvaListItem from 'components/AvaListItem'
import BiometricsSDK from 'utils/BiometricsSDK'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SECURE_ACCESS_SET } from 'resources/Constants'
import Switch from 'components/Switch'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCoreAnalyticsConsent,
  setCoreAnalytics
} from 'store/settings/securityPrivacy'
import Logger from 'utils/Logger'

function SecurityPrivacy({
  onChangePin,
  onShowRecoveryPhrase,
  onTurnOnBiometrics,
  onShowConnectedDapps
}: {
  onChangePin: () => void
  onShowRecoveryPhrase: () => void
  onTurnOnBiometrics: () => void
  onShowConnectedDapps: () => void
}) {
  const theme = useApplicationContext().theme
  const dispatch = useDispatch()
  const coreAnalyticsConsent = useSelector(selectCoreAnalyticsConsent)
  const [isBiometricSwitchEnabled, setIsBiometricSwitchEnabled] =
    useState(false)
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false)

  useEffect(() => {
    BiometricsSDK.canUseBiometry()
      .then((biometryAvailable: boolean) => {
        setIsBiometricEnabled(biometryAvailable)
      })
      .catch(Logger.error)

    AsyncStorage.getItem(SECURE_ACCESS_SET)
      .then(type => {
        setIsBiometricSwitchEnabled(type === 'BIO')
      })
      .catch(Logger.error)
  }, [])

  const handleSwitchChange = (value: boolean) => {
    setIsBiometricSwitchEnabled(value)
    if (value) {
      onTurnOnBiometrics()
    } else {
      AsyncStorage.setItem(SECURE_ACCESS_SET, 'PIN')
    }
  }

  const handleAnalyticsSwitchChange = (value: boolean) => {
    dispatch(setCoreAnalytics(value))
  }

  return (
    <View style={{ backgroundColor: theme.colorBg2 }}>
      <AvaListItem.Base
        title={'Connected Sites'}
        background={theme.background}
        showNavigationArrow
        onPress={onShowConnectedDapps}
        testID="security_privacy__connected_sites"
      />
      <AvaListItem.Base
        title={'Change PIN'}
        background={theme.background}
        showNavigationArrow
        onPress={onChangePin}
      />
      <AvaListItem.Base
        title={'Show recovery phrase'}
        background={theme.background}
        showNavigationArrow
        onPress={onShowRecoveryPhrase}
      />
      {isBiometricEnabled && (
        <AvaListItem.Base
          title={'Sign in with Biometrics'}
          background={theme.background}
          rightComponent={
            <Switch
              value={isBiometricSwitchEnabled}
              onValueChange={handleSwitchChange}
            />
          }
        />
      )}
      <AvaListItem.Base
        title={'Participate in CoreAnalytics'}
        background={theme.background}
        rightComponent={
          <Switch
            value={coreAnalyticsConsent}
            onValueChange={handleAnalyticsSwitchChange}
          />
        }
      />
    </View>
  )
}

export default SecurityPrivacy