import firestore from '@react-native-firebase/firestore';
import { Button, Icon, Row, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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

  useEffect(() => {
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
    fetchBooks();
  }, [user]);

  const getBooks = async (booksCollection: any) => {
    let books: Book[] = [];
    for (const bookDocument of booksCollection.docs) {
      const book = bookDocument.data() as Book;
      const bookOwnerLocation = await getBookOwnerLocation(book);
      const distance = Math.round(getDistance(user.lastLocation, bookOwnerLocation) / 1000);
      const bookWithDistance = { ...book, distance };
      books.push(bookWithDistance);
    }
    return books;
  };

  const getBookOwnerLocation = async (book: Book) => {
    const bookOwnerDocument = await firestore().collection('users').doc(book.userId).get();
    const bookOwnerData = bookOwnerDocument.data() as User;
    return bookOwnerData.lastLocation;
  };

  return (
    <>
      <View style={styles.cardSwiper}>
        {books ? <BookCardSwiper books={books} user={user} /> : null}
      </View>
      <Row style={styles.instructionsRow}>
        <Button transparent>
          <Icon style={styles.icon} name="undo" type="MaterialCommunityIcons" />
          <Text style={styles.action}>Dislike</Text>
        </Button>
        <Button transparent>
          <Text style={styles.action}>Like</Text>
          <Icon style={styles.icon} name="redo" type="MaterialCommunityIcons" />
        </Button>
      </Row>
    </>
  );
};

const styles = StyleSheet.create({
  cardSwiper: {
    top: '15%',
    left: '6%',
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
});

export default Home;
