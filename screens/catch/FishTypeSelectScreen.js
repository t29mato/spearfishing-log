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
import FishSearch from './FishSearch';

type Props = {
  navigation: Object,
};
type State = {
  keyword: string,
  fish: Object,
  fishTypeId: ?number,
};

export default class FishTypeSelectScreen extends React.Component<Props, State> {
  search = new FishSearch();
  static navigationOptions = {
    header: null,
  };
  state = {
    keyword: '',
    fish: this.search.allFish(),
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
            <Button transparent onPress={() => this.setState({ fishTypeId: null })}>
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
                    this.setState({ fish: this.search.allFish() });
                    return;
                  }
                  if (this.search.isInvalidKeyword(text)) {
                    this.setState({ fish: [] });
                    return;
                  }
                  this.setState({ fish: this.search.filter(text) });
                }}
              />
            </Item>
          </CardItem>
          <CardItem>
            <Text>
              {'絞り込み結果：' +
                this.state.fish.length +
                '種類（合計' +
                this.search.allFish().length +
                '種類）'}
            </Text>
          </CardItem>
          <FlatList
            data={this.state.fish}
            extraData={this.state.fishTypeId}
            renderItem={({ item }) => (
              <ListItem
                selected={item.id === this.state.fishTypeId}
                onPress={() => {
                  this.setState({ fishTypeId: item.id });
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
