import firestore from '@react-native-firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, ScrollView, View } from 'react-native';
import { User } from '../models/User';
import { BookCardSwiper } from './BookCardSwiper';
import { getDistance } from 'geolib';
import { Button, Paragraph } from 'react-native-paper';

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
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(async () => {
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
      <View style={styles.instructionsRow}>
        <Button
          mode="contained"
          icon="undo"
          style={styles.button}
          children="Dislike"
        />
        <Button
          mode="contained"
          icon="redo"
          style={styles.button}
          children="Like"
        />
      </View>
      <View style={styles.swiper}>
        {books && !refreshing ? (
          <BookCardSwiper books={books} user={user} />
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  instructionsRow: {
    flexDirection: 'row',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '45%',
    height: '40%',
    justifyContent: 'center',
  },
  swiper: {
    flex: 0.8,
    top: '-10%',
    alignContent: 'center',
  },
});

export default Home;
