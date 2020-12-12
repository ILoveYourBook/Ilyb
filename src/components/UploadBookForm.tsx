/* eslint-disable no-shadow */
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Row, Button, Text, Icon, Container, Grid, H1} from 'native-base';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TextInput, Image, PermissionsAndroid} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
import {Book} from './Home';

const UploadBookForm = () => {
  const {control, handleSubmit} = useForm<Book>();
  const [localPath, setLocalPath] = useState<string>();

  const onSubmit = async (book: Book) => {
    try {
      const imgName = 'userId' + book.title + book.author;
      const reference = storage().ref(imgName);
      await reference.putFile(localPath!);
      const imageUrl = await storage()
        .ref('/' + imgName)
        .getDownloadURL();
      await firestore().collection('books').add({
        title: book.title,
        author: book.author,
        image: imageUrl,
      });
      Actions.pop();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={styles.container}>
      <H1>Upload your book</H1>
      {localPath ? (
        <Image style={styles.imgContainer} source={{uri: localPath}} />
      ) : (
        <Image
          style={styles.imgContainer}
          source={require('../assets/books.jpg')}
        />
      )}
      {/* <Image source={require('../assets/image-preview.png')} /> */}
      <Grid>
        <Row size={0.2}>
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
        <Row size={0.2}>
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
        <Row style={styles.buttonsRow} size={0.6}>
          <Button
            style={styles.cameraButton}
            onPress={async () => {
              await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
              );
              launchCamera(
                {mediaType: 'photo', saveToPhotos: true},
                (response) => {
                  setLocalPath(response.uri);
                  console.log(localPath);
                },
              );
            }}>
            <Icon name="camera" type="MaterialCommunityIcons" />
          </Button>
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
    marginTop: 50,
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
  imgContainer: {
    alignSelf: 'center',
    width: 140,
    height: 300,
    margin: 20,
  },
  buttonsRow: {
    alignSelf: 'flex-end',
  },
});

export default UploadBookForm;
