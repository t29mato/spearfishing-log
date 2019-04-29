// @flow

import { createAppContainer, createStackNavigator } from 'react-navigation';
import ReportCreateScreen from '../screens/ReportCreateScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
import CalendarSelectScreen from '../screens/CalendarSelectScreen';
import MainBottomTabNavigator from './MainBottomTabNavigator';

export default createAppContainer(
  createStackNavigator(
    {
      MainBottomTabNavigator,
      ReportCreateScreen,
      CalendarSelectScreen,
      ReportDetailScreen,
    },
    {
      initialRouteName: 'MainBottomTabNavigator',
      mode: 'modal',
    }
  )
);
