import React, {useContext} from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';
import {ApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  color?: string;
}

export default function AvaToken({color}: Prop) {
  const context = useContext(ApplicationContext);

  const iconColor = color ?? context.theme.logoColor;
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40">
      <G>
        <Circle cx="20" cy="20" r="20" fill={iconColor} />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.2643 29.0613H13.9561C14.7888 29.0613 15.2051 29.0613 15.5801 28.9498C15.9883 28.8284 16.3617 28.6118 16.6697 28.3179C16.9526 28.0479 17.1591 27.6867 17.572 26.9642L23.7148 16.218C24.1218 15.506 24.3254 15.1499 24.4146 14.7744C24.5118 14.3657 24.5116 13.9399 24.4141 13.5312C24.3245 13.1558 24.1207 12.8 23.7131 12.0883L23.713 12.0882L21.3438 7.95171C20.7833 6.973 20.503 6.48365 20.1471 6.30187C19.7625 6.10544 19.3068 6.10578 18.9226 6.30276C18.5669 6.48507 18.2873 6.97483 17.7282 7.95435L7.45573 25.9506L7.45552 25.9509C6.90454 26.9162 6.62905 27.3988 6.65134 27.7947C6.67543 28.2224 6.90252 28.6131 7.26252 28.8459C7.59564 29.0613 8.15186 29.0613 9.2643 29.0613ZM25.2547 29.0617H30.6943C31.8185 29.0617 32.3806 29.0617 32.7148 28.8441C33.076 28.6089 33.3023 28.2149 33.3233 27.7847C33.3426 27.3867 33.0591 26.9017 32.492 25.9319L29.7677 21.2735L29.7675 21.2732C29.2085 20.3172 28.9289 19.8392 28.5755 19.6605C28.1936 19.4674 27.7424 19.4677 27.3607 19.6614C27.0076 19.8406 26.7287 20.3191 26.1709 21.276L23.4555 25.9345C22.8906 26.9037 22.6081 27.3884 22.6279 27.7861C22.6492 28.216 22.8757 28.6096 23.2368 28.8443C23.5709 29.0617 24.1322 29.0617 25.2547 29.0617Z"
          fill="white"
        />
      </G>
    </Svg>
  );
}
