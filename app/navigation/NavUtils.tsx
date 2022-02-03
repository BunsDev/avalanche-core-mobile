import {StackNavigationOptions} from '@react-navigation/stack';
import AvaText from 'components/AvaText';
import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export const MainHeaderOptions = (
  title: string,
  hideHeaderLeft = false,
): Partial<StackNavigationOptions | BottomTabNavigationOptions> => {
  return {
    headerShown: true,
    headerTitle: () => <AvaText.Heading1>{title} </AvaText.Heading1>,
    headerTitleAlign: 'left',
    headerLeft: hideHeaderLeft ? () => null : undefined,
    headerBackTitleVisible: false,
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
  };
};

export const SubHeaderOptions = (
  title: string,
  hideHeaderLeft = false,
): Partial<StackNavigationOptions> => {
  const options: Partial<StackNavigationOptions | BottomTabNavigationOptions> =
    {
      headerShown: true,
      headerTitle: () => <AvaText.Heading1>{title}</AvaText.Heading1>,
      headerTitleAlign: 'center',
      headerLeft: hideHeaderLeft ? () => null : undefined,
      headerBackTitleVisible: false,
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      },
    };

  return options;
};
