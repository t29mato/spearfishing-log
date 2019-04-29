// @flow

import React from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import BottomTabbar from '../components/BottomTabbar';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text>Simon Mignolet from CatchListScreen</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </Content>
        <BottomTabbar navigation={this.props.navigation} />
      </Container>
    );
  }
}
