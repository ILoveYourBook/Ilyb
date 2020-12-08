import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

const SignIn = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });
  }, [fadeAnim]);

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
          const user = await GoogleSignin.signIn();
          Actions.nav({user});
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
