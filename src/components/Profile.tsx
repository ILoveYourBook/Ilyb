import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Subheading, Title } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { Book } from '../types/Book';
import { User } from '../types/User';

type Props = {
  user: User;
  ownedBooks: Array<Book>;
};

const Profile = (props: Props) => {
  const { user, ownedBooks } = props;

  return (
    <View style={styles.mainColumn}>
      <View style={styles.avatarColumn}>
        <Avatar.Image
          testID="user-avatar"
          size={180}
          source={{ uri: user.avatarUrl }}
        />
      </View>
      <View style={styles.fullNameColumn}>
        <Title children={user.fullName} />
      </View>
      <View style={styles.emailColumn}>
        <Subheading children={user.email} />
      </View>
      <View style={styles.buttonsRow}>
        {ownedBooks ? (
          <Button
            icon="home"
            mode="contained"
            style={styles.button}
            onPress={() =>
              Actions.booksList({
                user,
                booksToShow: ownedBooks,
                isOwner: true,
              })
            }
            children={'Books: ' + ownedBooks.length}
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
