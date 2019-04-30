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
import { getWeathers } from '../../models/WeatherModel';

type Props = {
  navigation: Object,
};
type State = {
  weatherId: ?number,
  weatherName: ?string,
};

export default class WeatherSelectScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    weatherId: this.props.navigation.getParam('weatherId'),
    weatherName: null,
  };
  render() {
    let WeatherList = [];

    getWeathers().forEach(item => {
      WeatherList.push(
        <ListItem
          key={item.id}
          onPress={() => this.setState({ weatherId: item.id, weatherName: item.name })}
          selected={item.id === this.state.weatherId}>
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
                this.props.navigation.state.params.returnWeatherId(this.state.weatherId);
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ポイントを選択</Title>
          </Body>
          <Right>
            <Button onPress={() => this.setState({ weatherId: null })} transparent>
              <Text>クリア</Text>
            </Button>
          </Right>
        </Header>
        <Content>{WeatherList}</Content>
      </Container>
    );
  }
}
