import React, {useEffect, useRef} from 'react';
import {StyleSheet, Image, Animated, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => Actions.nav());
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.mainView,
        {
          opacity: fadeAnim,
        },
      ]}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.logoText}>ILYB</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  logo: {
    width: 225,
    height: 175,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'darkcyan',
    marginTop: 40,
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default LoadingScreen;
