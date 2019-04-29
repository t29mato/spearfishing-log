// @flow

import { createBottomTabNavigator } from 'react-navigation';
import ReportListScreen from '../screens/ReportListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const MainBottomTabNavigator = createBottomTabNavigator(
  {
    ReportListScreen,
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
