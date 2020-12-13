import {
  GoogleSignin,
  GoogleSigninButton,
  User,
} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const SignIn = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (user) {
      Actions.nav({ user });
    }
  }, [user]);

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
          await GoogleSignin.hasPlayServices();
          const signedInUser = await GoogleSignin.signIn();
          const userDocument = await firestore()
            .collection('users')
            .doc(signedInUser.user.id)
            .get();
          if (!userDocument.exists) {
            await firestore()
              .collection('users')
              .doc(signedInUser.user.id)
              .set({ likedUsers: [] });
          }
          setUser(signedInUser);
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
