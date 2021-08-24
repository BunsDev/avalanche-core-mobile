import React, {useContext} from 'react';
import {Text} from 'react-native';
import {ApplicationContext} from 'contexts/ApplicationContext';

type Props = {
  text: string;
  size?: number;
  textAlign?: 'center' | 'right';
  type?: 'import' | 'export';
};

export default function TextAmount(props: Props | Readonly<Props>) {
  const context = useContext(ApplicationContext);
  const theme = context.theme;
  let color = theme.primaryColor;
  if (props.type) {
    switch (props.type) {
      case 'import':
        color = theme.incoming;
        break;
      case 'export':
        color = theme.outgoing;
        break;
    }
  }
  return (
    <Text
      style={[
        {
          color: color,
          fontSize: props.size ? props.size : 16,
          fontFamily: 'Inter-Regular',
          textAlign: props.textAlign,
        },
      ]}>
      {props.text}
    </Text>
  );
}