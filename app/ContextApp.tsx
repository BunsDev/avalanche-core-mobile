/**
 * Context wrapper for App
 **/

import React, {useEffect, useState} from 'react';
import App from 'App';
import {ApplicationContextProvider} from 'contexts/ApplicationContext';
import Toast from 'react-native-toast-notifications';
import {
  AccountsContextProvider,
  NetworkContextProvider,
  WalletContextProvider,
} from '@avalabs/wallet-react-components';
import BiometricsSDK from 'utils/BiometricsSDK';
import Splash from 'screens/onboarding/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SECURE_ACCESS_SET} from 'resources/Constants';
import {Platform} from 'react-native';

export default function ContextApp() {
  const [isWarmingUp, setIsWarmingUp] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SECURE_ACCESS_SET).then(result => {
      if (result && Platform.OS === 'android') {
        setShowSplash(true);
        BiometricsSDK.warmup().then(() => {
          setTimeout(() => {
            setShowSplash(false);
            setIsWarmingUp(false);
          }, 1000);
        });
      } else {
        setIsWarmingUp(false);
      }
    });
  }, []);

  return (
    <ApplicationContextProvider>
      <NetworkContextProvider>
        <AccountsContextProvider>
          <WalletContextProvider>
            {showSplash && <Splash />}
            {!isWarmingUp && <App />}
          </WalletContextProvider>
        </AccountsContextProvider>
      </NetworkContextProvider>
      <Toast ref={ref => (global.toast = ref)} />
    </ApplicationContextProvider>
  );
}
