// @flow

import React from 'react';
import { SQLite } from 'expo';
import {
  Container,
  Content,
  ListItem,
  Text,
  Header,
  Body,
  Title,
  Icon,
  Left,
  Right,
  Button,
} from 'native-base';
import { Alert } from 'react-native';
const db = SQLite.openDatabase('db');

export default class PointCreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    point: {
      id: null,
      name: null,
      memo: null,
    },
  };

  returnName(name) {
    this.setState({
      point: Object.assign(this.state.point, { name }),
    });
  }
  returnMemo(memo) {
    this.setState({
      point: Object.assign(this.state.point, { memo }),
    });
  }

  render() {
    const _createPoint = (name, memo) => {
      if (!name) {
        Alert.alert('名称は必須です');
        return null;
      }
      db.transaction(tx => {
        // tx.executeSql('drop table if exists points;', null, alert('success'), (_, msg) => alert('failed' + JSON.stringify(msg)));
        tx.executeSql(
          'create table if not exists points (id integer primary key not null, name text, memo text);'
        ),
          null,
          tx.executeSql(
            'insert into points (name, memo) values (?, ?);',
            [name, memo],
            (_, rows) => {
              this.setState({
                point: Object.assign(this.state.point, {
                  id: rows.insertId,
                  name,
                  memo,
                }),
              });
              this.props.navigation.navigate('PointDetailScreen', {
                point: this.state.point,
                refresh: this.props.navigation.state.params.refresh,
              });
            },
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
                _createPoint(this.state.point.name, this.state.point.memo);
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
          <ListItem last
            onPress={() =>
              this.props.navigation.navigate('PointNameEditScreen', {
                point: this.state.point,
                returnName: this.returnName.bind(this),
              })
            }>
            <Body>
              {this.state.point.name ? (
                <Text>{this.state.point.name}</Text>
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
          <ListItem last
            onPress={() =>
              this.props.navigation.navigate('PointMemoEditScreen', {
                point: this.state.point,
                returnMemo: this.returnMemo.bind(this),
              })
            }>
            <Body>
              {this.state.point.memo ? (
                <Text>{this.state.point.memo}</Text>
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
