// @flow

import { createSwitchNavigator } from 'react-navigation';
import ReportListScreen from '../screens/ReportListScreen';
import CatchListScreen from '../screens/CatchListScreen';

const MainBottomTabNavigator = createSwitchNavigator(
  {
    ReportListScreen,
    CatchListScreen,
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

export default MainBottomTabNavigator;
