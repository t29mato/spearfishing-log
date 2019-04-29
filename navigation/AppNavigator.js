// @flow

import { createAppContainer, createStackNavigator } from 'react-navigation';
import ReportCreateScreen from '../screens/report/ReportCreateScreen';
import ReportDetailScreen from '../screens/report/ReportDetailScreen';
import CalendarSelectScreen from '../screens/report/CalendarSelectScreen';
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
