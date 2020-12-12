/* eslint-disable no-shadow */
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, Button, View} from 'react-native';
import {Book} from './Home';

const UploadBookForm = () => {
  const {control, handleSubmit} = useForm<Book>();

  const onSubmit = (book: Book) => {
    console.log(book);
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
        rules={{
          required: true,
        }}
        control={control}
        render={({onChange, value}) => (
          <TextInput
            placeholder="Author"
            value={value}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default UploadBookForm;
