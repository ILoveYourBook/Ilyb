import { Button, Grid, Icon, Image, Tab, Text, View } from 'native-base';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import NavigationTabs from './NavigationTabs';
import BookCardSwiper from './BookCardSwiper';

const Home = () => {
  return (
	  <>
      	<BookCardSwiper/>
		<View style={{ flexDirection: "row", justifyContent: 'space-around', padding: 15 }}>
			<Icon style={{fontSize: 40, color: 'black'}} name='clear' type="MaterialIcons" />
			<Icon style={{fontSize: 40, color: 'red'}} name='favorite' type="MaterialIcons" />
		</View>
	  </>
  );
};

const styles = StyleSheet.create({
	mainView: {
		justifyContent: "center"
	},
	logo: {
		width: 30,
	}
});

export default Home;
