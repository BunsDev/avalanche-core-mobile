import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from '@avalabs/k2-mobile'

interface Prop {
  selected: boolean
  size?: number
}

function BrowserSVG({ selected, size = 32 }: Prop): JSX.Element {
  const { theme } = useTheme()
  const svgColor = selected ? theme.colors.$blueDark : theme.colors.$neutral600

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      accessible={false}
      testID={'BrowserSVG'}>
      <Path
        d="M26.1784 22.5346C26.9517 21.188 27.445 19.5613 26.8584 17.668C26.1517 15.3746 24.1384 13.6013 21.7384 13.3746C17.9117 13.0013 14.765 16.1346 15.1384 19.9746C15.3784 22.3613 17.1384 24.388 19.4317 25.0946C21.3384 25.6813 22.9517 25.188 24.2984 24.4146L27.6317 27.748C28.1517 28.268 28.9784 28.268 29.4984 27.748C30.0184 27.228 30.0184 26.4013 29.4984 25.8813L26.1784 22.5346ZM21.1117 22.668C19.245 22.668 17.7784 21.2013 17.7784 19.3346C17.7784 17.468 19.245 16.0013 21.1117 16.0013C22.9784 16.0013 24.445 17.468 24.445 19.3346C24.445 21.2013 22.9784 22.668 21.1117 22.668ZM16.445 26.668V29.3346C9.08503 29.3346 3.11169 23.3613 3.11169 16.0013C3.11169 8.6413 9.08503 2.66797 16.445 2.66797C22.8984 2.66797 28.2717 7.25464 29.5117 13.3346H26.7517C25.8984 10.0546 23.5517 7.37464 20.445 6.1213V6.66797C20.445 8.13464 19.245 9.33464 17.7784 9.33464H15.1117V12.0013C15.1117 12.7346 14.5117 13.3346 13.7784 13.3346H11.1117V16.0013H13.7784V20.0013H12.445L6.05836 13.6146C5.88503 14.388 5.77836 15.1746 5.77836 16.0013C5.77836 21.8813 10.565 26.668 16.445 26.668Z"
        fill={svgColor}
      />
    </Svg>
  )
}

export default BrowserSVG
