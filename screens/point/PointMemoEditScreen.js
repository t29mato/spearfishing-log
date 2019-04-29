// @flow

import React from 'react';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
  Form,
  Textarea,
} from 'native-base';

export default class PointMemoEditScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    point: this.props.navigation.getParam('point'),
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnMemo(this.state.point.memo);
                this.props.navigation.pop();
              }}>
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
              onChangeText={text => this.setState({ point: { memo: text } })}
              defaultValue={this.state.point.memo}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
