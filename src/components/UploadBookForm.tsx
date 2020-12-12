/* eslint-disable no-shadow */
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, TextInput, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'uuid';
import {Book} from './Home';

const UploadBookForm = () => {
  const {control, handleSubmit} = useForm<Book>();
  const [localPath, setLocalPath] = useState<string>();

  const onSubmit = async (book: Book) => {
    const reference = storage().ref(uuid.v4());
    await reference.putFile(localPath!);
    await firestore().collection('books').add({
      title: book.title,
      author: book.author,
      image: reference.fullPath,
    });
  };

  return (
    <View>
      <Controller
        name="title"
        rules={{required: true}}
        render={({onChange, value}) => (
          <TextInput
            placeholder="Title"
            value={value}
            onChangeText={(value) => onChange(value)}
          />
        )}
        control={control}
      />
      <Controller
        name="author"
        rules={{required: true}}
        control={control}
        render={({onChange, value}) => (
          <TextInput
            placeholder="Author"
            value={value}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <Button
        title="Image"
        onPress={() => {
          launchImageLibrary({mediaType: 'photo'}, (response) => {
            setLocalPath(response.uri);
          });
        }}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default UploadBookForm;
