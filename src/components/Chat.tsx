import { Body, Container, Content, Left, List, ListItem, Right, Text, Thumbnail } from 'native-base';
import React from 'react';
import {
  Alert,
  StyleSheet,
} from 'react-native';

const Chat = () => {
  const chats = [{
      name: "Fran",
      text: "blabla",
      hour: "3.42 pm",
      thumbnailUrl: "https://pbs.twimg.com/profile_images/1329693893449887745/Pkgo-3x2_400x400.jpg"},
    {
      name: "Pepe",
      text: "blabla",
      hour: "3.42 pm",
      thumbnailUrl: "https://pbs.twimg.com/profile_images/1006136555575107584/_aIKGQoA_400x400.jpg"},
    {
      name: "Jose",
      text: "blabla",
      hour: "3.42 pm",
      thumbnailUrl: "https://pbs.twimg.com/profile_images/1300453975934857217/udHWGbzn_400x400.jpg"},
    {
      name: "Pablo",
      text: "blabla",
      hour: "3.42 pm",
      thumbnailUrl: "https://pbs.twimg.com/profile_images/1125307324636307456/k676KXpI_400x400.jpg"},
  ]
  
  return (
	  <>
      <Container>
        <Content>
          <List>
            {chats.map((item, key) => {
              return (
              <ListItem onPress={() => Alert.alert("Haz la otra pantalla, crack")} avatar key={key}>
                <Left>
                  <Thumbnail style={{marginBottom: 10}} source={{ uri: item.thumbnailUrl }} />
                </Left>
                <Body>
                  <Text>{item.name}</Text>
                  <Text note>{item.text}</Text>
                </Body>
              </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
	  </>
  );
};

export default Chat;

     