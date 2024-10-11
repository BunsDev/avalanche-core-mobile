import { StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { Platform } from 'react-native'
import { Row } from 'components/Row'
import { AppTheme } from 'contexts/ApplicationContext'
import { Text, View } from '@avalabs/k2-mobile'

export const BOTTOM_BAR_HEIGHT = 60

interface MainHeaderOptionsProps {
  title: string
  hideHeaderLeft?: boolean
  actionComponent?: React.ReactNode
  headerBackTestID?: string
}

export const MainHeaderOptions = (
  {
    title,
    hideHeaderLeft = false,
    actionComponent,
    headerBackTestID = 'header_back'
  }: MainHeaderOptionsProps = { title: '', headerBackTestID: 'header_back' }
): Partial<StackNavigationOptions> => {
  const options: Partial<StackNavigationOptions> = {
    headerBackTestID,
    headerShown: true,
    headerTitle: () => {
      return (
        <Row
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Text variant="heading4">{title}</Text>
        </Row>
      )
    },
    headerTitleAlign: 'left',
    headerLeft: hideHeaderLeft ? () => null : undefined,
    headerLeftContainerStyle: {
      paddingLeft: Platform.OS === 'ios' ? 8 : 0
    },
    headerBackTitleVisible: false,
    headerRight: actionComponent ? () => actionComponent : undefined,
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0
    }
  }
  return options
}

export const SubHeaderOptions = (
  title: string,
  hideHeaderLeft = false,
  headerBackTestID = 'header_back'
): Partial<StackNavigationOptions> => {
  const options: Partial<StackNavigationOptions> = {
    headerBackTestID,
    headerShown: true,
    headerTitle: () => <Text variant="heading5">{title}</Text>,
    headerTitleAlign: 'center',
    headerLeft: hideHeaderLeft ? () => null : undefined,
    headerBackTitleVisible: false,
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0
    }
  }

  return options
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCommonBottomTabOptions = (theme: AppTheme) => ({
  tabBarShowLabel: false,
  headerShown: true,
  tabBarAllowFontScaling: false,
  tabBarActiveTintColor: theme.colorPrimary1,
  tabBarInactiveTintColor: theme.colorText2,
  tabBarStyle: {
    backgroundColor: theme.background,
    height: BOTTOM_BAR_HEIGHT
  }
})

type TabButtonProps = {
  routeName: string
  image: React.ReactNode
  focused: boolean
}

/**
 * normal tab item
 *
 * @param routeName
 * @param image
 * @param focused
 */
export const TabButton = ({
  routeName,
  image,
  focused
}: TabButtonProps): JSX.Element => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', top: 2 }}>
      {image}
      <Text
        variant="bottomNavigationSmall"
        sx={{ color: focused ? '$neutral50' : '$neutral600' }}
        testID={`navutils_normal_tab_button__${routeName.toLowerCase()}`}>
        {routeName}
      </Text>
    </View>
  )
}

export const getModalOptions = (): Partial<StackNavigationOptions> => ({
  presentation: 'transparentModal',
  // on Android, for some reason, when animation is enabled, the modal will not appear
  // as a temp solution, we disable the animation on Android for now
  // this also doesn't seem to be affecting all modals, only some
  // TODO: remove this when the issue is resolved
  animationEnabled: Platform.OS === 'android' ? false : true
})
