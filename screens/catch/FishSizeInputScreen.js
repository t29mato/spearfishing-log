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
  Grid,
  Col,
} from 'native-base';
import { StyleSheet } from 'react-native';
import fishTypes from '../../data/master/fishTypes';

type Props = {
  navigation: Object,
};
type State = {
  fishSize: number,
};

export default class FishSizeInputScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    fishSize: this.props.navigation.getParam('catch').fishSize,
  };
  _insertNumber(n: number) {
    let maxNumber = 300;
    let result = parseInt(this.state.fishSize.toString() + n.toString(), 10);
    if (result > maxNumber) {
      return null;
    }
    this.setState({ fishSize: result });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnFishSize(this.state.fishSize);
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>サイズを入力</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.setState({ fishSize: 0 })}>
              <Text>クリア</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <ListItem last>
            <Left />
            <Body>
              <Text style={styles.fishSize}>{this.state.fishSize + 'cm'}</Text>
            </Body>
          </ListItem>
          <Grid>
            <Col style={styles.col} onPress={() => this._insertNumber(1)}>
              <Text style={styles.number}>1</Text>
            </Col>
            <Col style={styles.col} onPress={() => this._insertNumber(2)}>
              <Text style={styles.number}>2</Text>
            </Col>
            <Col style={styles.col} onPress={() => this._insertNumber(3)}>
              <Text style={styles.number}>3</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.col} onPress={() => this._insertNumber(4)}>
              <Text style={styles.number}>4</Text>
            </Col>
            <Col style={styles.col} onPress={() => this._insertNumber(5)}>
              <Text style={styles.number}>5</Text>
            </Col>
            <Col style={styles.col} onPress={() => this._insertNumber(6)}>
              <Text style={styles.number}>6</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.col} onPress={() => this._insertNumber(7)}>
              <Text style={styles.number}>7</Text>
            </Col>
            <Col style={styles.col} onPress={() => this._insertNumber(8)}>
              <Text style={styles.number}>8</Text>
            </Col>
            <Col style={styles.col} onPress={() => this._insertNumber(9)}>
              <Text style={styles.number}>9</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.col} onPress={() => this._insertNumber(0)}>
              <Text style={styles.number}>0</Text>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fishSize: {
    fontSize: 40,
  },
  col: {
    backgroundColor: '#ccc',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  number: {
    fontSize: 30,
    fontWeight: '500',
  },
});
