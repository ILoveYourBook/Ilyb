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
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import { launchCamera } from 'react-native-image-picker';
import { Button, Paragraph, Title } from 'react-native-paper';
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
    <ScrollView>
      <View style={styles.container}>
        <Title>Upload your book</Title>
        {localPath ? (
          <Image style={styles.imageContainer} source={{ uri: localPath }} />
        ) : (
          <Image
            style={styles.defaultImageContainer}
            source={require('../assets/books.jpg')}
          />
        )}
        {/* <Image source={require('../assets/image-preview.png')} /> */}
        <View>
          <View style={styles.titleInput}>
            <Controller
              name="title"
              defaultValue=""
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              control={control}
            />
          </View>
          <View style={styles.authorInput}>
            <Controller
              name="author"
              defaultValue=""
              rules={{ required: true }}
              control={control}
              render={({ onChange, value }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Author"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.opinionInput}>
            <Controller
              name="opinion"
              defaultValue=""
              rules={{ required: true }}
              control={control}
              render={({ onChange, value }) => (
                <TextInput
                  textAlignVertical="top"
                  multiline={true}
                  style={styles.input}
                  placeholder="Opinion"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.buttonsRow}>
            <Button
              icon="camera"
              children="Take picture"
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
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
              children="Submit"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
  },
  input: {
    width: 260,
    backgroundColor: 'lightgray',
    borderRadius: 6,
    padding: 6,
    margin: 4,
    fontSize: 16,
  },
  galleryButton: { margin: 4 },
  cameraButton: { backgroundColor: 'gray', margin: 4 },
  submitButton: { margin: 4 },
  titleInput: { flex: 0.15 },
  authorInput: { flex: 0.15 },
  opinionInput: { flex: 0.3 },
  imageContainer: {
    alignSelf: 'center',
    width: 180,
    aspectRatio: 3 / 4,
    margin: 20,
  },
  buttonsRow: {
    flex: 0.2,
    alignSelf: 'flex-end',
  },
  defaultImageContainer: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    margin: 20,
  },
});

export default UploadBookForm;
