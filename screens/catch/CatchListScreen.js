// @flow

import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';
import { SQLite } from 'expo';
import { FlatList } from 'react-native';
const db = SQLite.openDatabase('db');

export default class CatchListScreen extends React.Component {
  state = {
    points: null,
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
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>突果一覧</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('CatchCreateScreen', {
                  refresh: this.componentWillMount.bind(this),
                });
              }}>
              <Icon name={'add'} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>{JSON.stringify(this.state)}</Text>
          <FlatList
            data={this.state.points}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate('PointDetailScreen', {
                    point: item,
                    refresh: this.componentWillMount.bind(this),
                  });
                }}>
                <Left>
                  <Text>{item.name}</Text>
                </Left>
                <Right>
                  <Text>{item.memo}</Text>
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}
