import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { useApplicationContext } from 'contexts/ApplicationContext'

interface Prop {
  size?: number
  color?: string
  testID?: string
}

export default function FingerprintSVG({ color, size = 66 }: Prop) {
  const context = useApplicationContext()

  const iconColor = color ?? context.theme.blueDark
  return (
    <Svg width={size} height={size} viewBox="0 0 66 66" testID="finger_print">
      <G fill={iconColor}>
        <Path d="M2.34407 24.2268C3.03886 24.4986 3.9753 24.1966 4.30759 23.2601C9.08044 9.48529 20.7709 2.80934 32.5822 2.80934C38.2613 2.80934 42.581 4.07807 45.9643 6.16242C46.7799 6.67595 47.7466 6.58533 48.0789 5.76971C48.4716 4.89368 48.0185 4.34994 47.3539 3.92703C43.2456 1.29894 38.5936 0 32.5822 0C19.3813 0 6.96589 7.15928 1.61908 21.9007C1.19617 23.0789 1.61908 23.9247 2.34407 24.2268ZM64.2401 34.7089C65.0255 34.7089 65.6297 34.0443 65.5391 33.1683C64.3307 21.5383 60.1016 13.4425 53.3351 7.67281C52.6403 7.06866 51.7642 7.15928 51.3111 7.67281C50.7976 8.18635 50.7674 9.06238 51.4924 9.69675C57.6246 15.2852 61.8537 22.5653 62.8506 33.2287C62.911 34.0443 63.4245 34.7089 64.2401 34.7089ZM7.26797 50.6285C7.72108 51.2931 8.68774 51.4441 9.38252 50.8399C11.4971 49.0879 12.5544 46.1577 12.5241 43.3182C12.4939 39.0891 10.7117 37.0953 10.7117 31.7183C10.7117 20.0883 20.5595 10.2405 32.2197 10.2405C46.7799 10.2405 55.8423 21.931 55.9027 38.938C55.9329 45.2515 54.9361 50.115 53.6673 53.3472C53.3351 54.1628 53.6673 54.9784 54.3319 55.2805C54.9965 55.5826 55.9329 55.3409 56.235 54.4951C57.534 50.8702 58.6819 45.5838 58.6819 38.9078C58.6819 20.3299 48.4716 7.49157 32.2197 7.49157C19.0188 7.49157 7.93254 18.5779 7.93254 31.7183C7.93254 36.7328 9.80543 40.1161 9.83564 43.3182C9.83564 45.3421 9.02003 47.366 7.57004 48.6348C6.96589 49.1483 6.87526 50.0243 7.26797 50.6285ZM20.2272 40.388C19.3813 38.1828 18.2032 35.3735 18.2032 32.111C18.2032 23.8038 24.3052 17.7018 32.5822 17.7018C35.5728 17.7018 37.1436 18.2154 39.6207 19.5747C40.4061 19.9674 41.1311 19.7258 41.4331 19.182C41.7956 18.5477 41.705 17.6716 40.7383 17.0977C38.5936 15.7685 35.603 14.9227 32.5822 14.9227C22.7646 14.9227 15.4241 22.2632 15.4241 32.111C15.4241 35.4037 16.3303 38.4849 17.5387 41.4453C17.9012 42.2911 18.6564 42.6536 19.5022 42.3213C20.2272 42.0192 20.5292 41.2036 20.2272 40.388ZM44.1518 23.5018C47.0518 27.7309 48.4716 33.8027 48.4716 40.6901C48.4716 48.0306 46.4779 55.0993 43.1248 59.4794C42.6717 60.0836 42.581 60.9596 43.1248 61.5033C43.6987 62.0773 44.756 62.0773 45.2695 61.4127C48.9851 56.368 51.2205 48.6046 51.2205 40.5995C51.2205 32.2923 49.408 26.4621 46.6289 22.0518C46.0852 21.1758 45.2091 20.9945 44.5445 21.357C43.8196 21.7497 43.6081 22.6559 44.1518 23.5018ZM20.1667 60.0232C24.9698 56.1565 27.6281 49.9941 27.5979 43.1067C27.5375 37.9412 25.6948 34.7089 25.6948 31.7485C25.6948 27.8215 28.4739 25.1934 32.4312 25.1934C38.3519 25.1934 40.6779 31.5069 40.7988 40.2974C40.98 49.7827 37.5665 57.5461 33.0957 61.5638C32.5218 62.0773 32.401 62.8325 32.8239 63.4367C33.277 64.071 34.2436 64.2221 34.9082 63.6179C39.6811 59.268 43.4571 50.115 43.4269 40.1161C43.3966 29.6944 40.2852 22.4445 32.4312 22.4445C27.0542 22.4445 22.9761 26.0694 22.9761 31.5371C22.9761 34.7995 24.7584 38.9078 24.8188 43.1067C24.849 49.1483 22.5532 54.4649 18.4449 57.818C17.7199 58.3919 17.6595 59.2075 18.0824 59.8117C18.5657 60.5065 19.472 60.6273 20.1667 60.0232ZM3.46177 41.8984C4.18676 41.6567 4.57946 40.9317 4.3378 40.0255C3.55239 37.0953 3.1899 33.41 3.28052 29.3621C3.28052 28.4861 2.79719 27.9725 2.04199 27.9423C1.07534 27.8819 0.561806 28.4861 0.50139 29.2413C0.320142 32.7152 0.622221 37.0349 1.64929 40.8109C1.92116 41.7172 2.70657 42.1099 3.46177 41.8984ZM35.2707 46.2181C36.1467 42.3515 35.754 36.9141 34.2134 32.6548C33.8509 31.6579 33.126 31.3558 32.3405 31.5975C31.6156 31.8392 31.1926 32.5641 31.4645 33.41C32.9749 37.5485 33.3072 42.2307 32.5218 45.8556C32.3708 46.6108 32.6728 47.3056 33.5187 47.4567C34.3343 47.6077 35.0593 47.1244 35.2707 46.2181ZM13.9137 56.0961C16.1189 54.9482 19.1699 51.0816 19.9553 47.9098C20.1668 47.1546 19.774 46.3692 19.0188 46.1275C18.3241 45.9161 17.5991 46.3088 17.3272 47.1244C16.5116 50.0243 14.8199 52.1087 12.645 53.5889C11.7387 54.2232 11.6481 55.0388 11.9502 55.6128C12.2523 56.217 13.0377 56.5492 13.9137 56.0961ZM27.024 62.4398C29.4104 60.6877 32.1593 57.1534 33.5791 52.8639C33.7603 52.1993 33.6093 51.3233 32.8239 51.0816C32.0385 50.8097 31.2833 51.1722 31.0416 51.867C29.4104 56.1565 27.4167 58.6336 25.3323 60.2044C24.6979 60.6877 24.5167 61.5336 24.9396 62.1679C25.3625 62.8929 26.299 62.9835 27.024 62.4398Z" />
      </G>
    </Svg>
  )
}
