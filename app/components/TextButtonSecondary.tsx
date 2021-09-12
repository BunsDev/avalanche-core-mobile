import React, {useContext} from 'react';
import {Text} from 'react-native';
import {ApplicationContext} from 'contexts/ApplicationContext';

type Props = {
  text: string;
  disabled?: boolean;
};

export default function TextButtonSecondary(props: Props | Readonly<Props>) {
  const context = useContext(ApplicationContext);
  const theme = context.theme;
  return (
    <Text
      style={[
        {
          color: props.disabled
            ? theme.btnSecondaryTxtDisabled
            : theme.btnSecondaryTxt,
          fontSize: 18,
          fontWeight: '700',
          fontFamily: 'Inter-Regular',
          textAlign: 'center',
        },
      ]}>
      {props.text}
    </Text>
  );
}
