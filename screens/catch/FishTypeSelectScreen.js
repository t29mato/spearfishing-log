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
} from 'native-base';
import {FlatList} from 'react-native';
import { CatchType } from '../../constans/Type';
import fishTypes from '../../data/master/fishTypes';

type Props = {
  navigation: Object,
};
type State = {
  catch: CatchType,
  keyword: string,
  fishTypes: Object
}

export default class FishTypeSelectScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  state = {
    catch: this.props.navigation.getParam('catch'),
    keyword: '',
    fishTypes: fishTypes,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>魚の種類を選択</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Input placeholder='Regular Textbox' onChangeText={(text) => {
            let fishTypesFiltered = [];
            fishTypes.forEach(type => {
              type.name.indexOf(text) > -1 && fishTypesFiltered.push(type)
            });
            this.setState({fishTypes: fishTypesFiltered});
            }}
          />
          <FlatList
            data={this.state.fishTypes}
            renderItem={({ item }) => (
              item.name.indexOf(this.state.keyword) > -1 &&
              <ListItem>
                <Left>
                  <Text>{item.name + item.name.indexOf('ア')}</Text>
                </Left>
              </ListItem>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}
