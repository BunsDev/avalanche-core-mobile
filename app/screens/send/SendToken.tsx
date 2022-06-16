import React, { FC, useEffect, useState } from 'react'
import { Modal, View } from 'react-native'
import AvaText from 'components/AvaText'
import { Space } from 'components/Space'
import InputText from 'components/InputText'
import TokenSelectAndAmount from 'components/TokenSelectAndAmount'
import AvaButton from 'components/AvaButton'
import AddressBookSVG from 'components/svg/AddressBookSVG'
import FlexSpacer from 'components/FlexSpacer'
import { useApplicationContext } from 'contexts/ApplicationContext'
import { useSendTokenContext } from 'contexts/SendTokenContext'
import numeral from 'numeral'
import { AddrBookItemType, Contact } from 'Repo'
import AddressBookLists from 'components/addressBook/AddressBookLists'
import { Account } from 'dto/Account'
import { useAddressBookLists } from 'components/addressBook/useAddressBookLists'
import QrScannerAva from 'components/QrScannerAva'
import QRScanSVG from 'components/svg/QRScanSVG'
import { TokenWithBalance } from 'store/balance'

type Props = {
  onNext: () => void
  onOpenAddressBook: () => void
  onOpenSelectToken: (
    onTokenSelected: (token: TokenWithBalance) => void
  ) => void
  token?: TokenWithBalance
  contact?: Contact
}

const SendToken: FC<Props> = ({
  onNext,
  onOpenAddressBook,
  onOpenSelectToken,
  token,
  contact
}) => {
  const { theme } = useApplicationContext()
  const {
    setSendToken,
    sendToken,
    setSendAmount,
    sendAmount,
    toAccount,
    fees,
    canSubmit,
    sdkError
  } = useSendTokenContext()
  const [showQrCamera, setShowQrCamera] = useState(false)

  const {
    showAddressBook,
    setShowAddressBook,
    onContactSelected: selectContact,
    saveRecentContact,
    reset: resetAddressBookList
  } = useAddressBookLists()

  useEffect(() => {
    if (token) {
      setSendToken(token)
    }
  }, [setSendToken, token])

  useEffect(() => {
    if (contact) {
      setAddress(contact)
    }
  }, [contact])

  useEffect(() => {
    if (toAccount.address) {
      setShowAddressBook(false)
    }
  }, [toAccount.address])

  function setAddress({ address, title }: { address: string; title: string }) {
    toAccount.setAddress?.(address)
    toAccount.setTitle?.(title)
  }

  const onContactSelected = (
    item: Contact | Account,
    type: AddrBookItemType
  ) => {
    setAddress({ address: item.address, title: item.title })
    selectContact(item, type)
  }

  const onNextPress = () => {
    saveRecentContact()
    onNext()
  }

  return (
    <View style={{ flex: 1 }}>
      <AvaText.LargeTitleBold textStyle={{ marginHorizontal: 16 }}>
        Send
      </AvaText.LargeTitleBold>
      <Space y={20} />
      <AvaText.Heading3 textStyle={{ marginHorizontal: 16 }}>
        Send to
      </AvaText.Heading3>
      <Space y={4} />
      <View style={[{ flex: 0, paddingStart: 4, paddingEnd: 4 }]}>
        <InputText
          placeholder="Enter 0x Address"
          multiline={true}
          onChangeText={text => {
            toAccount.setTitle?.('Address')
            toAccount.setAddress?.(text)
            resetAddressBookList()
          }}
          text={toAccount.address}
        />
        {!toAccount.address && (
          <View
            style={{
              position: 'absolute',
              right: 24,
              justifyContent: 'center',
              height: '100%'
            }}>
            <AvaButton.Icon
              onPress={() => setShowAddressBook(!showAddressBook)}>
              <AddressBookSVG />
            </AvaButton.Icon>
          </View>
        )}
        {!toAccount.address && (
          <View
            style={{
              position: 'absolute',
              right: 64,
              justifyContent: 'center',
              height: '100%'
            }}>
            <AvaButton.Icon onPress={() => setShowQrCamera(true)}>
              <QRScanSVG />
            </AvaButton.Icon>
          </View>
        )}
      </View>
      <Space y={24} />
      {showAddressBook ? (
        <AddressBookLists
          onContactSelected={onContactSelected}
          navigateToAddressBook={onOpenAddressBook}
        />
      ) : (
        <>
          <View style={{ paddingHorizontal: 16 }}>
            <TokenSelectAndAmount
              selectedToken={sendToken}
              amount={sendAmount.toString()}
              maxEnabled={!!toAccount.address && !!sendToken}
              onAmountSet={amount => setSendAmount(amount)}
              onOpenSelectToken={() => onOpenSelectToken(setSendToken)}
              getMaxAmount={() => {
                const balance =
                  numeral(sendToken?.balanceDisplayValue ?? 0).value() || 0
                const fee = numeral(fees.sendFeeNative ?? 0).value() || 0
                return (balance - fee).toFixed(4)
              }}
            />
            <Space y={8} />
            <AvaText.Body3 textStyle={{ color: theme.colorError }}>
              {sdkError ?? ''}
            </AvaText.Body3>
          </View>
          <FlexSpacer />
        </>
      )}
      <AvaButton.PrimaryLarge
        disabled={!canSubmit}
        onPress={onNextPress}
        style={{ margin: 16 }}>
        Next
      </AvaButton.PrimaryLarge>

      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowQrCamera(false)}
        visible={showQrCamera}>
        <QrScannerAva
          onSuccess={data => {
            setAddress({ address: data, title: '' })
            setShowQrCamera(false)
          }}
          onCancel={() => setShowQrCamera(false)}
        />
      </Modal>
    </View>
  )
}

export default SendToken
