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
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

const db = SQLite.openDatabase('db');

export default class ReportCreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isVisibleEntryTimePicker: false,
    isVisibleExitTimePicker: false,
    entryTime: null,
    exitTime: null,
    diary: null,
  };
  _toggleModalEntryTime = () => {
    this.setState({ isVisibleEntryTimePicker: !this.state.isVisibleEntryTimePicker });
  };
  _toggleModalExitTime = () => {
    this.setState({ isVisibleExitTimePicker: !this.state.isVisibleExitTimePicker });
  };

  _handleEntryTimePicked = date => {
    this.setState({
      entryTime: date,
    });
    this._toggleModalEntryTime();
  };
  _handleExitTimePicked = date => {
    this.setState({
      exitTime: date,
    });
    this._toggleModalExitTime();
  };
  render() {
    const moveToReportDetail = (tx, data) => {
      this.props.navigation.navigate('ReportDetailScreen', { reportId: data.insertId });
    };

    const _createReport = (date, entryTime, exitTime, diary) => {
      db.transaction(tx => {
        tx.executeSql(
          'insert into reports (date, entryTime, exitTime, diary) values (?, ?, ?, ?);',
          [date, entryTime, exitTime, diary],
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
            <Title>突行記録</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                _createReport(
                  this.props.navigation.getParam('date'),
                  this.state.entryTime,
                  this.state.exitTime,
                  this.state.diary
                );
                this.props.navigation.state.params.refresh();
              }}>
              <Text>保存</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>{JSON.stringify(this.state)}</Text>
          <List>
            <ListItem>
              <Left>
                <Icon active name={'calendar'} />
                <Text>突行日</Text>
              </Left>
              <Text>{this.props.navigation.getParam('date')}</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Icon active name={'time'} />
                <Text>突行時間</Text>
              </Left>
              <Button light small onPress={() => this._toggleModalEntryTime()}>
                {this.state.entryTime ? (
                  <Text>
                    {this.state.entryTime.getHours() + ':' + this.state.entryTime.getMinutes()}
                  </Text>
                ) : (
                  <Text style={{ color: 'grey' }}>00:00</Text>
                )}
              </Button>
              <Text> 〜 </Text>
              <Button light small onPress={() => this._toggleModalExitTime()}>
                {this.state.exitTime ? (
                  <Text>
                    {this.state.exitTime.getHours() + ':' + this.state.exitTime.getMinutes()}
                  </Text>
                ) : (
                  <Text style={{ color: 'grey' }}>00:00</Text>
                )}
              </Button>
              <DateTimePicker
                titleIOS={'時間を選択'}
                isVisible={this.state.isVisibleEntryTimePicker}
                onConfirm={this._handleEntryTimePicked}
                confirmTextIOS={'決定'}
                onCancel={this._toggleModalEntryTime}
                cancelTextIOS={'キャンセル'}
                mode={'time'}
              />
              <DateTimePicker
                titleIOS={'時間を選択'}
                isVisible={this.state.isVisibleExitTimePicker}
                onConfirm={this._handleExitTimePicked}
                confirmTextIOS={'決定'}
                onCancel={this._toggleModalExitTime}
                cancelTextIOS={'キャンセル'}
                mode={'time'}
              />
            </ListItem>
            <ListItem style={{ paddingBottom: 0 }} noBorder>
              <Left>
                <Icon name={'notebook'} type={'SimpleLineIcons'} />
                <Text>日記</Text>
              </Left>
            </ListItem>
            <ListItem style={{ paddingTop: 0 }}>
              <Body>
                <Form>
                  <Textarea
                    rowSpan={5}
                    bordered
                    placeholder="日記を入力できます。"
                    onChangeText={text => this.setState({ diary: text })}
                  />
                </Form>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
