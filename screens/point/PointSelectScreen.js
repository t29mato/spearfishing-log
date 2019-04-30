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
import { getPoints } from '../../models/PointModel';
import type { Points } from '../../models/PointModel';

// const db = SQLite.openDatabase('db');

type Props = {
  navigation: Object,
};
type State = {
  points: ?Points,
  pointId: ?number,
  pointName: ?string,
};

export default class PointSelectScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state: State = {
    points: null,
    pointId: this.props.navigation.getParam('pointId'),
    pointName: null,
  };
  componentWillMount() {
    getPoints()
      .then(points => {
        this.setState({ points });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let PointList = [];
    if (this.state.points) {
      this.state.points.forEach(point => {
        PointList.push(
          <ListItem
            key={point.id}
            onPress={() => this.setState({ pointId: point.id, pointName: point.name })}
            selected={point.id === this.state.pointId}>
            <Left>
              <Text>{point.name}</Text>
            </Left>
            <Right>
              <Icon active name={'check'} type={'FontAwesome'} />
            </Right>
          </ListItem>
        );
      });
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnPoint(
                  this.state.pointId,
                  this.state.pointName
                );
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ポイントを選択</Title>
          </Body>
          <Right>
            <Button onPress={() => this.setState({ pointId: null })} transparent>
              <Text>クリア</Text>
            </Button>
          </Right>
        </Header>
        <Text>{JSON.stringify(this.state)}</Text>
        <Content>{PointList}</Content>
      </Container>
    );
  }
}
