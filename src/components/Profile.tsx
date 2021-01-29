import firestore from '@react-native-firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Subheading, Title } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { User } from '../models/User';
import { Book } from './Home';

const Profile = (props: { user: User }) => {
  const { user } = props;
  const selectedUser = user;
  const [uploadedBooks, setUploadedBooks] = useState<Array<Book>>();

  const fetchBooks = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <View style={styles.mainColumn}>
      <View style={styles.avatarColumn}>
        <Avatar.Image size={180} source={{ uri: user.avatarUrl }} />
      </View>
      <View style={styles.fullNameColumn}>
        <Title children={user.fullName} />
      </View>
      <View style={styles.emailColumn}>
        <Subheading children={user.email} />
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
