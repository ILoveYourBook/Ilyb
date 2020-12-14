import firestore from '@react-native-firebase/firestore';
import {
  Body,
  Button,
  Container,
  Content,
  H1,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { User } from '../models/User';
import { Book } from './Home';

const UploadedBooks = (props: {
  selectedUser: User;
  isLoggedUser: boolean;
}) => {
  const { selectedUser } = props;
  const { isLoggedUser } = props;
  const splittedFullname = selectedUser.fullName.split(' ');
  const [uploadedBooks, setUploadedBooks] = useState<Array<Book>>();

  const getBookDocumentId = async (key: number): Promise<string> => {
    try {
      const data = await firestore()
        .collection('books')
        .where('userId', '==', selectedUser.id)
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
        .where('userId', '==', selectedUser.id)
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
        <H1 style={styles.header}>{splittedFullname[0]}'s books</H1>
        <List>
          {books.map((book, key: number) => {
            return (
              <ListItem
                key={key}
                onPress={() => Actions.detailedInfo({ book })}
                thumbnail>
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
                  {isLoggedUser ? (
                    <Button
                      transparent
                      onPress={async () => await deleteBook(key)}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </Button>
                  ) : null}
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
