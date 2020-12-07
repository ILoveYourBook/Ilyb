import React from 'react';
import {
  Body,
  Card,
  CardItem,
  Container,
  DeckSwiper,
  Left,
  Text,
} from 'native-base';
import {Image, StyleSheet} from 'react-native';

export interface Props {
  books: Array<any>;
}

export const BookCardSwiper: React.FunctionComponent<Props> = ({books}) => {
  return (
    <Container style={styles.container}>
      <DeckSwiper
        dataSource={books}
        renderItem={(item: any) => (
          <Card style={styles.card}>
            <CardItem cardBody>
              <Image style={styles.cardImg} source={item.image} />
            </CardItem>
            <CardItem style={styles.cardInfo}>
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
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
  },
  card: {
    elevation: 4,
    width: 300,
    height: 454,
  },
  cardImg: {
    height: 453,
    flex: 1,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    opacity: 0.9,
  },
});
