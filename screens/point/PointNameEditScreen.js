// @flow

import React from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
  Form,
  Input,
  Label,
  Item,
} from 'native-base';

export default class PointNameEditScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    name: null,
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('PointCreateScreen', { name: this.state.name })
              }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ポイント名称</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Item regular>
            <Input
              onChangeText={text => this.setState({ name: text })}
              defaultValue={this.props.navigation.getParam('name')}
              maxLength={20}
            />
          </Item>
        </Content>
      </Container>
    );
  }
}
