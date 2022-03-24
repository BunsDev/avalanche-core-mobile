import React, {FC} from 'react';
import {Dimensions, View} from 'react-native';
import {useApplicationContext} from 'contexts/ApplicationContext';
import QRCode from 'react-native-qrcode-svg';
import AvaLogoSVG from 'components/svg/AvaLogoSVG';
import CircularText from 'components/svg/CircularText';

interface Props {
  address?: string;
  circularText?: string;
  sizePercentage?: number;
}

const {width: screenWidth} = Dimensions.get('window');

const AvaxQRCode: FC<Props> = ({
  address,
  circularText = '',
  sizePercentage = 1,
}: Props) => {
  const theme = useApplicationContext().theme;
  const borderWidth = 16;
  return (
    <View
      style={{
        borderWidth: borderWidth,
        height: screenWidth * sizePercentage,
        borderColor: theme.alternateBackground,
        borderRadius: borderWidth,
      }}>
      <QRCode
        ecl={'H'}
        size={screenWidth * sizePercentage - 2 * borderWidth}
        value={address}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AvaLogoSVG absolutePosition size={40} />
        <CircularText text={circularText} />
      </View>
    </View>
  );
};

export default AvaxQRCode;