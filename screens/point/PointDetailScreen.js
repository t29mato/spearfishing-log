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

export default class ReportDetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    point: null,
  };
  componentWillMount() {
    db.transaction(tx => {
      // tx.executeSql('drop table if exists points;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
      tx.executeSql(
        'create table if not exists points (id integer primary key not null, date text, entryTime text, exitTime text, diary text);'
      ),
        null,
        tx.executeSql(
          'select * from points where id == ?',
          [this.props.navigation.getParam('reportId')],
          (_, { rows: { _array } }) => {
            console.log(JSON.stringify(_array));
            this.setState({ points: _array });
          }
        ),
        (_, error) => console.log(error);
    });
  }
  render() {
    // alert(this.props.navigation.getParam('reportId'));
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>突行詳細 {this.props.navigation.getParam('reportId')}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('CalendarSelectScreen', {
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
