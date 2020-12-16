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
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Grid>
        <Row size={0.1} style={styles.instructionsRow}>
          <Button style={styles.button} transparent>
            <Icon
              style={styles.icon}
              name="undo"
              type="MaterialCommunityIcons"
            />
            <Text style={styles.action}>Dislike</Text>
          </Button>
          <Button style={styles.button} transparent>
            <Text style={styles.action}>Like</Text>
            <Icon
              style={styles.icon}
              name="redo"
              type="MaterialCommunityIcons"
            />
          </Button>
        </Row>
        <Row size={1} style={{ justifyContent: 'center' }}>
          {books && !refreshing ? (
            <BookCardSwiper books={books} user={user} />
          ) : null}
        </Row>
      </Grid>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
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
  button: {
    alignSelf: 'center',
  },
});

export default Home;
