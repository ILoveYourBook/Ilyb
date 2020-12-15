import { Button, Col, Grid, H1, Icon, Row, Text, Thumbnail } from 'native-base';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firestore from '@react-native-firebase/firestore';
import { Book } from './Home';
import { User } from '../models/User';

const Profile = (props: { user: User }) => {
  const { user } = props;
  const selectedUser = user;
  const [uploadedBooks, setUploadedBooks] = useState<Array<Book>>();

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchBooks();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const fetchBooks = async () => {
    try {
      console.log('HEY');
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
    <RefreshControl
      style={{ flex: 1 }}
      refreshing={refreshing}
      onRefresh={onRefresh}>
      <Grid style={styles.mainGrid}>
        <Row size={0.4}>
          <Thumbnail style={styles.avatar} source={{ uri: user.avatarUrl }} />
        </Row>
        <Row size={0.075}>
          <H1>{user.fullName}</H1>
        </Row>
        <Row size={0.075}>
          <Text style={styles.bio}>{user.email}</Text>
        </Row>
        <Row size={0.15}>
          <Button
            rounded
            style={styles.numberOfBooksBtn}
            onPress={() =>
              Actions.uploadedBooks({ selectedUser, isLoggedUser: true })
            }>
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
        <Row size={0.4} style={styles.logOutBtnRow}>
          <Button
            danger
            onPress={() => Actions.popTo('loading')}
            style={styles.logoutBtn}>
            <Text>Log out</Text>
          </Button>
        </Row>
      </Grid>
    </RefreshControl>
  );
};

const styles = StyleSheet.create({
  mainGrid: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: '55%',
    aspectRatio: 1 / 1,
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
