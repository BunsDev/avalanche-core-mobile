import React, {useCallback, useContext, useState} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import {ApplicationContext} from 'contexts/ApplicationContext';
import AvaText from 'components/AvaText';
import AddSVG from 'components/svg/AddSVG';
import Divider from 'components/Divider';
import AccountItem from 'screens/portfolio/account/AccountItem';
import {useAccount} from 'screens/portfolio/account/useAccount';
import {Account} from 'dto/Account';
import ButtonAva from 'components/ButtonAva';
import HeaderProgress from 'screens/mainView/HeaderProgress';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window')?.width;

function AccountView(): JSX.Element {
  const context = useContext(ApplicationContext);
  const {accounts, setSelectedAccount} = useAccount();
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  const onSelect = () => {
    setSelectedAccount(accounts[selectedAccountIndex]);
  };

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const pageNumber = Math.min(
        Math.max(
          Math.floor(e.nativeEvent.contentOffset.x / SCREEN_WIDTH + 0.5),
          0,
        ),
        accounts.length,
      );
      setSelectedAccountIndex(pageNumber);
    },
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: context.theme.bgApp,
        paddingVertical: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <AvaText.Heading1>My accounts</AvaText.Heading1>
        <AddSVG />
      </View>
      <Divider size={16} />
      {
        //todo: wrap accountElements in card carousel
      }
      <BottomSheetScrollView
        focusHook={useFocusEffect}
        horizontal
        onMomentumScrollEnd={onScrollEnd}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {accountElements(accounts)}
      </BottomSheetScrollView>

      <HeaderProgress
        maxDots={accounts.length}
        filledDots={selectedAccountIndex + 1}
      />
      <ButtonAva text={'Select'} onPress={onSelect} />
    </View>
  );
}

const accountElements = (accounts: Account[]): Element[] => {
  const elements: Element[] = [];

  accounts.forEach(account => {
    elements.push(
      <View key={account.title} style={{width: SCREEN_WIDTH, padding: 16}}>
        <AccountItem account={account} />
      </View>,
    );
  });
  return elements;
};

export default AccountView;
