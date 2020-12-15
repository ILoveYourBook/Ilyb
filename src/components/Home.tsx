import firestore from '@react-native-firebase/firestore';
import { Button, Grid, Icon, Row, Text, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { User } from '../models/User';
import { BookCardSwiper } from './BookCardSwiper';
import { getDistance } from 'geolib';

export type Book = {
  title: string;
  author: string;
  image: string;
  userId: string;
  opinion: string;
  distance?: number;
};

const Home = (props: { user: User }) => {
  const { user } = props;
  const [books, setBooks] = useState<Array<Book>>();
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchBooks();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getBooks = useCallback(
    async (booksCollection: any) => {
      let booksWithDistance: Book[] = [];
      for (const bookDocument of booksCollection.docs) {
        const book = bookDocument.data() as Book;
        const bookOwnerLocation = await getBookOwnerLocation(book);
        const distance = Math.round(
          getDistance(user.lastLocation, bookOwnerLocation) / 1000,
        );
        const bookWithDistance = { ...book, distance };
        booksWithDistance.push(bookWithDistance);
      }
      return booksWithDistance;
    },
    [user],
  );

  const getBookOwnerLocation = async (book: Book) => {
    const bookOwnerDocument = await firestore()
      .collection('users')
      .doc(book.userId)
      .get();
    //console.log(book.userId);
    const bookOwnerData = bookOwnerDocument.data() as User;
    return bookOwnerData.lastLocation;
  };

  const fetchBooks = async () => {
    try {
      const booksCollection = await firestore()
        .collection('books')
        .where('userId', '!=', user.id)
        .get();
      const booksWithDistance = await getBooks(booksCollection);
      setBooks(booksWithDistance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [getBooks, user]);

  return (
    <Grid>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Row size={0.2} style={styles.instructionsRow}>
          <Button transparent>
            <Icon
              style={styles.icon}
              name="undo"
              type="MaterialCommunityIcons"
            />
            <Text style={styles.action}>Dislike</Text>
          </Button>
          <Button transparent>
            <Text style={styles.action}>Like</Text>
            <Icon
              style={styles.icon}
              name="redo"
              type="MaterialCommunityIcons"
            />
          </Button>
        </Row>
        <View style={styles.swiperContainer}>
          {books && !refreshing ? (
            <BookCardSwiper books={books} user={user} />
          ) : null}
        </View>
        {!refreshing ? (
          <Text style={styles.text}>
            Looks like you run out of books...try refreshing!
          </Text>
        ) : null}
      </ScrollView>
    </Grid>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  swiperContainer: {
    left: '10%',
  },
  instructionsRow: {
    top: '10%',
    justifyContent: 'space-evenly',
  },
  action: {
    fontSize: 20,
  },
  icon: {
    fontSize: 40,
  },
  text: {
    top: '25%',
    left: '25%',
    width: '50%',
    zIndex: -1,
    textAlign: 'center',
    fontSize: 21,
  },
});

export default Home;
