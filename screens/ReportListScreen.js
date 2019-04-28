// @flow

import React from 'react';
import { Container, Content, List, ListItem, Text, Header, Body, Title } from 'native-base';
import { SQLite } from 'expo';
import BottomTabbar from '../components/BottomTabbar';

const db = SQLite.openDatabase('db');

export default class ReportListScreen extends React.Component {
  state = {
    reports: null,
  };
  componentWillMount() {
    db.transaction(tx => {
      // tx.executeSql('drop table if exists reports;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
      tx.executeSql(
        'create table if not exists reports (id integer primary key not null, date text, entryTime text, exitTime text, diary text);'
      ),
        null,
        tx.executeSql('select * from reports', null, (_, { rows: { _array } }) => {
          this.setState({ reports: _array });
        }),
        error => console.log(error);
    });
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>突行一覧</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Text>{JSON.stringify(this.state.reports)}</Text>
            </ListItem>
          </List>
        </Content>
        <BottomTabbar
          navigation={this.props.navigation}
          reflesh={this.componentWillMount.bind(this)}
        />
      </Container>
    );
  }
}
