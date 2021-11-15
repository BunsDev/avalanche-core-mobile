import React, {useCallback, useEffect} from 'react';
import {Animated, BackHandler, StyleSheet, View} from 'react-native';
import PinKey, {PinKeys} from './PinKey';
import Dot from 'components/Dot';
import {useCreatePin} from './CreatePinViewModel';
import TextLabel from 'components/TextLabel';
import HeaderProgress from 'screens/mainView/HeaderProgress';
import {Space} from 'components/Space';
import AvaText from 'components/AvaText';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import {useWalletContext} from '@avalabs/wallet-react-components';
import {WalletContextType} from 'dto/TypeUtils';

const keymap: Map<string, PinKeys> = new Map([
  ['1', PinKeys.Key1],
  ['2', PinKeys.Key2],
  ['3', PinKeys.Key3],
  ['4', PinKeys.Key4],
  ['5', PinKeys.Key5],
  ['6', PinKeys.Key6],
  ['7', PinKeys.Key7],
  ['8', PinKeys.Key8],
  ['9', PinKeys.Key9],
  ['0', PinKeys.Key0],
  ['<', PinKeys.Backspace],
]);

type Props = {
  onBack: () => void;
  onPinSet: (pin: string, walletContext: WalletContextType) => void;
  isResettingPin?: boolean;
};

export default function CreatePIN({onBack, onPinSet, isResettingPin}: Props) {
  const navigation = useNavigation();
  const walletContext = useWalletContext();
  const [
    title,
    errorMessage,
    pinDots,
    onEnterChosenPin,
    onEnterConfirmedPin,
    chosenPinEntered,
    validPin,
    jiggleAnim,
  ] = useCreatePin(isResettingPin);

  useEffect(() => {
    if (validPin) {
      onPinSet(validPin, walletContext);
    }
    navigation.setOptions({
      title: <AvaText.Heading1>{title}</AvaText.Heading1>,
      headerLeft: () => (
        <HeaderBackButton onPress={onBack} labelVisible={false} />
      ),
    });
  }, [validPin, title]);

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        onBack();
        return true;
      }

      if (isResettingPin) {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }

      return () => {
        if (isResettingPin) {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
      };
    }, [isResettingPin]),
  );

  const generatePinDots = (): Element[] => {
    const dots: Element[] = [];

    pinDots.forEach((value, key) => {
      dots.push(<Dot filled={value.filled} key={key} />);
    });
    return dots;
  };

  const keyboard = (chosenPinEntered: boolean) => {
    const keys: Element[] = [];
    '123456789 0<'.split('').forEach((value, key) => {
      keys.push(
        <View key={key} style={styles.pinKey}>
          <PinKey
            keyboardKey={keymap.get(value)!}
            onPress={chosenPinEntered ? onEnterConfirmedPin : onEnterChosenPin}
          />
        </View>,
      );
    });
    return keys;
  };

  return (
    <View style={[styles.verticalLayout]}>
      {isResettingPin || (
        <>
          <HeaderProgress maxDots={3} filledDots={3} showBack onBack={onBack} />
          <Space y={8} />
          <AvaText.Heading1 textStyle={{textAlign: 'center'}}>
            {title}
          </AvaText.Heading1>
          <Space y={8} />
          <AvaText.Body4 textStyle={{textAlign: 'center'}}>
            Access your wallet faster
          </AvaText.Body4>
          <Space y={8} />
        </>
      )}
      {errorMessage.length > 0 && <TextLabel text={errorMessage} />}
      <Animated.View
        style={[
          {padding: 68, flexGrow: 1},
          {
            transform: [
              {
                translateX: jiggleAnim,
              },
            ],
          },
        ]}>
        <View style={styles.dots}>{generatePinDots()}</View>
      </Animated.View>
      <View style={styles.keyboard}>{keyboard(chosenPinEntered)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  verticalLayout: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  growContainer: {
    flexGrow: 1,
  },
  keyboard: {
    marginHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dots: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  pinKey: {
    flexBasis: '33%',
    padding: 16,
  },
});
