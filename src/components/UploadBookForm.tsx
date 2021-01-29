/* eslint-disable no-shadow */
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import { launchCamera } from 'react-native-image-picker';
import { Button, Headline, IconButton, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { v4 as uuid } from 'uuid';
import { User } from '../models/User';
import { Book } from './Home';

const UploadBookForm = (props: { user: User }) => {
  const { user } = props;

  const { control, handleSubmit } = useForm<Book>();
  const [localPath, setLocalPath] = useState<string>();

  const onSubmit = async (book: Book) => {
    try {
      const imageId = uuid();
      const reference = storage().ref(imageId);
      await reference.putFile(localPath!);
      const imageUrl = await storage()
        .ref('/' + imageId)
        .getDownloadURL();
      await firestore().collection('books').add({
        title: book.title,
        author: book.author,
        opinion: book.opinion,
        image: imageUrl,
        userId: user.id,
      });
      ToastAndroid.show(
        'Your book was uploaded successfully!',
        ToastAndroid.SHORT,
      );
      Actions.pop();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.primaryView}>
        <View style={styles.titleView}>
          <Headline children="Upload your book" />
        </View>
        <View style={styles.imgContainer}>
          {localPath ? (
            <Image style={styles.image} source={{ uri: localPath }} />
          ) : (
            <Image
              style={styles.defaultImage}
              source={require('../assets/books.jpg')}
            />
          )}
        </View>
      </View>
      <View style={styles.inputsView}>
        <Controller
          name="title"
          defaultValue=""
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={value}
              onChangeText={(value) => onChange(value)}
            />
          )}
          control={control}
        />
        <Controller
          name="author"
          defaultValue=""
          rules={{ required: true }}
          control={control}
          render={({ onChange, value }) => (
            <TextInput
              style={styles.authorInput}
              placeholder="Author"
              value={value}
              onChangeText={(value) => onChange(value)}
            />
          )}
        />
        <Controller
          name="opinion"
          defaultValue=""
          rules={{ required: true }}
          control={control}
          render={({ onChange, value }) => (
            <TextInput
              style={styles.opinionInput}
              textAlignVertical="top"
              multiline={true}
              placeholder="Opinion"
              value={value}
              onChangeText={(value) => onChange(value)}
            />
          )}
        />
        <View style={styles.buttonsRow}>
          <IconButton
            icon="camera"
            color="white"
            style={styles.cameraButton}
            onPress={async () => {
              await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
              );
              launchCamera(
                { mediaType: 'photo', saveToPhotos: true },
                (response) => {
                  setLocalPath(response.uri);
                },
              );
            }}
          />
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            children="Submit"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  primaryView: { flex: 0.5, justifyContent: 'center' },
  inputsView: {
    flex: 0.5,
    width: '80%',
    alignSelf: 'center',
  },
  galleryButton: { margin: 4 },
  cameraButton: {
    width: '20%',
    height: '60%',
    borderRadius: 5,
    margin: 8,
    marginRight: 0,
    justifyContent: 'center',
    backgroundColor: 'teal',
  },
  submitButton: { height: '60%', margin: 8, justifyContent: 'center' },
  titleInput: {
    flex: 0.15,
    margin: 8,
    marginVertical: 4,
    justifyContent: 'center',
  },
  authorInput: {
    flex: 0.15,
    margin: 8,
    marginVertical: 4,
    justifyContent: 'center',
  },
  opinionInput: { flex: 0.5, marginVertical: 4, margin: 8 },
  buttonsRow: {
    flexDirection: 'row',
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  image: {
    height: '90%',
    aspectRatio: 3 / 4,
  },
  defaultImage: {
    height: '90%',
    aspectRatio: 1 / 1,
  },
  titleView: {
    flex: 0.2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imgContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default UploadBookForm;
