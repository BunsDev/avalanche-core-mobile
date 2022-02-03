import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import AvaText from 'components/AvaText';
import {Space} from 'components/Space';
import InputText from 'components/InputText';
import TokenSelectAndAmount from 'components/TokenSelectAndAmount';
import AvaButton from 'components/AvaButton';
import AddressBookSVG from 'components/svg/AddressBookSVG';
import FlexSpacer from 'components/FlexSpacer';
import TabViewAva from 'components/TabViewAva';
import ZeroState from 'components/ZeroState';
import AddressBookItem from 'components/addressBook/AddressBookItem';
import {useApplicationContext} from 'contexts/ApplicationContext';
import {Account} from 'dto/Account';
import {useSendTokenContext} from 'contexts/SendTokenContext';
import numeral from 'numeral';
import {
  ERC20WithBalance,
  TokenWithBalance,
} from '@avalabs/wallet-react-components';

const renderCustomLabel = (title: string) => {
  return <AvaText.Heading3>{title}</AvaText.Heading3>;
};

interface AddressItem {
  title: string;
  address: string;
}

function SendToken({
  onNext,
  token,
}: {
  onNext: () => void;
  token?: TokenWithBalance;
}): JSX.Element {
  const {theme} = useApplicationContext();

  const {
    setSendToken,
    sendToken,
    setSendAmount,
    sendAmount,
    toAccount,
    sendFeeAvax,
    canSubmit,
    error,
  } = useSendTokenContext();
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [recentAddresses, setRecentAddresses] = useState<AddressItem[]>([
    {
      title: 'Eduardo Gueiros',
      address: '0x904c05Aeb90B8582C62fff17623A7bE7534cB5A6',
    },
  ]);
  const [addressBook, setAddressBook] = useState<AddressItem[]>([
    {
      title: 'Eduardo Gueiros',
      address: '0x904c05Aeb90B8582C62fff17623A7bE7534cB5A6',
    },
    {
      title: 'Neven Skendžić',
      address: '0x225d6Bcf35391957FA117b10A0e7186dd80faE15',
    },
    {
      title: 'Jovica Popović',
      address: '0xC93161EA37789db85b08C1a93bB4756D2E47A6cA',
    },
  ]);
  const {accounts} = useApplicationContext().repo.accountsRepo;

  useEffect(() => {
    if (token) {
      setSendToken(token as ERC20WithBalance);
    }
  }, [token]);

  useEffect(() => {
    if (toAccount.address) {
      setShowAddressBook(false);
    }
  }, [toAccount.address]);

  function toggleAddressBook() {
    setShowAddressBook(!showAddressBook);
  }

  const renderAddressItem = (item: ListRenderItemInfo<AddressItem>) => {
    return (
      <AvaButton.Base
        onPress={() => {
          toAccount.setAddress?.(item.item.address);
          toAccount.setTitle?.(item.item.title);
        }}>
        <AddressBookItem title={item.item.title} address={item.item.address} />
      </AvaButton.Base>
    );
  };

  const renderAccountItem = (item: ListRenderItemInfo<Account>) => {
    return (
      <AvaButton.Base
        onPress={() => {
          toAccount.setAddress?.(item.item.cAddress);
          toAccount.setTitle?.(item.item.title);
        }}>
        <AddressBookItem title={item.item.title} address={item.item.cAddress} />
      </AvaButton.Base>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Space y={8} />
      <AvaText.Heading1 textStyle={{marginHorizontal: 16}}>
        Send
      </AvaText.Heading1>
      <Space y={24} />
      <AvaText.Heading3 textStyle={{marginHorizontal: 16}}>
        Send to
      </AvaText.Heading3>
      <Space y={4} />
      <View style={[{flex: 0, paddingStart: 4, paddingEnd: 4}]}>
        <InputText
          placeholder="Enter 0x Address"
          multiline={true}
          onChangeText={text => {
            toAccount.setTitle?.('Address');
            toAccount.setAddress?.(text);
          }}
          text={toAccount.address}
        />
        {!toAccount.address && (
          <View
            style={{
              position: 'absolute',
              right: 24,
              justifyContent: 'center',
              height: '100%',
            }}>
            <AvaButton.Icon onPress={toggleAddressBook}>
              <AddressBookSVG />
            </AvaButton.Icon>
          </View>
        )}
      </View>
      <Space y={24} />
      {showAddressBook ? (
        <TabViewAva renderCustomLabel={renderCustomLabel}>
          <FlatList
            title={'Recents'}
            data={recentAddresses}
            renderItem={renderAddressItem}
            contentContainerStyle={{paddingHorizontal: 16}}
            ListEmptyComponent={<ZeroState.NoResults />}
          />
          <FlatList
            title={'Address Book'}
            data={addressBook}
            renderItem={renderAddressItem}
            contentContainerStyle={{paddingHorizontal: 16}}
            ListEmptyComponent={<ZeroState.NoResults />}
          />
          <FlatList
            title={'My accounts'}
            data={[...accounts.values()]}
            renderItem={renderAccountItem}
            contentContainerStyle={{paddingHorizontal: 16}}
            ListEmptyComponent={<ZeroState.NoResults />}
          />
        </TabViewAva>
      ) : (
        <>
          <View style={{paddingHorizontal: 16}}>
            <TokenSelectAndAmount
              initAmount={sendAmount.toString()}
              initToken={sendToken}
              maxEnabled={!!toAccount.address && !!sendToken}
              onAmountSet={amount => setSendAmount(amount)}
              onTokenSelect={token => setSendToken(token as ERC20WithBalance)}
              getMaxAmount={() => {
                return (
                  numeral(sendToken?.balanceDisplayValue ?? 0).value() -
                  numeral(sendFeeAvax ?? 0).value()
                ).toFixed(4);
              }}
            />
            <Space y={8} />
            <AvaText.Body3 textStyle={{color: theme.colorError}}>
              {error?.message ?? ''}
            </AvaText.Body3>
          </View>
          <FlexSpacer />
        </>
      )}
      <AvaButton.PrimaryLarge
        disabled={!canSubmit}
        onPress={onNext}
        style={{margin: 16}}>
        Next
      </AvaButton.PrimaryLarge>
    </View>
  );
}

export default SendToken;