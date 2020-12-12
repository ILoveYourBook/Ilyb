import {User} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import {Button, Icon, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BookCardSwiper} from './BookCardSwiper';

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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await firestore().collection('books').get();
        const arrayData = data.docs.map((document) => document.data() as Book);
        setBooks(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      {books ? <BookCardSwiper books={books} userId={user.id} /> : null}
      <View style={styles.mainView}>
        <Button style={styles.passBtn}>
          <Icon style={styles.passIcon} name="clear" type="MaterialIcons" />
        </Button>
        <Button style={styles.likeBtn}>
          <Icon style={styles.likeIcon} name="favorite" type="MaterialIcons" />
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  passBtn: {
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 0,
    flex: 0.5,
  },
  passIcon: {
    fontSize: 40,
  },
  likeBtn: {
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 0,
    flex: 0.5,
  },
  likeIcon: {
    fontSize: 40,
  },
});

export default Home;
