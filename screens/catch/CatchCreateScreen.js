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

type Props = {
  navigation: Object,
};
type State = {
  isVisibleDatePicker: boolean,
  isVisibleTimePicker: boolean,
  catch: {
    id: number,
    date: Date,
    time: Date,
    fishTypeId: number,
    fishSize: number,
    fishWeight: number,
    pointId: string,
    pointName: string,
    weather: string,
    temperature: string,
    wind: string,
    waterTemperature: string,
    waterDepth: string,
    clarity: string,
    memo: string,
  },
};

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
      fishSize: 0,
      fishWeight: 0.0,
      pointId: '',
      pointName: '',
      weather: '',
      temperature: '',
      wind: '',
      waterTemperature: '',
      waterDepth: '',
      clarity: '',
      memo: '',
    },
  };

  _toggleModalDatePicker = (): void => {
    this.setState({ isVisibleDatePicker: !this.state.isVisibleDatePicker });
  };
  _toggleModalTimePicker = (): void => {
    this.setState({ isVisibleTimePicker: !this.state.isVisibleTimePicker });
  };
  _handleDatePicked = (date: Date): voide => {
    this.setState({ catch: Object.assign(this.state.catch, { date }) });
    this._toggleModalDatePicker();
  };
  _handleTimePicked = (time: Date): void => {
    this.setState({ catch: Object.assign(this.state.catch, { time }) });
    this._toggleModalTimePicker();
  };
  returnFishTypeId(fishTypeId: number): void {
    this.setState({ catch: Object.assign(this.state.catch, { fishTypeId }) });
  }
  returnFishSize(fishSize: number): void {
    this.setState({ catch: Object.assign(this.state.catch, { fishSize }) });
  }
  returnFishWeight(fishWeight: number): void {
    this.setState({ catch: Object.assign(this.state.catch, { fishWeight }) });
  }
  returnPoint(pointId: string, pointName: string): void {
    this.setState({ catch: Object.assign(this.state.catch, { pointId, pointName }) });
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
          <ListItem onPress={() => this._toggleModalDatePicker()}>
            <Left style={{ width: 80 }}>
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
          <ListItem onPress={() => this._toggleModalTimePicker()}>
            <Left style={{ width: 80 }}>
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
          <ListItem
            onPress={() =>
              this.props.navigation.navigate('FishTypeSelectScreen', {
                catch: this.state.catch,
                returnFishTypeId: this.returnFishTypeId.bind(this),
              })
            }>
            <Left style={{ width: 80 }}>
              <Text>魚種</Text>
            </Left>
            <Body>
              {/* 魚種マスターのIDは1から */}
              {this.state.catch.fishTypeId > 0 ? (
                <Text>{fishTypes[this.state.catch.fishTypeId].katakana}</Text>
              ) : (
                <Text style={{ color: 'grey' }}>魚種不明</Text>
              )}
            </Body>
            <Right>
              <Icon active name={'arrow-forward'} />
            </Right>
          </ListItem>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate('FishSizeInputScreen', {
                catch: this.state.catch,
                returnFishSize: this.returnFishSize.bind(this),
              })
            }>
            <Left style={{ width: 80 }}>
              <Text>サイズ</Text>
            </Left>
            <Body>
              {this.state.catch.fishSize ? (
                <Text>{this.state.catch.fishSize + 'cm'}</Text>
              ) : (
                <Text style={{ color: 'grey' }}>未入力</Text>
              )}
            </Body>
            <Right>
              <Icon active name={'arrow-forward'} />
            </Right>
          </ListItem>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate('FishWeightInputScreen', {
                catch: this.state.catch,
                returnFishWeight: this.returnFishWeight.bind(this),
              })
            }>
            <Left style={{ width: 80 }}>
              <Text>重さ</Text>
            </Left>
            <Body>
              {this.state.catch.fishWeight ? (
                <Text>{this.state.catch.fishWeight + 'kg'}</Text>
              ) : (
                <Text style={{ color: 'grey' }}>未入力</Text>
              )}
            </Body>
            <Right>
              <Icon active name={'arrow-forward'} />
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>ポイント</Text>
          </Separator>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate('PointSelectScreen', {
                pointId: this.state.catch.pointId,
                returnPoint: this.returnPoint.bind(this),
              })
            }>
            <Left style={{ width: 80 }}>
              <Text>ポイント</Text>
            </Left>
            <Body>
              {this.state.catch.pointName ? (
                <Text>{this.state.catch.pointName}</Text>
              ) : (
                <Text style={{ color: 'grey' }}>未選択</Text>
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
