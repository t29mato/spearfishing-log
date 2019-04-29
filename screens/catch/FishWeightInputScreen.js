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

type Props = {
  navigation: Object,
};
type State = {
  fishWeight: string,
};

export default class FishWeightInputScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    fishWeight:
      this.props.navigation.getParam('catch').fishWeight === 0
        ? ''
        : this.props.navigation.getParam('catch').fishWeight.toString(),
  };
  _insertNumber(n: number) {
    // 0kg is NP, but 00kg is NG.
    if (this.state.fishWeight === '0' && n === 0) {
      return null;
    }
    // 0.0kg is NP, but 0.00kg is NG.
    if (this.state.fishWeight.slice(-2).indexOf('.') === 0) {
      return null;
    }
    let maxNumber = 99;
    let result = this.state.fishWeight + n.toString();
    if (parseInt(result, 10) > maxNumber) {
      return null;
    }
    this.setState({ fishWeight: result });
  }
  _insertDecimal() {
    if (this.state.fishWeight.indexOf('.') > -1) {
      return null;
    }
    this.setState({ fishWeight: this.state.fishWeight + '.' });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnFishWeight(
                  parseFloat(this.state.fishWeight)
                );
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>重さを入力</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.setState({ fishWeight: '' })}>
              <Text>クリア</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <ListItem noBorder>
            <Left />
            <Body>
              <Text style={styles.fishWeight}>{this.state.fishWeight + 'kg'}</Text>
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
            <Col style={styles.col} onPress={() => this._insertDecimal()}>
              <Text style={styles.number}>.</Text>
            </Col>
            <Col style={styles.col} onPress={() => this._insertNumber(0)}>
              <Text style={styles.number}>0</Text>
            </Col>
            <Col style={styles.col} />
          </Grid>
          <ListItem noBorder>
            <Body>
              <Text>入力範囲：0.1kg 〜 99.9kg</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fishWeight: {
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
