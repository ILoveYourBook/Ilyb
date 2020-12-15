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
import { Image, StyleSheet, ToastAndroid } from 'react-native';
import { User } from '../models/User';
import { Book } from './Home';
import { Actions } from 'react-native-router-flux';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export interface Props {
  books: Array<Book>;
  user: User;
}

export const BookCardSwiper = (props: Props) => {
  const { books, user } = props;
  let thisDeck: DeckSwiper;

  const likeProfile = async (swipedBookProfileId: string) => {
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({
        likedProfileIds: firestore.FieldValue.arrayUnion(swipedBookProfileId),
      });
  };

  const itIsAMatch = async (swipedBookProfileId: string) => {
    const userOfSwipedBook = (
      await firestore().collection('users').doc(swipedBookProfileId).get()
    ).data() as User;
    return userOfSwipedBook.likedProfileIds.includes(user.id);
  };

  const addMatchedProfile = async (swipedBookProfileId: string) => {
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({
        matchedProfileIds: firestore.FieldValue.arrayUnion(swipedBookProfileId),
      });

    await firestore()
      .collection('users')
      .doc(swipedBookProfileId)
      .update({
        matchedProfileIds: firestore.FieldValue.arrayUnion(user.id),
      });
  };

  const onSwipeRight = async () => {
    try {
      const swipedBookProfileId = thisDeck._root.state.selectedItem.userId;
      books.shift();
      await likeProfile(swipedBookProfileId);
      if (await itIsAMatch(swipedBookProfileId)) {
        addMatchedProfile(swipedBookProfileId);
        ToastAndroid.show("It's a match!", ToastAndroid.SHORT);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <DeckSwiper
      ref={(deck) => {
        deck ? (thisDeck = deck) : null;
      }}
      dataSource={books}
      onSwipeRight={onSwipeRight}
      onSwipeLeft={() => {
        books.shift();
      }}
      renderItem={(book: Book) => {
        return (
          <Card style={styles.card}>
            <CardItem cardBody>
              <Image style={styles.cardImg} source={{ uri: book.image }} />
            </CardItem>
            <CardItem style={styles.cardInfo}>
              <Body>
                <Text>{book.title}</Text>
                <Text>{book.author}</Text>
                <Text>{book.distance} km away</Text>
              </Body>
              <Button style={styles.infoBtn}>
                <Icon
                  name="info"
                  type="MaterialIcons"
                  style={styles.infoIcon}
                  onPress={() => Actions.detailedInfo({ book })}
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
    width: '80%',
    aspectRatio: 3 / 4,
  },
  cardImg: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    opacity: 0.8,
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
