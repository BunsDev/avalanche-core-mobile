import React, {useContext, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import TextTitle from 'components/TextTitle';
import InputText from 'components/InputText';
import AvaButton from 'components/AvaButton';
import Loader from 'components/Loader';
import QrScannerAva from 'components/QrScannerAva';
import {ApplicationContext} from 'contexts/ApplicationContext';
import QRCode from 'components/svg/QRCode';
import {useNavigation} from '@react-navigation/native';
import {useSendAvaxRn} from 'screens/sendAvax/useSendAvaxRn';
import AppNavigation from 'navigation/AppNavigation';
import AvaText from 'components/AvaText';
import FlexSpacer from 'components/FlexSpacer';

export default function SendAvax(): JSX.Element {
  const context = useContext(ApplicationContext);
  const {
    avaxTotal,
    balanceTotalInUSD,
    targetChain,
    loaderVisible,
    loaderMsg,
    errorMsg,
    cameraVisible,
    setCameraVisible,
    destinationAddress,
    setAddress,
    sendAmountString,
    setSendAmountString,
    sendFeeString,
    canSubmit,
    onSendAvax,
    onScanBarcode,
    onBarcodeScanned,
    clearAddress,
  } = useSendAvaxRn();
  const [backgroundStyle] = useState(context.backgroundStyle);
  const {navigate} = useNavigation();

  return (
    <View
      style={[
        backgroundStyle,
        {
          backgroundColor: context.theme.bgOnBgApp,
          paddingStart: 0,
          paddingEnd: 0,
        },
      ]}>
      <View style={[{paddingStart: 4, paddingEnd: 4}]}>
        <InputText
          value={sendAmountString}
          label="Amount"
          placeholder="Enter the amount"
          helperText="$0"
          keyboardType="numeric"
          onChangeText={text => setSendAmountString(text)}
        />
        <View style={styles.transactionFee}>
          <AvaText.Body3
            textStyle={{
              textAlign: 'right',
              color: context.theme.txtListItemSubscript,
            }}>
            {'Transaction fee: ' + sendFeeString + ' AVAX'}
          </AvaText.Body3>
        </View>
      </View>

      <View style={styles.horizontalLayout}>
        <View style={[{flex: 1, paddingStart: 4, paddingEnd: 4}]}>
          <InputText
            label={'Address'}
            placeholder="Enter the address"
            multiline={true}
            errorText={destinationAddress.length === 0 ? undefined : errorMsg}
            onChangeText={text => setAddress(text)}
            value={destinationAddress}
          />
        </View>
        {destinationAddress.length === 0 && (
          <ScanQrIcon onScanBarcode={onScanBarcode} />
        )}
      </View>

      <FlexSpacer />

      <AvaButton.PrimaryLarge
        style={{margin: 16}}
        onPress={() =>
          navigate(AppNavigation.SendToken.ConfirmTransactionScreen)
        }>
        Next
      </AvaButton.PrimaryLarge>

      <Modal animationType="fade" transparent={true} visible={loaderVisible}>
        <Loader message={loaderMsg} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCameraVisible(false)}
        visible={cameraVisible}>
        <QrScannerAva
          onSuccess={data => onBarcodeScanned(data)}
          onCancel={() => setCameraVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles: any = StyleSheet.create({
  horizontalLayout: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionFee: {
    position: 'absolute',
    bottom: 14,
    right: 16,
    alignItems: 'flex-end',
  },
});

const ScanQrIcon = ({onScanBarcode}: {onScanBarcode: () => void}) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          right: 0,
          marginRight: -16,
          top: 0,
          marginTop: 32,
        },
      ]}>
      <AvaButton.Icon onPress={onScanBarcode}>
        <QRCode />
      </AvaButton.Icon>
    </View>
  );
};
