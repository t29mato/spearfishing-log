// @flow

import React from 'react';
import { Text, Footer, FooterTab, Button, Card, CardItem, Body, Left, Right } from 'native-base';
import Modal from 'react-native-modal';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class BottomTabbar extends React.Component {
  state = {
    isModalVisible: false,
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={() => this.props.navigation.navigate('CatchListScreen')}>
            <Text>{JSON.stringify(this.state.isModalVisible)}</Text>
          </Button>
          <Button>
            <Text>2</Text>
          </Button>
          <Button onPress={() => this._toggleModal()}>
            <Text>記録</Text>
          </Button>
          <Button active>
            <Text>4</Text>
          </Button>
          <Button>
            <Text>5</Text>
          </Button>
        </FooterTab>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}>
          <Card>
            <CardItem>
              <Left>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('CalendarSelectScreen', {
                      reflesh: this.props.reflesh(),
                    });
                    this._toggleModal()
                  }}>
                  <Text>突行を記録</Text>
                </Button>
              </Left>
              <Right>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('CatchListScreen');
                    this._toggleModal()
                  }}>
                  <Text>突果を記録</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  light
                  onPress={() => {
                    this._toggleModal();
                  }}>
                  <Text>キャンセル</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Modal>
      </Footer>
    );
  }
}
