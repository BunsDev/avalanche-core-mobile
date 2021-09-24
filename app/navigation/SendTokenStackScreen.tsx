import React, {useContext, useMemo} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import CarrotSVG from 'components/svg/CarrotSVG';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import SendAvaxConfirm from 'screens/sendAvax/SendAvaxConfirm';
import {ApplicationContext} from 'contexts/ApplicationContext';
import SendAvax from 'screens/sendAvax/SendAvax';
import {Image, StyleSheet, View} from 'react-native';
import Divider from 'components/Divider';
import AvaLogoSVG from 'components/svg/AvaLogoSVG';
import AvaText from 'components/AvaText';
import ButtonAva from 'components/ButtonAva';
import AppNavigation from 'navigation/AppNavigation';
import AvaListItem from 'screens/portfolio/AvaListItem';
import TextTitle from 'components/TextTitle';
import ClearSVG from 'components/svg/ClearSVG';
import TabViewAva from 'components/TabViewAva';
import ReceiveToken from 'screens/receive/ReceiveToken';
import TransactionsView from 'screens/transactions/TransactionsView';
import OvalTagBg from 'components/OvalTagBg';
import {usePortfolio} from 'screens/portfolio/usePortfolio';
import {ERC20} from '@avalabs/wallet-react-components';
import {AvaxToken} from 'dto/AvaxToken';

const Stack = createStackNavigator();

type Props = {
  onClose: () => void;
  token: ERC20 | AvaxToken;
};

const SendTokenStackScreen = ({onClose, token}: Props) => {
  const theme = useContext(ApplicationContext).theme;
  const {balanceTotalInUSD} = usePortfolio();
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
      safeAreaInsets: {top: 0},
      headerLeft: ({onPress}) => (
        <TouchableOpacity
          style={{paddingEnd: 16, transform: [{rotate: '180deg'}]}}
          onPress={onPress}>
          <CarrotSVG color={theme.txtOnBgApp} />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        color: theme.txtListItem,
      },
      headerStyle: {
        backgroundColor: theme.bgOnBgApp,
        shadowColor: theme.transparent,
      },
      cardStyle: {
        backgroundColor: theme.bgOnBgApp,
        overflow: 'visible',
      },
    }),
    [],
  );

  const DoneDoneScreen = () => <DoneScreen onClose={onClose} />;
  const ConfirmScreen = () => {
    const {navigate} = useNavigation();
    return (
      <SendAvaxConfirm
        onConfirm={() =>
          navigate(AppNavigation.SendToken.ConfirmTransactionScreen)
        }
        onClose={onClose}
        destinationAddress={'X-fuji1mtf4tv4dnmghh34ausjqyxer05hl3qvqv3nmja'}
        fiatAmount={'443.23 USD'}
        tokenAmount={'23232.23 AVAX'}
        tokenImageUrl={'tokenObj?.image'}
      />
    );
  };

  const doneScreenOptions = useMemo(
    () => ({headerShown: false, headerLeft: () => null}),
    [],
  );

  const tokenLogo = () => {
    if (token.symbol === 'AVAX') {
      return (
        <AvaLogoSVG
          size={32}
          logoColor={theme.logoColor}
          backgroundColor={theme.txtOnBgApp}
        />
      );
    } else {
      return (
        <Image
          style={styles.tokenLogo}
          source={{
            uri: (token as ERC20).logoURI,
          }}
        />
      );
    }
  };

  const Tabs = () => (
    <>
      <View style={{flexDirection: 'row', paddingRight: 16}}>
        <View style={{flex: 1}}>
          <AvaListItem.Simple
            label={
              <TextTitle
                text={token.name}
                size={16}
                color={theme.txtListItem}
                bold
              />
            }
            title={
              <TextTitle
                text={`${token.balanceParsed} ${token.symbol}`}
                size={24}
                color={theme.txtListItem}
                bold
              />
            }
            subtitle={
              <TextTitle
                text={balanceTotalInUSD}
                size={14}
                color={theme.txtListItemSubscript}
              />
            }
            leftComponent={tokenLogo()}
            titleAlignment={'flex-start'}
          />
        </View>
        <TouchableOpacity onPress={onClose}>
          <ClearSVG
            color={theme.btnIconIcon}
            backgroundColor={theme.bgSearch}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <TabViewAva renderCustomLabel={renderCustomLabel}>
        <SendAvax title={'Send'} />
        <ReceiveToken title={'Receive'} />
        <TransactionsView title={'Activity'} />
      </TabViewAva>
    </>
  );

  const renderCustomLabel = (title: string, focused: boolean) => {
    return (
      <OvalTagBg color={focused ? '#FFECEF' : theme.transparent}>
        <AvaText.Tag
          textStyle={{color: focused ? theme.btnTextTxt : '#6C6C6E'}}>
          {title}
        </AvaText.Tag>
      </OvalTagBg>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name={AppNavigation.SendToken.SendTokenScreen}
          options={doneScreenOptions}
          component={Tabs}
        />
        <Stack.Screen
          name={AppNavigation.SendToken.ConfirmTransactionScreen}
          component={ConfirmScreen}
        />
        <Stack.Screen
          name={AppNavigation.SendToken.DoneScreen}
          options={doneScreenOptions}
          component={DoneDoneScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tokenLogo: {
    paddingHorizontal: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

interface DoneProps {
  onClose: () => void;
}

function DoneScreen({onClose}: DoneProps) {
  return (
    <View
      style={[
        useContext(ApplicationContext).backgroundStyle,
        {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          paddingStart: 0,
          paddingEnd: 0,
        },
      ]}>
      <Divider size={100} />
      <AvaLogoSVG />
      <Divider size={32} />
      <AvaText.Heading2>Asset sent</AvaText.Heading2>
      <View style={{flex: 1}} />
      <View style={{width: '100%'}}>
        <ButtonAva text={'Done'} onPress={onClose} />
      </View>
    </View>
  );
}

export default SendTokenStackScreen;