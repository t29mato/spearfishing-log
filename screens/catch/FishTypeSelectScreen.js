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

  /******************************
   * Main render method
   ******************************/

  render() {
    return (
      <Container>
        {this._header()}
        <Content>
          <CardItem>{this._searchInput()}</CardItem>
          <CardItem>{this._searchInfo()}</CardItem>
          {this._fishList()}
        </Content>
      </Container>
    );
  }

  /******************************
   * Sub render methods
   ******************************/

  _fishItem = ({ item }) => {
    return (
      <ListItem
        selected={item.id === this.state.fishTypeId}
        onPress={() => {
          this.setState({ fishTypeId: item.id });
        }}>
        <Left>
          <Text>{item.katakana}</Text>
        </Left>
        <Right>
          <Icon name="md-checkmark-circle" />
        </Right>
      </ListItem>
    );
  };

  _fishList = () => (
    <FlatList
      data={this.state.fish}
      extraData={this.state.fishTypeId}
      renderItem={this._fishItem}
      keyExtractor={item => item.id.toString()}
      initialNumToRender={50}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={50}
      windowSize={100}
    />
  );

  _searchInfo = () => (
    <Text>
      {'絞り込み結果：' +
        this.state.fish.length +
        '種類（合計' +
        this.search.allFish().length +
        '種類）'}
    </Text>
  );

  _searchInput = () => (
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
  );

  _header = () => (
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
      <Right>{this._clear()}</Right>
    </Header>
  );

  _clear = () => (
    <Button transparent onPress={() => this.setState({ fishTypeId: null })}>
      <Text>クリア</Text>
    </Button>
  );
}
