import React from 'react'
import { ColorValue } from 'react-native'
import Svg, { NumberProp, Path } from 'react-native-svg'

interface Props {
  color?: ColorValue
  height?: NumberProp
}

export default function GlobeSVG({ height = 40, color = '#fff' }: Props) {
  return (
    <Svg height={height} viewBox="0 0 50 50" fill="none">
      <Path
        d="M24.9999 0.700195C11.5986 0.700195 0.699951 11.5988 0.699951 25.0002C0.699951 38.4015 11.5986 49.3002 24.9999 49.3002C38.4013 49.3002 49.2999 38.4015 49.2999 25.0002C49.2999 11.5988 38.4013 0.700195 24.9999 0.700195ZM23.3799 4.26082V14.2002H16.6975C17.1679 12.5267 17.7306 10.997 18.3849 9.67769C19.8369 6.75016 21.5856 4.94433 23.3799 4.26082ZM26.6199 4.26082C28.4142 4.94433 30.163 6.75016 31.6149 9.67769C32.2693 10.997 32.832 12.5267 33.3024 14.2002H26.6199V4.26082ZM17.153 5.45894C16.5433 6.31099 15.9816 7.23697 15.4825 8.24332C14.6075 10.0075 13.879 12.0185 13.3225 14.2002H6.90995C9.25846 10.2736 12.858 7.18034 17.153 5.45894ZM32.8468 5.45894C37.1419 7.18034 40.7414 10.2736 43.0899 14.2002H36.6774C36.1209 12.0185 35.3924 10.0075 34.5174 8.24332C34.0183 7.23697 33.4566 6.31099 32.8468 5.45894ZM5.34055 17.4402H12.6475C12.3336 19.3286 12.1417 21.3217 12.0737 23.3802H4.00745C4.16594 21.3014 4.6244 19.305 5.34055 17.4402V17.4402ZM15.955 17.4402H23.3799V23.3802H15.3137C15.3896 21.3036 15.6166 19.3039 15.955 17.4402ZM26.6199 17.4402H34.0449C34.3833 19.3039 34.6103 21.3036 34.6862 23.3802H26.6199V17.4402ZM37.3524 17.4402H44.6593C45.3755 19.305 45.834 21.3014 45.9924 23.3802H37.9262C37.8582 21.3217 37.6663 19.3286 37.3524 17.4402ZM4.00745 26.6202H12.0737C12.1412 28.6847 12.3327 30.6666 12.6475 32.5602H5.34055C4.6257 30.6945 4.16432 28.6997 4.00745 26.6202ZM15.3137 26.6202H23.3799V32.5602H15.955C15.6158 30.6946 15.389 28.7016 15.3137 26.6202ZM26.6199 26.6202H34.6862C34.6109 28.7016 34.3841 30.6946 34.0449 32.5602H26.6199V26.6202ZM37.9262 26.6202H45.9924C45.8356 28.6997 45.3742 30.6945 44.6593 32.5602H37.3524C37.6672 30.6666 37.8587 28.6847 37.9262 26.6202ZM6.89305 35.8002H13.3225C13.8795 37.9879 14.6054 39.9887 15.4825 41.7571C15.9816 42.7634 16.5433 43.7063 17.153 44.5583C12.8491 42.8343 9.24199 39.7373 6.89305 35.8002V35.8002ZM16.6975 35.8002H23.3799V45.7564C21.5851 45.0688 19.8373 43.2343 18.3849 40.3058C17.7306 38.9865 17.1679 37.471 16.6975 35.8002V35.8002ZM26.6199 35.8002H33.3024C32.832 37.471 32.2693 38.9865 31.6149 40.3058C30.1626 43.2343 28.4148 45.0688 26.6199 45.7564V35.8002ZM36.6774 35.8002H43.1068C40.7579 39.7373 37.1508 42.8343 32.8468 44.5583C33.4566 43.7063 34.0183 42.7634 34.5174 41.7571C35.3945 39.9887 36.1204 37.9879 36.6774 35.8002V35.8002Z"
        fill={color}
      />
    </Svg>
  )
}