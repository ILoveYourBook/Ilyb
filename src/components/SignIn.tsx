import {
  GoogleSignin,
  GoogleSigninButton,
  User as SignedInUser,
} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { User } from '../models/User';

const SignIn = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    user ? Actions.nav({ user }) : null;
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      return await GoogleSignin.signIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserCreation = async (signedInUser: SignedInUser) => {
    const { id, email, name: fullName, photo: avatarUrl } = signedInUser.user;
    let currentUser: User;
    (await existsUserWithId(id))
      ? (currentUser = await getUserFromId(id))
      : (currentUser = await createNewUser({ id, email, fullName, avatarUrl }));
    setUser(currentUser);
  };

  const existsUserWithId = async (id: string) => {
    const userDocument = await firestore().collection('users').doc(id).get();
    return userDocument.exists;
  };

  const getUserFromId = async (id: string) => {
    const userDocument = await firestore().collection('users').doc(id).get();
    return userDocument.data() as User;
  };

  const createNewUser = async (params: {
    id: string;
    fullName: string | null;
    email: string;
    avatarUrl: string | null;
  }) => {
    const newUser: User = {
      id: params.id,
      email: params.email,
      fullName: params.fullName!,
      avatarUrl: params.avatarUrl!,
      likedBooks: [],
      matchedProfiles: [],
    };
    await firestore().collection('users').doc(newUser.id).set(newUser);
    return newUser;
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text style={styles.logoText}>ILYB</Text>
      </View>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        onPress={async () => {
          const signedInUser = await signInWithGoogle();
          signedInUser ? await handleUserCreation(signedInUser) : null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  logoView: {
    alignItems: 'center',
  },
  logo: {
    padding: 140,
    width: 230,
    height: 175,
  },
  logoText: {
    color: 'darkcyan',
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  signInButton: {
    width: 200,
    height: 50,
  },
});

export default SignIn;
