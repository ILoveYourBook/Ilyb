import {
  Body,
  Card,
  CardItem,
  Container,
  DeckSwiper,
  Left,
  Text,
} from 'native-base';
import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
const books = [
  {
    name: 'La Sombra del Viento',
    author: 'Carlos Ruiz Zafón',
    genres: 'Drama, Mistery',
    image: require('../assets/la-sombra.jpg'),
  },
  {
    name: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    genres: 'Fantasy, Adventure',
    image: require('../assets/fellowship.jpg'),
  },
];
export default class BookCardSwiper extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <DeckSwiper
          dataSource={books}
          renderItem={(item: any) => (
            <Card style={{elevation: 3, width: 300, height: 453}}>
              <CardItem cardBody>
                <Image style={{height: 453, flex: 1}} source={item.image} />
              </CardItem>
              <CardItem style={{position: 'absolute', bottom: 0, opacity: 0.9}}>
                <Left>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text>{item.author}</Text>
                    <Text note>{item.genres}</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
  },
});
