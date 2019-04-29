// @flow

import React from 'react';
import { SQLite } from 'expo';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Header,
  Body,
  Title,
  Icon,
  Left,
  Right,
  Button,
  Form,
  Textarea,
  Item,
  Label,
  Input,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {  TextInput  } from 'react-native';

const db = SQLite.openDatabase('db');

export default class PointCreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    name: null,
    coordinate: null,
    memo: null,
  };
  render() {
    const moveToReportDetail = (tx, data) => {
      this.props.navigation.navigate('ReportDetailScreen', { pointId: data.insertId });
    };

    const _createPoint = (name, coordinate, memo) => {
      db.transaction(tx => {
        tx.executeSql(
          'insert into reports (name, coordinate, memo) values (?, ?, ?);',
          [name, coordinate, memo],
          moveToReportDetail,
          error => {
            alert(error);
          }
        );
      });
    };

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ポイント作成</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this._createPoint(this.state.name, this.state.coordinate, this.state.memo);
                this.props.navigation.state.params.refresh();
              }}>
              <Text>保存</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Icon active name={'star'} type={'MaterialIcons'} />
                <Text>名称</Text>
              </Left>
              <Body>
                <Text>{this.state.name}</Text>
              </Body>
              <Right>
                <Icon active name={'arrow-forward'} />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Icon active name={'place'} type={'MaterialIcons'} />
                <Text>座標</Text>
              </Left>
              <Body>
                <Text>{this.state.coordinate}</Text>
              </Body>
              <Right>
                <Icon active name={'arrow-forward'} />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Icon active name={'note'} type={'MaterialIcons'} />
                <Text>メモ</Text>
              </Left>
              <Body>
                {this.state.memo ? (
                  <Text>this.state.memo</Text>
                ) : (
                  <Text style={{ color: 'grey' }}>
                    ポイントの特徴や見れる魚の種類を記入しましょう
                  </Text>
                )}
              </Body>
              <Right>
                <Icon active name={'arrow-forward'} />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
