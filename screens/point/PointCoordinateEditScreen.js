// @flow

import React from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
  Form,
  Input,
  Label,
  Item,
} from 'native-base';
import { View } from 'react-native';
import { MapView, takeSnapshotAsync } from 'expo';


export default class PointCoordinateEditScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    name: null,
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Body>
            <Text>座標選択</Text>
          </Body>
        </Header>
        <MapView style={{ flex: 1 }} />
        <Text>hoge</Text>
      </View>
    );
  }
}
