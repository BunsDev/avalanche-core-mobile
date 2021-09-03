import {useEffect, useState} from 'react';
import BiometricsSDK from 'utils/BiometricsSDK';
import {Observable} from 'rxjs';
import {BIOMETRY_TYPE} from 'react-native-keychain';

export function useBiometricLogin(
  m: string,
  isDarkMode: boolean,
): [string, () => Observable<boolean>, any] {
  const [mnemonic] = useState(m);
  const [biometryType, setBiometryType] = useState('');
  const [fingerprintIcon, setFingerprintIcon] = useState<any>();

  useEffect(() => {
    BiometricsSDK.getBiometryType().then(value => {
      setBiometryType(value);
    });
  }, []);

  useEffect(() => {
    switch (biometryType) {
      case BIOMETRY_TYPE.FINGERPRINT:
      case BIOMETRY_TYPE.TOUCH_ID:
        setFingerprintIcon(
          isDarkMode
            ? require('assets/icons/fingerprint_dark.png')
            : require('assets/icons/fingerprint_light.png'),
        );
        break;
      case BIOMETRY_TYPE.FACE:
      case BIOMETRY_TYPE.FACE_ID:
        setFingerprintIcon(
          isDarkMode
            ? require('assets/icons/face_id_dark.png')
            : require('assets/icons/face_id_light.png'),
        );
        break;
      case BIOMETRY_TYPE.IRIS:
        setFingerprintIcon(
          isDarkMode
            ? require('assets/icons/face_id_dark.png')
            : require('assets/icons/face_id_light.png'),
        );
        //todo add correct icon
        break;
    }
  }, [biometryType]);

  const onUseBiometry = (): Observable<boolean> => {
    return BiometricsSDK.storeWalletWithBiometry(mnemonic);
  };

  return [biometryType, onUseBiometry, fingerprintIcon];
}
