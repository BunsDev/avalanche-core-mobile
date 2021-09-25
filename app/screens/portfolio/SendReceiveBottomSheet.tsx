import React, {FC, useCallback, useEffect, useMemo, useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import TabViewBackground from './components/TabViewBackground';
import {PortfolioStackParamList} from 'navigation/PortfolioStackScreen';
import SendTokenStackScreen from 'navigation/SendTokenStackScreen';
import {ERC20} from '@avalabs/wallet-react-components';
import {AvaxToken} from 'dto/AvaxToken';

type SendReceiveRouteProp = RouteProp<
  PortfolioStackParamList,
  'SendReceiveBottomSheet'
>;

const SendReceiveBottomSheet: FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {goBack, canGoBack} = useNavigation();
  const route = useRoute<SendReceiveRouteProp>();
  const snapPoints = useMemo(() => ['0%', '86%'], []);

  const tokenObj = route?.params?.token as ERC20 | AvaxToken;

  useEffect(() => {
    // intentionally setting delay so animation is visible.
    setTimeout(() => {
      bottomSheetRef?.current?.snapTo(1);
    }, 50);
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef?.current?.collapse();
    // InteractionManager.runAfterInteractions(() => canGoBack() && goBack());
  }, []);

  const handleChange = useCallback(index => {
    if (index === 0 && canGoBack()) {
      goBack();
    }
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={goBack}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleChange}
        backgroundComponent={TabViewBackground}>
        <SendTokenStackScreen onClose={handleClose} token={tokenObj} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default SendReceiveBottomSheet;
