import { Button, Col, Grid, H1, Icon, Row, Text, Thumbnail } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firestore from '@react-native-firebase/firestore';
import { Book } from './Home';
import { User } from '../models/User';

const Profile = (props: { user: User }) => {
  const { user } = props;

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
  });

  return (
    <Grid style={styles.mainGrid}>
      <Row size={0.75}>
        <Col style={styles.profileInfo}>
          <Thumbnail style={styles.avatar} source={{ uri: user.avatarUrl }} />
          <H1>{user.fullName}</H1>
          <Text style={styles.bio}>{user.email}</Text>
          <Row>
            <Button
              rounded
              style={styles.numberOfBooksBtn}
              onPress={() => Actions.uploadedBooks({ user })}>
              <Icon
                name="menu-book"
                type="MaterialIcons"
                style={styles.bookIcon}
              />
              <Text>Books: {uploadedBooks?.length}</Text>
            </Button>

            <Button
              success
              style={styles.addBookBtn}
              onPress={() => Actions.uploadBook({ user })}>
              <Icon name="add" type="MaterialIcons" style={styles.addIcon} />
            </Button>
          </Row>
        </Col>
      </Row>
      <Row size={0.25} style={styles.logOutBtnRow}>
        <Button
          danger
          onPress={() => Actions.popTo('loading')}
          style={styles.logoutBtn}>
          <Text>Log out</Text>
        </Button>
      </Row>
    </Grid>
  );
};

const styles = StyleSheet.create({
  mainGrid: {
    padding: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  bio: {
    textAlign: 'center',
    fontSize: 20,
  },
  numberOfBooksBtn: {
    alignSelf: 'center',
    margin: 5,
  },
  bookIcon: {
    marginRight: 0,
    marginLeft: 22,
  },
  addBookBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 40,
    width: 40,
  },
  addIcon: {
    marginLeft: 0,
    marginRight: 0,
  },
  logOutBtnRow: {
    alignSelf: 'center',
  },
  logoutBtn: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: 320,
  },
});

export default Profile;
