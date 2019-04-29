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

const db = SQLite.openDatabase('db');

export default class PointListScreen extends React.Component {
  state = {
    points: null,
  };
  componentWillMount() {
    db.transaction(tx => {
      // tx.executeSql('drop table if exists points;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
      tx.executeSql(
        'create table if not exists points (id integer primary key not null, name text, coordinate text, memo text);'
      ),
        null,
        tx.executeSql('select * from points', null, (_, { rows: { _array } }) => {
          console.log(JSON.stringify(_array));
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
            <Title>ポイント</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('PointCreateScreen', {
                  refresh: this.componentWillMount.bind(this),
                });
              }}>
              <Icon name={'add'} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Text>{JSON.stringify(this.state.points)}</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
