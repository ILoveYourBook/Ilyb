import {Button, Icon, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {BookCardSwiper} from './BookCardSwiper';

const books = [
  {
    name: 'La Sombra del Viento',
    author: 'Carlos Ruiz Zafón',
    genres: 'Drama, Mistery',
    image: require('../assets/la-sombra.jpg'),
  },
  {
    name: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    genres: 'Fantasy, Adventure',
    image: require('../assets/fellowship.jpg'),
  },
];

const Home = () => {
  return (
    <>
      <BookCardSwiper books={books} />
      <Button style={styles.infoBtn}>
        <Icon name="info" type="MaterialIcons" style={styles.infoIcon} />
        <Text>More Information</Text>
      </Button>
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
  infoBtn: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    marginRight: 0,
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
