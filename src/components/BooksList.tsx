import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Headline, List, Paragraph } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { Book } from '../types/Book';
import { User } from '../types/User';

type Props = {
  user: User;
  booksToShow: Array<Book>;
  isOwner: boolean;
};

const BooksList = (props: Props) => {
  const { user, booksToShow, isOwner } = props;
  const firstName = user.fullName.split(' ');

  const getBookDocumentId = async (key: number): Promise<string> => {
    try {
      const data = await firestore()
        .collection('books')
        .where('userId', '==', user.id)
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
    } catch (error) {
      console.log(error);
    }
  };

  const getDeleteButton = (bookKey: number) => {
    if (isOwner) {
      return (
        <Button
          testID={'delete-button-' + bookKey}
          onPress={async () => await deleteBook(bookKey)}>
          <Paragraph style={styles.deleteButtonText}>Delete</Paragraph>
        </Button>
      );
    }
  };

  return (
    <View>
      {booksToShow ? (
        <View>
          <Headline style={styles.header}>{firstName[0]}'s books</Headline>
          {booksToShow.map((book, key: number) => {
            return (
              <List.Item
                testID={'book-' + key}
                key={key}
                onPress={() => Actions.detailedInfo({ book })}
                title={book.title}
                description={book.author}
                left={() => <Avatar.Image source={{ uri: book.image }} />}
                right={() => getDeleteButton(key)}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
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

export default BooksList;
