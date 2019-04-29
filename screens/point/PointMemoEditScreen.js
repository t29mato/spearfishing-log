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
  Textarea,
} from 'native-base';

export default class PointMemoEditScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    memo: null,
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('PointCreateScreen', { memo: this.state.memo })
              }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ポイントのメモ</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="ポイントの特徴や見れる魚の種類を記入しましょう"
              onChangeText={text => this.setState({ memo: text })}
              defaultValue={this.props.navigation.getParam('memo')}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
