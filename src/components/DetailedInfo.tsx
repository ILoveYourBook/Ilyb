import React from 'react';
import { Icon, View, Button } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Book } from './Home';

const onSubmit = async () => {
  Actions.pop();
};

type Props = {
  book: Book;
};

const DetailedInfo = (props: Props) => {
  const book = props.book;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: book.image }} />
      <Button style={styles.backBtn} onPress={onSubmit}>
        <Icon
          style={styles.backIcon}
          name="arrow-left-thick"
          type="MaterialCommunityIcons"
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 453,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backBtn: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 5,
    borderRadius: 40,
  },
  backIcon: {
    fontSize: 40,
    color: 'grey',
  },
});

export default DetailedInfo;
