import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AvaListItem from 'components/AvaListItem';
import {ApplicationContext} from 'contexts/ApplicationContext';
import {usePortfolio} from 'screens/portfolio/usePortfolio';
import {useNavigation} from '@react-navigation/native';
import AppNavigation from 'navigation/AppNavigation';
import { DrawerActions } from '@react-navigation/native';


function PortfolioHeader() {
  const context = useContext(ApplicationContext);
  const navigation = useNavigation();
  const {addressC, balanceTotalInUSD} = usePortfolio();

  return (
    <View pointerEvents="box-none">
      <View>
        <AvaListItem.Account
          accountName={'Account 1'}
          accountAddress={addressC ?? ''}
          onRightComponentPress={() => {
            navigation.navigate(AppNavigation.Wallet.SearchScreen);
          }}
          onLeftComponentPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          onAccountPressed={() => {
            navigation.navigate(AppNavigation.Modal.AccountBottomSheet);
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text style={[styles.text, {color: context.theme.txtOnBgApp}]}>
          {balanceTotalInUSD}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: context.theme.txtOnBgApp,
            paddingLeft: 4,
            lineHeight: 28,
          }}>
          USD
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  header: {
    overflow: 'hidden',
  },
});

export default PortfolioHeader;
