// @flow

import { createBottomTabNavigator } from 'react-navigation';
import ReportListScreen from '../screens/report/ReportListScreen';
import CatchListScreen from '../screens/catch/CatchListScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import PointListScreen from '../screens/point/PointListScreen';

const MainBottomTabNavigator = createBottomTabNavigator(
  {
    ReportListScreen,
    CatchListScreen,
    PointListScreen,
    SettingsScreen,
  },
  {
    initialRouteName: 'PointListScreen',
    navigationOptions: {
      header: null,
    },
  }
);

export default MainBottomTabNavigator;
