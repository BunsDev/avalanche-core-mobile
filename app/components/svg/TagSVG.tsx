import * as React from 'react'
import Svg, { G, Path, Circle, Defs, ClipPath } from 'react-native-svg'

const TagSVG = () => (
  <Svg width={24} height={24} fill="none">
    <G clipPath="url(#a)" fill="#fff">
      <Path d="m3.782 5.089 1.125.006-1.125-.006Zm.746-.746-.006-1.125.006 1.125Zm7.167 16.398-.796.795.796-.796Zm0 0 .795-.796-.795.796Zm-7.952-8.582-1.125-.006 1.125.006ZM11.6 4.304l.006 1.125-.006-1.125Zm.273 1.235 7.512 7.512 1.591-1.591-7.512-7.512-1.59 1.59Zm7.512 8.042-6.364 6.364 1.591 1.591 6.364-6.364-1.59-1.591Zm-6.894 6.364-7.513-7.513-1.59 1.59 7.512 7.514 1.591-1.591Zm.53 0a.375.375 0 0 1-.53 0l-1.59 1.591a2.625 2.625 0 0 0 3.711 0l-1.59-1.591Zm6.364-6.894a.375.375 0 0 1 0 .53l1.591 1.591a2.625 2.625 0 0 0 0-3.712l-1.59 1.59Zm-14.516-.885.04-7.071-2.25-.013-.04 7.071 2.25.013Zm-.334-6.698 7.071-.04-.012-2.25-7.071.04.012 2.25Zm.373-.373a.375.375 0 0 1-.373.373l-.012-2.25a1.875 1.875 0 0 0-1.865 1.864l2.25.013ZM10.9 21.536l1.591-1.591-1.59 1.591Zm-5.922-9.104a.372.372 0 0 1-.109-.266l-2.25-.013c-.004.7.271 1.373.768 1.87l1.591-1.591Zm8.486-8.484a2.625 2.625 0 0 0-1.87-.77l.012 2.25c.1 0 .197.04.267.11l1.591-1.59Z" />
      <Circle
        cx={7.982}
        cy={8.543}
        r={1.125}
        transform="rotate(-45 7.982 8.543)"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(0 .75)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default TagSVG
