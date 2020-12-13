import firestore from '@react-native-firebase/firestore';
import {
  Body,
  Button,
  Card,
  CardItem,
  DeckSwiper,
  Icon,
  Text,
} from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { User } from '../models/User';
import { Book } from './Home';
export interface Props {
  books: Array<Book>;
  user: User;
}

export const BookCardSwiper = (props: Props) => {
  const { books, user } = props;
  let thisDeck: DeckSwiper;

  return (
    <DeckSwiper
      ref={(deck) => {
        deck ? (thisDeck = deck) : null;
      }}
      dataSource={books}
      onSwipeRight={async () => {
        const likedUserId = thisDeck._root.state.selectedItem.userId;
        await firestore()
          .collection('users')
          .doc(user.id)
          .update({
            likedUsers: firestore.FieldValue.arrayUnion(likedUserId),
          });
        const likedUser = (
          await firestore().collection('users').doc(likedUserId).get()
        ).data();
        if (likedUser && likedUser.likedUsers.includes(user.id)) {
          console.log('MATCH');
        }
      }}
      renderItem={(item: Book) => {
        return (
          <Card style={styles.card}>
            <CardItem cardBody>
              <Image style={styles.cardImg} source={{ uri: item.image }} />
            </CardItem>
            <CardItem style={styles.cardInfo}>
              <Body>
                <Text>{item.title}</Text>
                <Text>{item.author}</Text>
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
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    width: 310,
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
