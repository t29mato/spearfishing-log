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
  Separator,
  Picker,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Alert, FlatList } from 'react-native';
import fishTypes from '../../data/master/fishTypes';
const db = SQLite.openDatabase('db');
import { CatchType } from '../../constans/Type';

type Props = {
  navigation: Object,
};
type State = {
  isVisibleDatePicker: boolean,
  isVisibleTimePicker: boolean,
  catch: CatchType,
}

export default class CatchCreateScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    isVisibleDatePicker: false,
    isVisibleTimePicker: false,
    catch: {
      id: 0,
      date: new Date(),
      time: new Date(),
      fishTypeId: 0,
      fishSize: '',
      fishWeight: '',
      pointId: '',
      weather: '',
      temperature: '',
      wind: '',
      waterTemperature: '',
      waterDepth: '',
      clarity: '',
      memo: '',
    },
  };

  _toggleModalDatePicker = () => {
    this.setState({ isVisibleDatePicker: !this.state.isVisibleDatePicker });
  };
  _toggleModalTimePicker = () => {
    this.setState({ isVisibleTimePicker: !this.state.isVisibleTimePicker });
  };
  _handleDatePicked = (date: Date) => {
    this.setState({ catch: Object.assign(this.state.catch, { date }) });
    this._toggleModalDatePicker();
  };
  _handleTimePicked = (time: Date) => {
    this.setState({ catch: Object.assign(this.state.catch, { time }) });
    this._toggleModalTimePicker();
  };
  _onValueChange(fishTypeId: number) {
    this.setState({ catch: Object.assign(this.state.catch, { fishTypeId })});
  }

  // returnName(memo: string) {
  //   this.setState({
  //     point: Object.assign(this.state.catch, { memo }),
  //   });
  // }

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
              // this.setState({
              //   point: Object.assign(this.state.catch, {
              //     memo,
              //   }),
              // });
              this.props.navigation.navigate('PointDetailScreen', {
                point: this.state.catch,
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
            <Title>突果登録</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                // _createPoint(this.state.catch.name, this.state.catch.memo);
                this.props.navigation.state.params.refresh();
              }}>
              <Text>保存</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>{JSON.stringify(this.state)}</Text>
          <ListItem icon onPress={() => this._toggleModalDatePicker()}>
            <Left style={{ width: 100 }}>
              <Text>突行日</Text>
            </Left>
            <Body>
              {this.state.catch.date ? (
                <Text>
                  {this.state.catch.date.getFullYear() +
                    '年' +
                    (this.state.catch.date.getMonth() + 1) +
                    '月' +
                    this.state.catch.date.getDate() +
                    '日'}
                </Text>
              ) : (
                <Text style={{ color: 'grey' }}>未入力</Text>
              )}
              <DateTimePicker
                titleIOS={'日付を選択'}
                isVisible={this.state.isVisibleDatePicker}
                onConfirm={this._handleDatePicked}
                confirmTextIOS={'決定'}
                onCancel={this._toggleModalDatePicker}
                cancelTextIOS={'キャンセル'}
                mode={'date'}
              />
            </Body>
            <Right>
              <Icon active name={'arrow-down'} />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this._toggleModalTimePicker()}>
            <Left style={{ width: 100 }}>
              <Text>突果時間</Text>
            </Left>
            <Body>
              {this.state.catch.time ? (
                <Text>
                  {this.state.catch.time.getHours() +
                    '時' +
                    this.state.catch.time.getMinutes() +
                    '分'}
                </Text>
              ) : (
                <Text style={{ color: 'grey' }}>未入力</Text>
              )}
              <DateTimePicker
                titleIOS={'時間を選択'}
                isVisible={this.state.isVisibleTimePicker}
                onConfirm={this._handleTimePicked}
                confirmTextIOS={'決定'}
                onCancel={this._toggleModalTimePicker}
                cancelTextIOS={'キャンセル'}
                mode={'time'}
              />
            </Body>
            <Right>
              <Icon active name={'arrow-down'} />
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>魚の情報</Text>
          </Separator>
          <ListItem icon onPress={() => this.props.navigation.navigate('FishTypeSelectScreen', {
            catch: this.state.catch
          })}>
            <Left style={{ width: 100 }}>
              <Text>魚種</Text>
            </Left>
            <Body>
            </Body>
            <Right>
              <Icon active name={'arrow-forward'} />
            </Right>
          </ListItem>

          <ListItem
            last
            onPress={() =>
              this.props.navigation.navigate('PointMemoEditScreen', {
                point: this.state.catch,
                // returnMemo: this.returnMemo.bind(this),
              })
            }>
            <Body>
              {this.state.catch.memo ? (
                <Text>{this.state.catch.memo}</Text>
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
