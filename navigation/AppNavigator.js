// @flow

import { createAppContainer, createStackNavigator } from 'react-navigation';
import ReportCreateScreen from '../screens/report/ReportCreateScreen';
import ReportDetailScreen from '../screens/report/ReportDetailScreen';
import PointCreateScreen from '../screens/point/PointCreateScreen';
import PointDetailScreen from '../screens/point/PointDetailScreen';
import CalendarSelectScreen from '../screens/report/CalendarSelectScreen';
import MainBottomTabNavigator from './MainBottomTabNavigator';
import PointNameEditScreen from '../screens/point/PointNameEditScreen';
import PointMemoEditScreen from '../screens/point/PointMemoEditScreen';
import PointEditScreen from '../screens/point/PointEditScreen';

export default createAppContainer(
  createStackNavigator(
    {
      MainBottomTabNavigator,
      ReportCreateScreen,
      CalendarSelectScreen,
      ReportDetailScreen,
      PointCreateScreen,
      PointDetailScreen,
      PointNameEditScreen,
      PointMemoEditScreen,
      PointEditScreen,
    },
    {
      initialRouteName: 'MainBottomTabNavigator',
    }
  )
);
