import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { User } from '../models/User';
import firestore from '@react-native-firebase/firestore';
import { Avatar, Button, List, Title } from 'react-native-paper';

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

  const getAvatar = (selectedUser: User) => (
    <Avatar.Image source={{ uri: selectedUser.avatarUrl }} />
  );

  const getViewBooksButton = (selectedUser: User) => (
    <Button
      style={styles.viewBooksBtn}
      children="View books"
      onPress={async () =>
        Actions.uploadedBooks({
          selectedUser,
          isLoggedUser: false,
        })
      }
    />
  );
  return (
    <View>
      <ScrollView>
        <Title style={styles.header} children="Your matches" />
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
          {matchedUsers
            ? matchedUsers.map((selectedUser: User, key: number) => {
                return (
                  <List.Item
                    key={key}
                    title={selectedUser.fullName}
                    description={selectedUser.email}
                    left={() => getAvatar(selectedUser)}
                    right={() => getViewBooksButton(selectedUser)}
                  />
                );
              })
            : null}
        </RefreshControl>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 20,
    marginVertical: 20,
  },
  viewBooksBtn: { justifyContent: 'center' },
});
export default Matches;
