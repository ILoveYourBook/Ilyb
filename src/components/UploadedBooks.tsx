import firestore from '@react-native-firebase/firestore';

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Headline, List, Paragraph } from 'react-native-paper';
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

  const getDeteleButton = (bookKey: number) => {
    return isLoggedUser ? (
      <Button onPress={async () => await deleteBook(bookKey)}>
        <Paragraph style={styles.deleteButtonText}>Delete</Paragraph>
      </Button>
    ) : null;
  };

  const BookList = (books: Array<Book>) => {
    return (
      <View>
        <Headline style={styles.header}>{splittedFullname[0]}'s books</Headline>
        {books.map((book, key: number) => {
          return (
            <List.Item
              key={key}
              onPress={() => Actions.detailedInfo({ book })}
              title={book.title}
              description={book.author}
              left={() => <Avatar.Image source={{ uri: book.image }} />}
              right={() => getDeteleButton(key)}
            />
          );
        })}
      </View>
    );
  };

  return <View>{uploadedBooks ? BookList(uploadedBooks) : null}</View>;
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 20,
    marginVertical: 20,
  },
  deleteButtonText: {
    color: 'red',
  },
});

export default UploadedBooks;
