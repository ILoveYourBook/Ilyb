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
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { User } from '../models/User';
import firestore from '@react-native-firebase/firestore';

const Matches = (props: { user: any }) => {
  const { user } = props;

  const [matchedUsers, setMatchedUsers] = useState<Array<User>>();

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchMatchedUsers();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const fetchMatchedUsers = async () => {
    try {
      const data = await firestore()
        .collection('users')
        .where('id', 'in', user.matchedProfileIds)
        .get();
      const arrayData = data.docs.map((document) => document.data() as User);
      setMatchedUsers(arrayData);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchMatchedUsers();
  }, [user]);

  return (
    <Container>
      <ScrollView>
        <H1 style={styles.header}>Your matches</H1>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
          {matchedUsers ? (
            <List>
              {matchedUsers.map((selectedUser: User, key: number) => {
                return (
                  <ListItem key={key} thumbnail>
                    <Left>
                      <Thumbnail
                        square
                        source={{ uri: selectedUser.avatarUrl }}
                      />
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
        </RefreshControl>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 20,
  },
});
export default Matches;
