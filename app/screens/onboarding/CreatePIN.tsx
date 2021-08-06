import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from 'screens/mainView/Header';
import TextTitle from 'components/TextTitle';
import PinKey, {PinKeys} from './PinKey';
import Dot from 'components/Dot';
import {useCreatePin} from './CreatePinViewModel';
import TextLabel from 'components/TextLabel';

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
  onPinSet: (pin: string) => void;
};

export default function CreatePIN(props: Props | Readonly<Props>) {
  const [
    title,
    errorMessage,
    pinDots,
    onEnterChosenPin,
    onEnterConfirmedPin,
    chosenPinEntered,
    validPin,
  ] = useCreatePin();

  useEffect(() => {
    if (validPin) {
      props.onPinSet(validPin);
    }
  }, [validPin]);

  const onBack = (): void => {
    props.onBack();
  };

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
    <View style={styles.verticalLayout}>
      <Header showBack onBack={onBack} />
      <View style={[{height: 8}]} />

      <View style={styles.growContainer}>
        <TextTitle text={title} textAlign={'center'} bold size={24} />
        <TextTitle
          text={'Access your wallet faster'}
          size={16}
          textAlign={'center'}
        />
        <View style={[{height: 8}]} />

        {errorMessage.length > 0 && <TextLabel text={errorMessage} />}
        <View style={styles.dots}>{generatePinDots()}</View>
      </View>
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
    paddingHorizontal: 68,
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
