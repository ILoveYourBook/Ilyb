import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { User } from '../models/User';
import { Book } from './Home';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-deck-swiper';
import {
  Card,
  Headline,
  IconButton,
  Paragraph,
  Title,
} from 'react-native-paper';

export interface Props {
  books: Array<Book>;
  user: User;
}

export const BookCardSwiper = (props: Props) => {
  const { books, user } = props;
  const [swipedAll, setSwipedAll] = useState(false);
  let thisDeck: Swiper<Book>;

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

  const swipedRight = async () => {
    try {
      const swipedBookProfileId = books[thisDeck.state.firstCardIndex].userId;
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
    <>
      {swipedAll === true ? (
        <Headline
          style={styles.outOfBooksText}
          children="Oops, it looks like you run out of books...try refreshing!"
        />
      ) : (
        <Swiper
          verticalSwipe={false}
          backgroundColor="transparent"
          ref={(swiper) => {
            swiper ? (thisDeck = swiper) : null;
          }}
          cards={books}
          renderCard={(book) => {
            return (
              <Card style={styles.card}>
                <Card.Cover style={styles.cover} source={{ uri: book.image }} />
                <Card.Content style={styles.content}>
                  <View style={styles.bookInfo}>
                    <Title numberOfLines={1} children={book.title} />
                    <Paragraph>{book.author}</Paragraph>
                    <Paragraph>{book.distance} km away</Paragraph>
                  </View>
                  <Card.Actions style={styles.actions}>
                    <IconButton
                      icon="information-outline"
                      size={40}
                      onPress={() => Actions.detailedInfo({ book })}
                    />
                  </Card.Actions>
                </Card.Content>
              </Card>
            );
          }}
          onSwipedRight={swipedRight}
          onSwipedAll={() => setSwipedAll(true)}
          cardIndex={0}
          stackSize={3}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0.8,
  },
  cover: {
    flex: 0.8,
  },
  content: {
    flexDirection: 'row',
    flex: 0.2,
  },
  bookInfo: {
    flexDirection: 'column',
    flex: 0.8,
    justifyContent: 'center',
  },
  actions: { flex: 0.2, justifyContent: 'center' },
  outOfBooksText: {
    textAlign: 'center',
  },
});
