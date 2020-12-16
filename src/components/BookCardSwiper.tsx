import firestore from '@react-native-firebase/firestore';
import { Body, Button, Card, CardItem, H1, Icon, Text } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet, ToastAndroid } from 'react-native';
import { User } from '../models/User';
import { Book } from './Home';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-deck-swiper';

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
        <H1 style={styles.offBooksText}>
          Oops, it looks like you run out off books...try refreshing!
        </H1>
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
              <Card>
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
  offBooksText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});
