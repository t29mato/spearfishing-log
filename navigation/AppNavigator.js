// @flow

import { createAppContainer, createStackNavigator } from 'react-navigation';
import ReportCreateScreen from '../screens/report/ReportCreateScreen';
import ReportDetailScreen from '../screens/report/ReportDetailScreen';

import PointCreateScreen from '../screens/point/PointCreateScreen';
import PointDetailScreen from '../screens/point/PointDetailScreen';
import PointNameEditScreen from '../screens/point/PointNameEditScreen';
import PointMemoEditScreen from '../screens/point/PointMemoEditScreen';
import PointEditScreen from '../screens/point/PointEditScreen';
import PointSelectScreen from '../screens/point/PointSelectScreen';

import CalendarSelectScreen from '../screens/report/CalendarSelectScreen';
import MainBottomTabNavigator from './MainBottomTabNavigator';
import CatchCreateScreen from '../screens/catch/CatchCreateScreen';
import CatchDetailScreen from '../screens/catch/CatchDetailScreen';
import CatchEditScreen from '../screens/catch/CatchEditScreen';
import FishTypeSelectScreen from '../screens/catch/FishTypeSelectScreen';
import FishSizeInputScreen from '../screens/catch/FishSizeInputScreen';
import FishWeightInputScreen from '../screens/catch/FishWeightInputScreen';

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
      PointSelectScreen,
      CatchCreateScreen,
      CatchDetailScreen,
      CatchEditScreen,
      FishTypeSelectScreen,
      FishSizeInputScreen,
      FishWeightInputScreen,
    },
    {
      initialRouteName: 'MainBottomTabNavigator',
    }
  )
);
