// @flow

import { createBottomTabNavigator } from 'react-navigation';
import ReportListScreen from '../screens/ReportListScreen';
import CatchListScreen from '../screens/CatchListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PointListScreen from '../screens/PointListScreen';

const MainBottomTabNavigator = createBottomTabNavigator(
  {
    ReportListScreen,
    CatchListScreen,
    PointListScreen,
    SettingsScreen,
  },
  {
    initialRouteName: 'ReportListScreen',
    navigationOptions: {
      header: null,
    },
  }
);

export default MainBottomTabNavigator;
