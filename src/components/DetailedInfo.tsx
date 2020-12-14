import React from 'react';
import { Container, Text, H1, H3 } from 'native-base';
import { Image, StyleSheet } from 'react-native';

import { Book } from './Home';

const DetailedInfo = (props: { book: Book }) => {
  const { book } = props;
  return (
    <Container style={styles.container}>
      <H1 style={styles.title}>{book.title}</H1>
      <H3 style={styles.author}>{book.author}</H3>
      <Image style={styles.img} source={{ uri: book.image }} />
      <Text style={styles.opinion}>{book.opinion}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 453,
    aspectRatio: 3 / 4,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backBtn: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 5,
    borderRadius: 40,
  },
  backIcon: {
    fontSize: 40,
    color: 'grey',
  },
  title: {
    marginTop: 40,
  },
  author: {
    marginBottom: 20,
    marginTop: 10,
  },
  opinion: {
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});

export default DetailedInfo;
