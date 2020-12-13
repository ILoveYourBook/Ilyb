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
import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { User } from '../models/User';

const Matches = (props: { user: any }) => {
  const { user } = props;

  return (
    <Container>
      <H1 style={styles.header}>Your matches</H1>
      <List>
        {user.matchedProfiles.map((selectedUser: User, key: number) => {
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
                    Actions.uploadedBooks({ selectedUser, isLoggedUser: false })
                  }>
                  <Text>View books</Text>
                </Button>
              </Right>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 20,
  },
});
export default Matches;
