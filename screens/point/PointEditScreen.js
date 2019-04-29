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
    point: this.props.navigation.getParam('point'),
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
    const _editPoint = (name, memo, id) => {
      if (!name) {
        Alert.alert('名称は必須です');
        return null;
      }
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE points SET name = ?, memo = ? WHERE id = ?;',
          [name, memo, id],
          (_, rows) => {
            this.setState({
              point: Object.assign(this.state.point, { name, memo }),
            });
            this.props.navigation.pop();
          },
          (_, msg) => Alert.alert('ポイントの編集に失敗しました。')
        );
      });
    };
    const _deletePoint = id => {
      Alert.alert(
        'ポイント削除',
        'ポイントを本当に削除しますか？',
        [
          {
            text: 'キャンセル',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'OK',
            onPress: () => {
              db.transaction(tx => {
                tx.executeSql(
                  'DELETE FROM points WHERE id = ?;',
                  [id],
                  (_, rows) => {
                    this.props.navigation.pop(2);
                  },
                  (_, msg) => Alert.alert('ポイントの削除に失敗しました。')
                );
              });
            },
          },
        ],
        { cancelable: true }
      );
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
            <Title>ポイント編集</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                _editPoint(this.state.point.name, this.state.point.memo, this.state.point.id);
                this.props.navigation.state.params.refresh();
                this.props.navigation.state.params.returnPoint();
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
            last
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
          <ListItem
            last
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
          <Button
            full
            danger
            onPress={() => {
              _deletePoint(this.state.point.id);
              this.props.navigation.state.params.refresh();
            }}>
            <Text>ポイントを削除する</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
