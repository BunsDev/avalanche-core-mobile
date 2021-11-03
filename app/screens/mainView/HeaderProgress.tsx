import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import ImgButtonAva from 'components/ImgButtonAva';
import {useApplicationContext} from 'contexts/ApplicationContext';
import Dot from 'components/Dot';
import {DotView} from 'screens/mainView/HeaderProgressViewModel';

type Props = {
  maxDots: number;
  filledDots: number;
  showBack?: boolean;
  onBack?: () => void;
};

export default function HeaderProgress(props: Props | Readonly<Props>) {
  const context = useApplicationContext();
  const isDarkMode = context.isDarkMode;
  const pinDots = () => {
    const dots: DotView[] = [];
    for (let i = 0; i < props.maxDots; i++) {
      if (i < props.filledDots) {
        dots.push({filled: true});
      } else {
        dots.push({filled: false});
      }
    }
    return dots;
  };

  const onBackPress = () => {
    props.onBack?.();
  };

  const icon = isDarkMode
    ? require('assets/icons/arrow_back_dark.png')
    : require('assets/icons/arrow_back_light.png');
  const backBtn = props.showBack ? (
    <ImgButtonAva src={icon} onPress={onBackPress} />
  ) : undefined;

  const generatePinDots = (): Element[] => {
    const dots: Element[] = [];

    pinDots().forEach((value, key) => {
      dots.push(<Dot size={12} margin={4} filled={value.filled} key={key} />);
    });
    return dots;
  };

  return (
    <View style={styles.horizontalLayout}>
      <View style={styles.dots}>{generatePinDots()}</View>
      {backBtn}
    </View>
  );
}

const styles: any = StyleSheet.create({
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  horizontalLayout: {
    height: 44,
  },
  dots: {
    position: 'absolute',
    paddingHorizontal: 68,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
});
