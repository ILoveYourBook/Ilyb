import {
  Body,
  Button,
  Right,
  Container,
  Left,
  List,
  ListItem,
  Text,
  Thumbnail,
  H1,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { User } from '../models/User';
import firestore from '@react-native-firebase/firestore';

const Matches = (props: { user: any }) => {
  const { user } = props;

  const [matchedUsers, setMatchedUsers] = useState<Array<User>>();

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        const data = await firestore()
          .collection('users')
          .where('id', 'in', user.matchedProfiles)
          .get();
        const arrayData = data.docs.map((document) => document.data() as User);
        setMatchedUsers(arrayData);
      } catch (error) {
        throw error;
      }
    };
    fetchMatchedUsers();
  }, [user]);

  return (
    <Container>
      <H1 style={styles.header}>Your matches</H1>
      {matchedUsers ? (
        <List>
          {matchedUsers.map((selectedUser: User, key: number) => {
            return (
              <ListItem key={key} thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: selectedUser.avatarUrl }} />
                </Left>
                <Body>
                  <Text numberOfLines={1}>{selectedUser.fullName}</Text>
                  <Text note numberOfLines={1}>
                    {selectedUser.email}
                  </Text>
                </Body>
                <Right>
                  <Button
                    transparent
                    onPress={async () =>
                      Actions.uploadedBooks({
                        selectedUser,
                        isLoggedUser: false,
                      })
                    }>
                    <Text>View books</Text>
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 20,
  },
});
export default Matches;
