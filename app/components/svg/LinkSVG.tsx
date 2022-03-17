import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useApplicationContext} from 'contexts/ApplicationContext';

interface Prop {
  color?: string;
}

function ActivitySVG({color}: Prop) {
  const context = useApplicationContext();
  const svgColor = color ?? context.theme.accentColor;

  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M14.4301 8.70724C14.4301 9.48705 14.4301 10.2668 14.4301 11.0467C14.4301 11.5675 14.4301 12.0883 14.4301 12.609C14.4301 12.8862 14.4468 13.1713 14.4181 13.4477C14.4164 13.4635 14.4144 13.4794 14.4123 13.4952C14.4216 13.4283 14.4308 13.3614 14.4401 13.2945C14.416 13.4654 14.3711 13.631 14.3053 13.7905C14.331 13.729 14.3567 13.6676 14.3824 13.6061C14.3162 13.7612 14.2321 13.9063 14.1303 14.0408C14.1707 13.9878 14.2111 13.9348 14.2515 13.8818C14.1489 14.0142 14.0318 14.1327 13.9006 14.2368C13.9539 14.1953 14.0072 14.1539 14.0605 14.1124C13.9211 14.2203 13.77 14.3092 13.6078 14.3784C13.6723 14.3515 13.7368 14.3246 13.8012 14.2977C13.6417 14.3635 13.4761 14.4084 13.3053 14.4325C13.3746 14.4235 13.4438 14.4146 13.5131 14.4057C13.3307 14.4291 13.1461 14.4234 12.9626 14.4234C12.6629 14.4234 12.3633 14.4234 12.0636 14.4234C11.0741 14.4234 10.0847 14.4234 9.09521 14.4234C7.96639 14.4234 6.83759 14.4234 5.70879 14.4234C4.89752 14.4234 4.08625 14.4234 3.275 14.4234C3.04285 14.4234 2.8045 14.4353 2.57382 14.4057C2.64071 14.4149 2.70759 14.4242 2.77448 14.4335C2.60361 14.4094 2.43802 14.3644 2.27853 14.2986C2.33999 14.3243 2.40143 14.35 2.46287 14.3757C2.30778 14.3096 2.16271 14.2254 2.02825 14.1237C2.08122 14.164 2.1342 14.2044 2.18717 14.2448C2.05479 14.1423 1.93629 14.0251 1.83223 13.8939C1.87368 13.9472 1.91514 14.0005 1.9566 14.0538C1.84868 13.9145 1.75978 13.7633 1.69065 13.6012C1.71756 13.6656 1.74445 13.7301 1.77136 13.7946C1.70554 13.6351 1.66061 13.4695 1.63655 13.2986C1.64549 13.3679 1.65441 13.4372 1.66334 13.5065C1.6399 13.324 1.64563 13.1395 1.64563 12.956C1.64563 12.6563 1.64563 12.3566 1.64563 12.0569C1.64563 11.0675 1.64563 10.078 1.64563 9.08856C1.64563 7.95974 1.64563 6.83094 1.64563 5.70212C1.64563 4.89085 1.64563 4.07959 1.64563 3.26834C1.64563 3.03618 1.6337 2.79783 1.66334 2.56716C1.65408 2.63405 1.64483 2.70092 1.63556 2.76782C1.65962 2.59695 1.70455 2.43136 1.77037 2.27186C1.74467 2.33332 1.719 2.39476 1.6933 2.4562C1.75945 2.30112 1.84363 2.15605 1.94532 2.02158C1.90495 2.07455 1.86459 2.12754 1.8242 2.18051C1.92674 2.04813 2.04389 1.92962 2.17509 1.82556C2.12179 1.86702 2.06849 1.90848 2.01521 1.94993C2.15455 1.84202 2.30572 1.75311 2.46783 1.68398C2.40337 1.71089 2.33891 1.73778 2.27445 1.76469C2.43396 1.69888 2.59955 1.65395 2.7704 1.62988C2.70113 1.63882 2.63186 1.64775 2.56257 1.65667C2.84617 1.62023 3.14186 1.63896 3.42696 1.63896C3.94521 1.63896 4.46348 1.63896 4.98172 1.63896C5.75742 1.63896 6.53311 1.63896 7.30882 1.63896C7.73443 1.63896 8.09304 1.29087 8.09587 0.863164C8.09868 0.439692 7.74571 0.0761153 7.32007 0.0761153C6.53861 0.0761153 5.75714 0.0761153 4.97566 0.0761153C4.45912 0.0761153 3.94257 0.0761153 3.42603 0.0761153C3.06804 0.0761153 2.72193 0.0705077 2.36599 0.120612C1.85599 0.192435 1.40195 0.444605 1.01115 0.769501C0.627712 1.08827 0.361913 1.54282 0.206583 2.01132C0.099031 2.33565 0.0827637 2.67714 0.0827637 3.01547C0.0827637 3.71474 0.0827637 4.41403 0.0827637 5.11329C0.0827637 6.21691 0.0827637 7.32056 0.0827637 8.42419C0.0827637 9.47526 0.0827637 10.5264 0.0827637 11.5775C0.0827637 12.1191 0.0827637 12.6607 0.0827637 13.2024C0.0827637 13.9657 0.387885 14.7151 0.948805 15.2386C1.4712 15.7262 2.15881 15.9862 2.87124 15.9862C3.43842 15.9862 4.00561 15.9862 4.57282 15.9862C5.63346 15.9862 6.6941 15.9862 7.75474 15.9862C8.85195 15.9862 9.94913 15.9862 11.0463 15.9862C11.7232 15.9862 12.4 15.9862 13.0769 15.9862C13.4601 15.9862 13.8478 15.9546 14.2056 15.8069C14.3492 15.7477 14.4905 15.6908 14.6251 15.6137C14.763 15.5347 14.8875 15.4343 15.0115 15.3359C15.2098 15.1786 15.3607 14.9887 15.5108 14.7855C15.8121 14.3775 15.9556 13.8631 15.9892 13.363C16.0068 13.1003 15.9929 12.8329 15.9929 12.57C15.9929 12.0428 15.9929 11.5157 15.9929 10.9885C15.9929 10.2318 15.9929 9.47518 15.9929 8.71849C15.9929 8.29289 15.6448 7.93427 15.2171 7.93144C14.7936 7.92863 14.4301 8.2816 14.4301 8.70724Z"
        fill={svgColor}
      />
      <Path
        d="M10.1933 1.63902C10.9307 1.6397 11.6682 1.64037 12.4056 1.64105C13.3098 1.64188 14.2141 1.64272 15.1183 1.64355C15.1474 1.64359 15.1766 1.6436 15.2057 1.64364C15.6314 1.64402 15.99 1.29525 15.9928 0.867839C15.9956 0.444072 15.6426 0.0811722 15.217 0.0807902C14.4795 0.0801132 13.7421 0.0794361 13.0047 0.078759C12.1004 0.0779257 11.1962 0.0770923 10.292 0.076259C10.2629 0.0762243 10.2337 0.0762069 10.2045 0.0761722C9.77894 0.0757902 9.42033 0.424558 9.4175 0.851971C9.41468 1.27572 9.76765 1.63864 10.1933 1.63902Z"
        fill={svgColor}
      />
      <Path
        d="M15.9881 5.87572C15.9888 5.13827 15.9895 4.40084 15.9902 3.66339C15.991 2.75917 15.9919 1.85494 15.9927 0.95072C15.9927 0.921553 15.9928 0.892404 15.9928 0.863237C15.9932 0.43763 15.6444 0.0790184 15.217 0.0761886C14.7932 0.0733761 14.4303 0.426362 14.4299 0.851987C14.4292 1.58944 14.4286 2.32687 14.4279 3.06431C14.427 3.96853 14.4262 4.87277 14.4254 5.77699C14.4253 5.80615 14.4253 5.8353 14.4253 5.86447C14.4249 6.29008 14.7737 6.64869 15.2011 6.65152C15.6249 6.65433 15.9877 6.30134 15.9881 5.87572Z"
        fill={svgColor}
      />
      <Path
        d="M7.63686 9.53069C7.92238 9.24537 8.2079 8.9601 8.49342 8.6748C9.17285 7.99593 9.85226 7.31706 10.5317 6.63817C11.3393 5.83121 12.1469 5.02423 12.9546 4.21725C13.6247 3.54766 14.2948 2.87808 14.9649 2.2085C15.2322 1.94138 15.4996 1.67428 15.7669 1.40716C16.0676 1.10662 16.0626 0.599973 15.761 0.302143C15.4569 0.00193487 14.9573 0.00695224 14.6559 0.308063C14.3704 0.593359 14.0849 0.878636 13.7994 1.16393C13.1199 1.84282 12.4405 2.52169 11.7611 3.20056C10.9535 4.00753 10.1459 4.8145 9.33825 5.62148C8.66813 6.29107 7.99801 6.96065 7.3279 7.63023C7.06058 7.89735 6.79325 8.16445 6.52592 8.43155C6.22516 8.73209 6.23025 9.23874 6.53184 9.53657C6.83585 9.83681 7.33549 9.8318 7.63686 9.53069Z"
        fill={svgColor}
      />
    </Svg>
  );
}

export default ActivitySVG;
