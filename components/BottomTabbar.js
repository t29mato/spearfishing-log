// @flow

import React from 'react';
import { Text, Footer, FooterTab, Button, Card, CardItem, Body, Left, Right } from 'native-base';
import Modal from 'react-native-modal';

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
          <Button
            active={this.props.navigation.state.routeName === 'ReportListScreen'}
            onPress={() => this.props.navigation.navigate('ReportListScreen')}>
            <Text>突行一覧</Text>
          </Button>
          <Button onPress={() => this._toggleModal()}>
            <Text>記録</Text>
          </Button>
          <Button
            active={this.props.navigation.state.routeName === 'SettingsScreenLisbt'}
            onPress={() => this.props.navigation.navigate('SettingsScreenList')}>
            <Text>設定</Text>
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
                      refresh: this.props.refresh(),
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
