import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Book } from './Home';
import {
  Body,
  Button,
  Container,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import { Alert, StyleSheet } from 'react-native';

type Props = {
  user: { id: string };
};

const UploadedBooks = (props: Props) => {
  const [uploadedBooks, setUploadedBooks] = useState<Array<Book>>();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await firestore()
          .collection('books')
          .where('userId', '==', props.user.id)
          .get();
        const arrayData = data.docs.map((document) => document.data() as Book);
        setUploadedBooks(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  });

  const BookList = (books: Array<Book>) => {
    return (
      <List>
        {books.map((book, key: number) => {
          return (
            <ListItem key={key} onPress={() => Alert.alert('TBD')} thumbnail>
              <Left>
                <Thumbnail square source={{ uri: book.image }} />
              </Left>
              <Body>
                <Text numberOfLines={1}>{book.title}</Text>
                <Text note numberOfLines={1}>
                  {book.author}
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Button>
              </Right>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Container>
      <Content>{uploadedBooks ? BookList(uploadedBooks) : null}</Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  deleteButtonText: {
    color: 'red',
  },
});

export default UploadedBooks;
