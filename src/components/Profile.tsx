import {
  Button,
  Title,
  Text,
  IconButton,
  Avatar,
  Subheading,
} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firestore from '@react-native-firebase/firestore';
import { Book } from './Home';
import { User } from '../models/User';

const Profile = (props: { user: User }) => {
  const { user } = props;
  const selectedUser = user;
  const [uploadedBooks, setUploadedBooks] = useState<Array<Book>>();

  const fetchBooks = async () => {
    try {
      const data = await firestore()
        .collection('books')
        .where('userId', '==', user.id)
        .get();
      const arrayData = data.docs.map((document) => document.data() as Book);
      setUploadedBooks(arrayData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  return (
    <View style={styles.mainColumn}>
      <View style={styles.avatarColumn}>
        <Avatar.Image size={180} source={{ uri: user.avatarUrl }} />
      </View>
      <View style={styles.fullNameColumn}>
        <Title>{user.fullName}</Title>
      </View>
      <View style={styles.emailColumn}>
        <Subheading>{user.email}</Subheading>
      </View>
      <View style={styles.buttonsRow}>
        {uploadedBooks ? (
          <Button
            icon="home"
            mode="contained"
            style={styles.button}
            onPress={() =>
              Actions.uploadedBooks({ selectedUser, isLoggedUser: true })
            }
            children={'Books: ' + uploadedBooks?.length}
          />
        ) : null}

        <Button
          color="teal"
          icon="plus"
          mode="contained"
          style={styles.button}
          onPress={() => Actions.uploadBook({ user })}
          children="Upload book"
        />
      </View>
      <View style={styles.logOutBtnColumn}>
        <Button
          mode="contained"
          color="red"
          style={styles.logoutBtn}
          children="Log out"
          onPress={() => Actions.popTo('loading')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainColumn: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  avatarColumn: {
    flex: 0.4,
    justifyContent: 'center',
  },
  fullNameColumn: {
    flex: 0.075,
  },
  emailColumn: {
    flex: 0.075,
  },
  buttonsRow: {
    flexDirection: 'row',
    flex: 0.1,
  },
  logOutBtnColumn: {
    flex: 0.35,
    justifyContent: 'flex-end',
  },
  button: {
    height: '50%',
    justifyContent: 'center',
    margin: 4,
  },
  profileInfo: {
    alignItems: 'center',
  },
  numberOfBooksBtn: {},
  bookIcon: {},
  addBookBtn: {},
  addIcon: {},
  logoutBtn: {
    width: 320,
  },
});

export default Profile;
