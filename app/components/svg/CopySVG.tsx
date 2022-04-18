import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useApplicationContext } from 'contexts/ApplicationContext'

interface Prop {
  color?: string
  size?: number
}

function CopySVG({ color, size = 16 }: Prop) {
  const theme = useApplicationContext().theme
  const iconColor = color ?? theme.alternateBackground
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        fill={iconColor}
        d="M14.2293 4.82518H11.1749V1.77087C11.1749 1.34452 11.0056 0.935637 10.7041 0.634166C10.4026 0.332695 9.99376 0.16333 9.56741 0.16333H1.77087C1.34452 0.16333 0.935637 0.332695 0.634166 0.634166C0.332695 0.935637 0.16333 1.34452 0.16333 1.77087V9.56741C0.16333 9.99376 0.332695 10.4026 0.634166 10.7041C0.935637 11.0056 1.34452 11.1749 1.77087 11.1749H4.82518V14.2293C4.82518 14.6556 4.99455 15.0645 5.29602 15.366C5.59749 15.6674 6.00637 15.8368 6.43272 15.8368H14.2293C14.6556 15.8368 15.0645 15.6674 15.366 15.366C15.6674 15.0645 15.8368 14.6556 15.8368 14.2293V6.43272C15.8368 6.00637 15.6674 5.59749 15.366 5.29602C15.0645 4.99455 14.6556 4.82518 14.2293 4.82518ZM1.36898 9.56741V1.77087C1.36898 1.66428 1.41132 1.56206 1.48669 1.48669C1.56206 1.41132 1.66428 1.36898 1.77087 1.36898H9.56741C9.674 1.36898 9.77622 1.41132 9.85159 1.48669C9.92695 1.56206 9.96929 1.66428 9.96929 1.77087V9.56741C9.96929 9.674 9.92695 9.77622 9.85159 9.85159C9.77622 9.92695 9.674 9.96929 9.56741 9.96929H1.77087C1.66428 9.96929 1.56206 9.92695 1.48669 9.85159C1.41132 9.77622 1.36898 9.674 1.36898 9.56741ZM14.6311 14.2293C14.6311 14.3358 14.5888 14.4381 14.5134 14.5134C14.4381 14.5888 14.3358 14.6311 14.2293 14.6311H6.43272C6.32613 14.6311 6.22391 14.5888 6.14854 14.5134C6.07317 14.4381 6.03083 14.3358 6.03083 14.2293V11.1749H9.56741C9.99376 11.1749 10.4026 11.0056 10.7041 10.7041C11.0056 10.4026 11.1749 9.99376 11.1749 9.56741V6.03083H14.2293C14.3358 6.03083 14.4381 6.07317 14.5134 6.14854C14.5888 6.22391 14.6311 6.32613 14.6311 6.43272V14.2293Z"
      />
    </Svg>
  )
}

export default CopySVG
