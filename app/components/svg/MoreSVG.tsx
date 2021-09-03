import React, {useContext} from 'react';
import Svg, {Rect} from 'react-native-svg';
import {ApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  selected: boolean;
}

function MoreSVG({selected}: Prop) {
  const context = useContext(ApplicationContext);

  const svgColor = selected
    ? context.theme.primaryColor
    : context.theme.buttonIconSecondary;
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Rect
        x="5"
        y="5"
        width="9.07692"
        height="9.07692"
        rx="3"
        fill={svgColor}
        stroke={svgColor}
        stroke-width="2"
      />
      <Rect
        x="5"
        y="17.9231"
        width="9.07692"
        height="9.07692"
        rx="3"
        fill={svgColor}
        stroke={svgColor}
        stroke-width="2"
      />
      <Rect
        x="17.9231"
        y="5"
        width="9.07692"
        height="9.07692"
        rx="3"
        fill={svgColor}
        stroke={svgColor}
        stroke-width="2"
      />
      <Rect
        x="17.9231"
        y="17.9231"
        width="9.07692"
        height="9.07692"
        rx="3"
        fill={svgColor}
        stroke={svgColor}
        stroke-width="2"
      />
    </Svg>
  );
}

export default MoreSVG;
