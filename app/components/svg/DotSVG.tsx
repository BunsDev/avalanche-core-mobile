import React, {useContext} from 'react';
import Svg, {Circle} from 'react-native-svg';
import {ApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  borderColor?: string;
  fillColor?: string;
  size?: number;
}

export default function DotSVG({borderColor, fillColor, size}: Prop) {
  const context = useContext(ApplicationContext);

  const stroke = fillColor ?? borderColor ?? context.theme.inputBorder;
  const computedSize = size ?? 20;

  return (
    <Svg
      width={computedSize}
      height={computedSize}
      viewBox="0 0 20 20"
      fill={fillColor ?? 'none'}>
      <Circle cx="10" cy="10" r="9.5" stroke={stroke} />
    </Svg>
  );
}