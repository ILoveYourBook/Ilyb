import {Button, Icon, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BookCardSwiper} from './BookCardSwiper';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const [books, setBooks] = useState<Array<any>>([]);

  useEffect(() => {
    async function getBooks() {
      const ref = await firestore().collection('books').get();
      const data = ref.docs.map((doc) => doc.data());
      setBooks(data);
    }
  });
  return (
    <>
      {/* <BookCardSwiper books={books} /> */}
      <Text>{books[0].name}</Text>
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
