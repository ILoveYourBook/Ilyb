import { User } from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import { Button, Col, Container, Icon, Row, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { BookCardSwiper } from './BookCardSwiper';

export type Book = {
  title: string;
  author: string;
  image: string;
  userId: string;
};

type Props = {
  user: User;
};

const Home = (props: Props) => {
  const [books, setBooks] = useState<Array<Book>>();
  const user = props.user.user;

  const fetchBooks = async () => {
    try {
      const data = await firestore()
        .collection('books')
        .where('userId', '!=', user.id)
        .get();
      const arrayData = data.docs.map((document) => document.data() as Book);
      setBooks(arrayData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  });

  return (
    <Container>
      <View style={styles.cardSwiper}>
        {books ? <BookCardSwiper books={books} userId={user.id} /> : null}
      </View>
      <Row size={0.2} style={styles.row}>
        <Col size={0.5}>
          <Button style={styles.passBtn}>
            <Icon
              style={styles.passIcon}
              name="close"
              type="MaterialCommunityIcons"
            />
          </Button>
        </Col>
        <Col size={0.5}>
          <Button style={styles.likeBtn}>
            <Icon
              style={styles.likeIcon}
              name="star"
              type="MaterialCommunityIcons"
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardSwiper: {
    position: 'relative',
    flex: 0.8,
    top: 25,
    left: 25,
  },
  row: {
    alignItems: 'center',
  },
  passBtn: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'crimson',
    borderWidth: 5,
    borderRadius: 40,
  },
  passIcon: {
    fontSize: 40,
    color: 'crimson',
  },
  likeBtn: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'goldenrod',
    borderWidth: 5,
    borderRadius: 40,
  },
  likeIcon: {
    fontSize: 40,
    color: 'goldenrod',
  },
});

export default Home;
