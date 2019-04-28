// @flow

import React from 'react';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <AppNavigator />
      </StyleProvider>
    );
  }
}
