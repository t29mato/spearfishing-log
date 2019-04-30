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
  Item,
  Input,
  CardItem,
} from 'native-base';
import { FlatList } from 'react-native';
import fishTypes from '../../data/master/fishTypes';

type Props = {
  navigation: Object,
};
type State = {
  keyword: string,
  fishTypes: Object,
  fishDictionary: Object,
  fishTypeId: integer,
};

function _createFishDictionary() {
  let dictionary = [];
  for (let i = 0; i < fishTypes.length; i++) {
    let fish = fishTypes[i];
    let found = false;
    dictionary.forEach(d => {
      if (d.index === fish.katakana[0]) {
        found = true;
        d.fishes.push(fish);
      }
    });
    if (!found) {
      dictionary.push({ index: fish.katakana[0], fishes: [fish] });
    }
  }
  return dictionary;
}

function _convertToKatakana(text) {
  return text.replace(/[\u3041-\u3096]/g, function(match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

function _indexFilteredFish(dictionary, index) {
  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].index === index) {
      return dictionary[i];
    }
  }
  return [];
}

function _filterFish(dictionary, text) {
  let fishTypesFiltered = [];
  const kana = _convertToKatakana(text);
  const filteredFish = _indexFilteredFish(dictionary, kana[0]);
  filteredFish.fishes.forEach(fish => {
    if (fish.katakana.indexOf(kana) > -1) {
      fishTypesFiltered.push(fish);
    }
  });
  return fishTypesFiltered;
}

export default class FishTypeSelectScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    keyword: '',
    fishTypes,
    fishDictionary: _createFishDictionary(),
    fishTypeId: this.props.navigation.getParam('catch').fishTypeId,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.state.params.returnFishTypeId(this.state.fishTypeId);
                this.props.navigation.pop();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>魚の種類を選択</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => (this.state.fishTypeId = 0)}>
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
                  if (!text) {
                    this.setState({ fishTypes });
                    return;
                  }
                  if (text.match(/[^ぁ-んァ-ヶー\s]/)) {
                    this.setState({ fishTypes: [] });
                    return;
                  }
                  this.setState({ fishTypes: _filterFish(this.state.fishDictionary, text) });
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
            extraData={this.state}
            renderItem={({ item }) => (
              <ListItem
                selected={item.id === this.state.fishTypeId}
                onPress={() => {
                  this.state.fishTypeId = item.id;
                  console.log(this.state.fishTypeId);
                }}>
                <Left>
                  <Text>{item.katakana + ' itemId => ' + item.id + '| fishTypeId => ' + this.state.fishTypeId}</Text>
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
