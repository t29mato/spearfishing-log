// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import ReportCreateScreen from '../screens/ReportCreateScreen';
import CalendarSelectScreen from '../screens/CalendarSelectScreen';
import MainBottomTabNavigator from './MainBottomTabNavigator';

export default createAppContainer(
  createStackNavigator(
    {
      MainBottomTabNavigator,
      ReportCreateScreen,
      CalendarSelectScreen,
    },
    {
      initialRouteName: 'MainBottomTabNavigator',
      mode: 'modal',
    }
  )
);
