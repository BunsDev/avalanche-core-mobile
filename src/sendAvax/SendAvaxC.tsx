import React, {useEffect, useState} from "react"
import {Alert, Appearance, Modal, SafeAreaView, StyleSheet, View} from "react-native"
import CommonViewModel from "../CommonViewModel"
import ButtonAva from "../common/ButtonAva"
import TextTitle from "../common/TextTitle"
import InputAmount from "../common/InputAmount"
import InputText from "../common/InputText"
import SendAvaxCViewModel from "./SendAvaxCViewModel"
import Loader from "../common/Loader"
import QrScannerAva from "../common/QrScannerAva"
import Header from "../mainView/Header"
import ImgButtonAva from "../common/ImgButtonAva"
import {MnemonicWallet} from "@avalabs/avalanche-wallet-sdk"

type SendAvaxCProps = {
  wallet: MnemonicWallet,
  onClose: () => void,
}

export default function SendAvaxC(props: SendAvaxCProps | Readonly<SendAvaxCProps>) {
  const [commonViewModel] = useState(new CommonViewModel(Appearance.getColorScheme()))
  const [viewModel] = useState(new SendAvaxCViewModel(props.wallet))
  const [isDarkMode] = useState(commonViewModel.isDarkMode)
  const [cameraVisible, setCameraVisible] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(false)
  const [loaderMsg, setLoaderMsg] = useState('')
  const [backgroundStyle] = useState(commonViewModel.backgroundStyle)
  const [addressCToSendTo, setAddressCToSendTo] = useState('')
  const [sendAmount, setSendAmount] = useState('0.0')

  useEffect(() => {
    viewModel.loaderMsg.subscribe(value => setLoaderMsg(value))
    viewModel.loaderVisible.subscribe(value => setLoaderVisible(value))
    viewModel.cameraVisible.subscribe(value => setCameraVisible(value))
    viewModel.addressCToSendTo.subscribe(value => setAddressCToSendTo(value))
  }, [])

  const onSend = (addressC: string, amount: string): void => {
    viewModel.onSendAvaxC(addressC, amount)
      .subscribe({
        next: txHash => {
          Alert.alert("Success", "Created transaction: " + txHash)
        },
        error: err => Alert.alert("Error", err.message),
        complete: () => {
        },
      })
  }

  const ClearBtn = () => {
    const clearIcon = isDarkMode ? require("../assets/icons/clear_dark.png") : require("../assets/icons/clear_light.png")
    return <View style={styles.clear}>
      <ImgButtonAva src={clearIcon} onPress={() => viewModel.clearAddress()}/>
    </View>
  }

  const scanIcon = isDarkMode ? require("../assets/icons/qr_scan_dark.png") : require("../assets/icons/qr_scan_light.png")
  const clearBtn = addressCToSendTo.length != 0 && ClearBtn()

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header showBack onBack={props.onClose}/>
      <TextTitle text={"Send AVAX (C Chain)"}/>
      <TextTitle text={"To:"} size={18}/>

      <View style={styles.horizontalLayout}>
        <InputText
          style={[{flex: 1}]}
          multiline={true}
          onChangeText={text => setAddressCToSendTo(text)}
          value={addressCToSendTo}/>
        {clearBtn}
        <ImgButtonAva src={scanIcon} onPress={() => viewModel.onScanBarcode()}/>
      </View>

      <TextTitle text={"Amount:"} size={18}/>
      <InputAmount
        showControls={true}
        onChangeText={text => setSendAmount(text)}/>

      <ButtonAva
        text={'Send'}
        onPress={() => onSend(addressCToSendTo, sendAmount)}/>


      <Modal
        animationType="fade"
        transparent={true}
        visible={loaderVisible}>
        <Loader message={loaderMsg}/>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCameraVisible(false)}
        visible={cameraVisible}>
        <QrScannerAva onSuccess={data => viewModel.onBarcodeScanned(data)}
                      onCancel={() => setCameraVisible(false)}/>
      </Modal>
    </SafeAreaView>
  )
}


const styles: any = StyleSheet.create({
  horizontalLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  clear: {
    position: "absolute",
    end: 58,
  },
})

