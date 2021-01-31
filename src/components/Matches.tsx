import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Headline, List } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { User } from '../types/User';
import { fetchBooksForUser } from '../requests/FetchBooksForUser';
import { fetchMatchedUsers } from '../requests/FetchMatchesForUser';

const Matches = (props: { user: any }) => {
  const { user } = props;
  const [matchedUsers, setMatchedUsers] = useState<Array<User>>();
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMatchedUsers(user);
    wait(1000).then(() => setRefreshing(false));
  }, [user]);

  useEffect(() => {
    async function fetchMatches() {
      const fetchedMatchedUsers = await fetchMatchedUsers(user);
      setMatchedUsers(fetchedMatchedUsers);
    }
    fetchMatches();
  }, [user]);

  const getAvatar = (selectedUser: User) => (
    <Avatar.Image source={{ uri: selectedUser.avatarUrl }} />
  );

  const getViewBooksButton = (key: Number, selectedUser: User) => (
    <Button
      testID={'view-books-button-' + key}
      style={styles.viewBooksBtn}
      children="View books"
      onPress={async () =>
        Actions.booksList({
          user: selectedUser,
          booksToShow: await fetchBooksForUser(selectedUser.id),
          isOwner: false,
        })
      }
    />
  );
  return (
    <View>
      <ScrollView>
        <Headline style={styles.header} children="Your matches" />
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
          {matchedUsers
            ? matchedUsers.map((selectedUser: User, key: number) => {
                return (
                  <List.Item
                    testID={'user' + key}
                    key={key}
                    title={selectedUser.fullName}
                    description={selectedUser.email}
                    left={() => getAvatar(selectedUser)}
                    right={() => getViewBooksButton(key, selectedUser)}
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
