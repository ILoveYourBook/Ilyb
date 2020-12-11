import React from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  DeckSwiper,
  Icon,
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
              <Image style={styles.cardImg} source={item.images} />
            </CardItem>
            <CardItem style={styles.cardInfo}>
              <Body>
                <Text>{item.name}</Text>
                <Text>{item.author}</Text>
                <Text note>{item.genres}</Text>
              </Body>
              <Button style={styles.infoBtn}>
                <Icon
                  name="info"
                  type="MaterialIcons"
                  style={styles.infoIcon}
                />
              </Button>
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
  infoBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  infoIcon: {
    fontSize: 30,
    marginLeft: 0,
    marginRight: 0,
  },
});
