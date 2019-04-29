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
  Input,
  Item,
} from 'native-base';

export default class PointNameEditScreen extends React.Component {
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
                this.props.navigation.state.params.returnName(this.state.point.name);
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ポイント名称</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item regular>
            <Input
              onChangeText={text => this.setState({ point: { name: text } })}
              defaultValue={this.state.point.name}
              maxLength={20}
            />
          </Item>
        </Content>
      </Container>
    );
  }
}
