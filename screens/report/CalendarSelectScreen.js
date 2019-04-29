// @flow

import React from 'react';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Text, Header, Body, Title } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarSelectScreen extends React.Component {
  static navigationOptions = {
    title: '突行日を選択',
  };

  render() {
    console.log('hooge');
    return (
      <View>
        <Calendar
          onDayPress={date => {
            this.props.navigation.navigate('ReportCreateScreen', {
              date: date.dateString,
              refresh: this.props.navigation.state.params.refresh,
            });
          }}
        />
      </View>
    );
  }
}
