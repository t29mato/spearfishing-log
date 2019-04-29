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
import { TextInput } from 'react-native';

const db = SQLite.openDatabase('db');

export default class PointCreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const moveToPointDetail = (tx, data) => {
      this.props.navigation.navigate('PointDetailScreen', { pointId: data.insertId });
    };

    const _createPoint = (name, memo) => {
      db.transaction(tx => {
        // tx.executeSql('drop table if exists points;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
        tx.executeSql(
          'create table if not exists points (id integer primary key not null, name text, memo text);'
        ),
          null,
          tx.executeSql(
            'insert into points (name, memo) values (?, ?);',
            [name, memo],
            moveToPointDetail,
            (_, msg) => {
              alert(JSON.stringify(msg));
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
                _createPoint(
                  this.props.navigation.getParam('name'),
                  this.props.navigation.getParam('memo')
                );
                this.props.navigation.state.params.refresh();
              }}>
              <Text>保存</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <ListItem itemDivider>
            <Text>名称 (必須)</Text>
          </ListItem>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate('PointNameEditScreen', {
                name: this.props.navigation.getParam('name'),
              })
            }>
            <Body>
              {this.props.navigation.getParam('name') ? (
                <Text>{this.props.navigation.getParam('name')}</Text>
              ) : (
                <Text style={{ color: 'grey' }}>例）〇〇海岸</Text>
              )}
            </Body>
            <Right>
              <Icon active name={'arrow-forward'} />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>メモ</Text>
          </ListItem>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate('PointMemoEditScreen', {
                memo: this.props.navigation.getParam('memo'),
              })
            }>
            <Body>
              {this.props.navigation.getParam('memo') ? (
                <Text>{this.props.navigation.getParam('memo')}</Text>
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
        </Content>
      </Container>
    );
  }
}
