// @flow

import React from 'react';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
  ListItem,
  Text,
  Grid,
  Col,
} from 'native-base';
import { StyleSheet, FlatList } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db');

type Props = {
  navigation: Object,
};
type State = {
  points: Object,
  pointId: string,
  pointName: string,
};

export default class PointSelectScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    points: null,
    pointId: this.props.navigation.getParam('pointId'),
    pointName: '',
  };
  componentWillMount() {
    db.transaction(tx => {
      // tx.executeSql('drop table if exists points;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
      tx.executeSql(
        'create table if not exists points (id integer primary key not null, name text, memo text);'
      ),
        null,
        tx.executeSql('select * from points', null, (_, { rows: { _array } }) => {
          this.setState({ points: _array });
        }),
        (_, error) => console.log(error);
    });
  }

  render() {
    let PointList = [];
    if (this.state.points) {
      this.state.points.forEach(point => {
        PointList.push(
          <ListItem
            key={point.id}
            onPress={() => this.setState({ pointId: point.id, pointName: point.name })}
            selected={point.id === this.state.pointId}>
            <Left>
              <Text>{point.name}</Text>
            </Left>
            <Right>
              <Icon active name={'check'} type={'FontAwesome'} />
            </Right>
          </ListItem>
        );
      });
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnPoint(
                  this.state.pointId,
                  this.state.pointName
                );
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ポイントを選択</Title>
          </Body>
          <Right>
            <Button onPress={() => this.setState({ pointId: '' })} transparent>
              <Text>クリア</Text>
            </Button>
          </Right>
        </Header>
        <Content>{PointList}</Content>
      </Container>
    );
  }
}
