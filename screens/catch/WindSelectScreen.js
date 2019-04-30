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
  ListItem,
  Text,
} from 'native-base';
import { getWinds } from '../../models/WindModel';

type Props = {
  navigation: Object,
};
type State = {
  windId: ?number,
  windName: ?string,
};

export default class WindSelectScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    windId: this.props.navigation.getParam('windId'),
    windName: null,
  };
  render() {
    let WindList = [];

    getWinds().forEach(item => {
      WindList.push(
        <ListItem
          key={item.id}
          onPress={() => this.setState({ windId: item.id, windName: item.name })}
          selected={item.id === this.state.windId}>
          <Left>
            <Text>{item.name}</Text>
          </Left>
          <Right>
            <Icon active name={'check'} type={'FontAwesome'} />
          </Right>
        </ListItem>
      );
    });

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnWindId(this.state.windId);
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>風の強さを選択</Title>
          </Body>
          <Right>
            <Button onPress={() => this.setState({ windId: null })} transparent>
              <Text>クリア</Text>
            </Button>
          </Right>
        </Header>
        <Content>{WindList}</Content>
      </Container>
    );
  }
}
