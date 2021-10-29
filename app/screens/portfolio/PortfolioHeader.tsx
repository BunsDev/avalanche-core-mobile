import React, {FC, memo, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ApplicationContext,
  ApplicationContextState,
} from 'contexts/ApplicationContext';
import {usePortfolio} from 'screens/portfolio/usePortfolio';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AppNavigation from 'navigation/AppNavigation';
import MenuSVG from 'components/svg/MenuSVG';
import CarrotSVG from 'components/svg/CarrotSVG';
import AvaText from 'components/AvaText';
import {SelectedAccountContext} from 'contexts/SelectedAccountContext';
import {PortfolioNavigationProp} from 'screens/portfolio/PortfolioView';
import AvaButton from 'components/AvaButton';
import SwitchesSVG from 'components/svg/SwitchesSVG';

// experimenting with container pattern and stable props to try to reduce re-renders
function PortfolioHeaderContainer() {
  const context = useContext(ApplicationContext);
  const navigation = useNavigation<PortfolioNavigationProp>();
  const {balanceTotalInUSD} = usePortfolio();
  const {selectedAccount} = useContext(SelectedAccountContext);

  return (
    <PortfolioHeader
      appContext={context}
      navigation={navigation}
      balanceTotalUSD={balanceTotalInUSD}
      accountName={selectedAccount?.title ?? ''}
    />
  );
}

interface PortfolioHeaderProps {
  appContext: ApplicationContextState;
  navigation: PortfolioNavigationProp;
  balanceTotalUSD: string;
  accountName: string;
}

const PortfolioHeader: FC<PortfolioHeaderProps> = memo(
  ({navigation, appContext, balanceTotalUSD = 0, accountName}) => {
    const theme = appContext.theme;

    function onAccountPressed() {
      navigation.navigate(AppNavigation.Modal.AccountBottomSheet);
    }

    return (
      <View pointerEvents="box-none">
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <AvaButton.Icon
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MenuSVG />
          </AvaButton.Icon>
          <AvaButton.Base onPress={onAccountPressed}>
            <View style={[styles.accountTitleContainer]}>
              <AvaText.Heading3
                ellipsize={'middle'}
                textStyle={{marginRight: 16}}>
                {accountName}
              </AvaText.Heading3>
              <View style={{transform: [{rotate: '90deg'}]}}>
                <CarrotSVG color={theme.txtListItem} size={10} />
              </View>
            </View>
          </AvaButton.Base>
          <AvaButton.Icon
            style={{marginRight: 8}}
            onPress={() =>
              navigation.navigate(AppNavigation.Wallet.SearchScreen)
            }>
            <SwitchesSVG />
          </AvaButton.Icon>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 25,
          }}>
          <AvaText.LargeTitleBold>{balanceTotalUSD}</AvaText.LargeTitleBold>
          <AvaText.Heading3 textStyle={{paddingBottom: 4, marginLeft: 4}}>
            USD
          </AvaText.Heading3>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  accountTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
  },
});

export default PortfolioHeaderContainer;
