import {Button, Col, Grid, H1, Icon, Row, Text, Thumbnail} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

type Props = {
  user: User;
};

const Profile = (props: Props) => {
  const user = props.user.user;
  const numberOfBooks = 21;
  const userBiography =
    'This is my biography, where I should tell the people I match which are my interests in books.';

  return (
    <Grid style={styles.mainGrid}>
      <Row size={0.75}>
        <Col style={styles.profileInfo}>
          <Thumbnail
            style={styles.avatar}
            source={require('../assets/avatar.png')}
          />
          <H1>Francis Molina</H1>
          <Text style={styles.bio}>{userBiography}</Text>
          <Row>
            <Button rounded style={styles.numberOfBooksBtn}>
              <Icon
                name="menu-book"
                type="MaterialIcons"
                style={styles.bookIcon}
              />
              <Text>Books: {numberOfBooks}</Text>
            </Button>

            <Button success style={styles.addBookBtn}>
              <Icon name="add" type="MaterialIcons" style={styles.addIcon} />
            </Button>
          </Row>
        </Col>
      </Row>
      <Row size={0.25} style={styles.logOutBtnRow}>
        <Button danger style={styles.logoutBtn}>
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
