import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  selected?: boolean;
  size?: number;
}

function StarSVG({selected = false, size = 24}: Prop) {
  const theme = useApplicationContext().theme;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.1019 9.70764C21.9913 9.40957 21.7423 9.19276 21.4381 9.16576L15.4373 8.29858L12.7549 2.96061C12.6166 2.68957 12.3402 2.5 12.0082 2.5C11.704 2.5 11.3999 2.66255 11.2615 2.96061L8.57915 8.29858L2.57833 9.16576C2.27413 9.22001 1.99751 9.4368 1.9146 9.70764C1.80407 10.0057 1.88701 10.3308 2.13585 10.5476L6.47755 14.6933L5.45442 20.5461C5.39906 20.8442 5.53737 21.1693 5.7862 21.3318C5.92451 21.4401 6.0904 21.4943 6.28387 21.4943C6.42218 21.4943 6.56048 21.4673 6.67101 21.4131L11.9805 18.6494L17.3453 21.4133C17.6219 21.5488 17.9536 21.5216 18.2303 21.359C18.4791 21.1693 18.6174 20.8714 18.5621 20.5733L17.5389 14.7205L21.8806 10.5748C22.1017 10.331 22.1846 10.0057 22.1017 9.70762L22.1019 9.70764ZM16.0734 13.8263C15.8797 14.0161 15.7968 14.2869 15.8246 14.558L16.6542 19.2185L12.3679 17.0238C12.2573 16.9695 12.119 16.9425 11.9807 16.9425C11.8424 16.9425 11.7041 16.9695 11.5936 17.0238L7.30725 19.2185L8.1369 14.558C8.19226 14.2869 8.08154 14.0161 7.88806 13.8263L4.43137 10.5206L9.21538 9.84317C9.492 9.81614 9.71305 9.62637 9.85137 9.40958L11.9807 5.15556L14.1101 9.40978C14.2206 9.6536 14.4697 9.81614 14.7461 9.84336L19.5301 10.5208L16.0734 13.8263Z"
        fill="white"
      />
      <Path
        d="M9 9L12 3.5L15 9L21 10L16.5 14.5L17.5 20.5L12 18L6.5 20.5L7.5 14.5L2.5 10L9 9Z"
        fill={selected ? theme.alternateBackground : theme.transparent}
      />
    </Svg>
  );
}

export default StarSVG;
