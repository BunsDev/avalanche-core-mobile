import React, {useContext} from 'react';
import Svg, {Path} from 'react-native-svg';
import {ApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  selected: boolean;
}

function ActivitySVG({selected}: Prop) {
  const context = useContext(ApplicationContext);

  const svgColor = selected
    ? context.theme.accentColor
    : context.theme.onBgSearch;
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M26.3269 8.11865L26.7005 8.11891C27.1212 8.11922 27.4624 7.77847 27.4627 7.35785C27.463 6.93724 27.1222 6.59603 26.7016 6.59572L23.9771 6.59374L23.6241 9.35044C23.5707 9.76773 23.8657 10.1493 24.2829 10.2027C24.7002 10.2562 25.0818 9.9612 25.1352 9.54394L25.1873 9.13671C26.6709 11.1111 27.4748 13.4998 27.4766 16.0114C27.4789 19.0763 26.2873 21.9567 24.1216 24.1222C21.9578 26.2856 19.0803 27.4768 16.0182 27.4767H16.0096C12.9438 27.4745 10.0607 26.2786 7.89125 24.1095C5.72173 21.9404 4.52568 19.0577 4.52344 15.9925C4.52121 12.9276 5.71274 10.0472 7.87851 7.88175C10.9476 4.81318 15.4536 3.75641 19.5437 5.09029C19.9436 5.22069 20.3864 5.03364 20.5429 4.64322C20.6993 4.25273 20.5098 3.80696 20.1109 3.67346C15.4526 2.11452 10.3021 3.30432 6.80134 6.80468C4.34743 9.25813 2.99746 12.5215 3 15.9936C3.00254 19.4653 4.35703 22.7301 6.81393 25.1866C9.27083 27.6432 12.5362 28.9975 16.0084 29H16.0181C19.487 28.9999 22.7473 27.6503 25.1987 25.1993C27.6526 22.7458 29.0025 19.4825 29 16.0104C28.9979 13.1207 28.0584 10.3749 26.3269 8.11865Z"
        fill={svgColor}
        stroke={svgColor}
      />
      <Path
        d="M16 7C11.0373 7 7 11.0372 7 16C7 20.9628 11.0373 25 16 25C20.9627 25 25 20.9628 25 16C25 11.0372 20.9627 7 16 7ZM20.5444 17.1352C20.5444 17.7621 20.0362 18.2703 19.4092 18.2703H16.8639C15.7593 18.2703 14.8639 17.3749 14.8639 16.2703V13.4266C14.8639 12.7991 15.3726 12.2905 16 12.2905C16.6274 12.2905 17.1361 12.7991 17.1361 13.4266V16H19.4092C20.0362 16 20.5444 16.5082 20.5444 17.1352Z"
        fill={svgColor}
      />
    </Svg>
  );
}

export default ActivitySVG;