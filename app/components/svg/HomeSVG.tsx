import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  selected?: boolean;
  size?: number;
}

function HomeSVG({selected, size = 32}: Prop) {
  const context = useApplicationContext();

  const svgColor = selected
    ? context.theme.alternateBackground
    : context.theme.colorIcon4;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 33" fill="none">
      <Path
        d="M28.2989 14.7559C28.2984 14.7553 28.2978 14.7547 28.2972 14.7541L17.6912 3.81709C17.2391 3.35068 16.6381 3.09375 15.9988 3.09375C15.3594 3.09375 14.7584 3.35048 14.3061 3.81688L3.70575 14.7483C3.70218 14.752 3.6986 14.7559 3.69503 14.7596C2.76669 15.7225 2.76828 17.2847 3.6996 18.2451C4.12509 18.6841 4.68705 18.9384 5.2879 18.965C5.3123 18.9674 5.33689 18.9687 5.36169 18.9687H5.7844V27.0176C5.7844 28.6103 7.04104 29.9062 8.5859 29.9062H12.7353C13.1558 29.9062 13.497 29.5546 13.497 29.1207V22.8104C13.497 22.0835 14.0703 21.4924 14.7751 21.4924H17.2225C17.9273 21.4924 18.5005 22.0835 18.5005 22.8104V29.1207C18.5005 29.5546 18.8415 29.9062 19.2623 29.9062H23.4116C24.9565 29.9062 26.2131 28.6103 26.2131 27.0176V18.9687H26.6051C27.2442 18.9687 27.8453 18.7119 28.2978 18.2455C29.2301 17.2835 29.2305 15.7186 28.2989 14.7559Z"
        fill={svgColor}
      />
    </Svg>
  );
}

export default HomeSVG;
