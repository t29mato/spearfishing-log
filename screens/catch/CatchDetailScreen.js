// @flow

import React from 'react';
import {
  Container,
  Content,
  ListItem,
  Text,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';

export default class CatchDetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    point: this.props.navigation.getParam('point'),
  };

  returnPoint(point) {
    this.setState({
      point: Object.assign(this.state.point, { point }),
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.point.name}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('PointEditScreen', {
                  point: this.state.point,
                  returnPoint: this.returnPoint.bind(this),
                  refresh: this.props.navigation.state.params.refresh,
                });
              }}>
              <Text>編集</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <ListItem itemDivider>
            <Text>名称</Text>
          </ListItem>
          <ListItem last>
            <Body>
              <Text>{this.state.point.name}</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text>メモ</Text>
          </ListItem>
          <ListItem last>
            <Body>
              <Text>{this.state.point.memo}</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
