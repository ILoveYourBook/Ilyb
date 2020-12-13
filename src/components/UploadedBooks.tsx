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
  H1,
} from 'native-base';
import { Alert, StyleSheet } from 'react-native';

type Props = {
  user: { id: string };
};

const UploadedBooks = (props: Props) => {
  const [uploadedBooks, setUploadedBooks] = useState<Array<Book>>();

  const getBookDocumentId = async (key: number): Promise<string> => {
    try {
      const data = await firestore()
        .collection('books')
        .where('userId', '==', props.user.id)
        .get();

      const documentId = data.docs[key].id;
      return documentId;
    } catch (error) {
      throw error;
    }
  };

  const deleteBook = async (key: number) => {
    try {
      const documentId = await getBookDocumentId(key);
      await firestore().collection('books').doc(documentId).delete();
      await fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchBooks();
  });

  const BookList = (books: Array<Book>) => {
    return (
      <Container>
        <H1 style={styles.header}>Your books</H1>
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
                  <Button
                    transparent
                    onPress={async () => await deleteBook(key)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Container>
    );
  };

  return (
    <Container>
      <Content>{uploadedBooks ? BookList(uploadedBooks) : null}</Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 20,
  },
  deleteButtonText: {
    color: 'red',
  },
});

export default UploadedBooks;
