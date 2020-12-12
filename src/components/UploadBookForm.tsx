/* eslint-disable no-shadow */
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Row, Button, Text, Icon, Container, Grid} from 'native-base';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TextInput, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Book} from './Home';

const UploadBookForm = () => {
  const {control, handleSubmit} = useForm<Book>();
  const [localPath, setLocalPath] = useState<string>();

  const onSubmit = async (book: Book) => {
    try {
      const reference = storage().ref(localPath);
      await reference.putFile(localPath!);
      await firestore().collection('books').add({
        title: book.title,
        author: book.author,
        image: reference.fullPath,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={styles.container}>
      {/* {localPath ? (
        <Image source={{uri: localPath}} />
      ) : (
        <Image source={require('../assets/image-preview.png')} />
      )} */}
      <Image source={require('../assets/image-preview.png')} />
      <Grid>
        <Row size={0.3}>
          <Controller
            name="title"
            defaultValue=""
            rules={{required: true}}
            render={({onChange, value}) => (
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
            control={control}
          />
        </Row>
        <Row size={0.3}>
          <Controller
            name="author"
            defaultValue=""
            rules={{required: true}}
            control={control}
            render={({onChange, value}) => (
              <TextInput
                style={styles.input}
                placeholder="Author"
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
        </Row>
        <Row size={0.4}>
          {/* <Button
            style={styles.galleryButton}
            onPress={async () => {
              launchImageLibrary({mediaType: 'photo'}, (response) => {
                setLocalPath(response.uri);
              });
            }}>
            <Text>UPLOAD FROM GALLERY</Text>
          </Button> */}
          <Button
            style={styles.cameraButton}
            onPress={async () => {
              launchCamera(
                {mediaType: 'photo', saveToPhotos: true},
                (response) => {
                  setLocalPath(response.uri);
                },
              );
            }}>
            <Icon name="camera" type="MaterialCommunityIcons" />
          </Button>
        </Row>
        <Row size={0.6}>
          <Button
            success
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}>
            <Text>SUBMIT</Text>
          </Button>
        </Row>
      </Grid>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    width: 260,
    height: 40,
    backgroundColor: 'lightgray',
    borderRadius: 6,
    padding: 6,
    margin: 4,
    fontSize: 16,
  },
  galleryButton: {margin: 4},
  cameraButton: {backgroundColor: 'gray', margin: 4},
  submitButton: {margin: 4},
});

export default UploadBookForm;
