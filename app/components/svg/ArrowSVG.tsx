import React, {useContext} from 'react';
import Svg, {Path} from 'react-native-svg';
import {ApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  color?: string;
}

function ArrowSVG({color = '#FFF'}: Prop) {
  const context = useContext(ApplicationContext);

  const svgColor = color ?? context.theme.buttonIcon;
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M7.29289 14.7071C7.68342 15.0976 8.31658 15.0976 8.70711 14.7071L15.0711 8.34314C15.4616 7.95262 15.4616 7.31945 15.0711 6.92893C14.6805 6.53841 14.0474 6.53841 13.6569 6.92893L8 12.5858L2.34315 6.92893C1.95262 6.53841 1.31946 6.53841 0.928931 6.92893C0.538407 7.31945 0.538407 7.95262 0.928931 8.34314L7.29289 14.7071ZM7 1L7 14H9V1L7 1Z"
        fill={svgColor}
      />
    </Svg>
  );
}

export default ArrowSVG;
