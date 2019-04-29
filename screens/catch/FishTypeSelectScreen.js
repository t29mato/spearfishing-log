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
  ListItem,
  Text,
  Item,
  Input,
  Card,
  CardItem,
} from 'native-base';
import { FlatList } from 'react-native';
import { CatchType } from '../../constans/Type';
import fishTypes from '../../data/master/fishTypes';

type Props = {
  navigation: Object,
};
type State = {
  keyword: string,
  fishTypes: Object,
};

export default class FishTypeSelectScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    keyword: '',
    fishTypes,
  };

  render() {
    let fishTypeId = this.props.navigation.getParam('catch').fishTypeId;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnFishTypeId(fishTypeId);
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>魚の種類を選択</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => (fishTypeId = 0)}>
              <Text>クリア</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <CardItem>
            <Item regular>
              <Input
                placeholder={'キーワードを入力すると絞り込めます'}
                onChangeText={text => {
                  let fishTypesFiltered = [];
                  fishTypes.forEach(type => {
                    if (type.hiragana.indexOf(text) > -1 || type.katakana.indexOf(text) > -1) {
                      fishTypesFiltered.push(type);
                    }
                  });
                  this.setState({ fishTypes: fishTypesFiltered });
                }}
              />
            </Item>
          </CardItem>
          <CardItem>
            <Text>
              {'絞り込み結果：' +
                this.state.fishTypes.length +
                '種類（合計' +
                fishTypes.length +
                '種類）'}
            </Text>
          </CardItem>
          <FlatList
            data={this.state.fishTypes}
            renderItem={({ item }) => (
              <ListItem
                selected={item.id === fishTypeId}
                onPress={() => {
                  fishTypeId = item.id;
                }}>
                <Left>
                  <Text>{item.katakana}</Text>
                </Left>
                <Right>
                  <Text>●</Text>
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}
