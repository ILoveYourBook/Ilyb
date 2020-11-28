import { Button, Col, Grid, Icon, Image, Row, Tab, Text, Thumbnail, View } from 'native-base';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

const Profile = () => {
  const numberOfBooks = 21;
  const numberOfMatches = 11;
  const userBiography = 'This is my biography, where I should tell the people I match which are my interests in books.'
  return (
	  <>
      <Grid >
        <Row size={0.75}  style={{ alignItems: 'center' }}>
          <Col style={{ alignItems: 'center'}}>
            <Thumbnail style={{width: 200, height: 200}} source={require('../assets/avatar.png')} />
            <Text style={{fontSize: 30, marginTop: 10}}>Francis Molina</Text>
            <Text style={{fontSize: 20, margin: 5, textAlign: 'center'}}>{userBiography}</Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 15 }}>
              <Button rounded style={{width: 150, margin: 10, flexDirection: "row", justifyContent: 'space-around'}}>
                <Icon name="menu-book" type="MaterialIcons" style={{marginRight: 0}}/>
                <Text>Books: {numberOfBooks}</Text>
              </Button>
              <Button rounded style={{backgroundColor: 'orange', width: 150, margin: 10, flexDirection: "row", justifyContent: 'space-around'}}>
                <Icon name="favorite" type="MaterialIcons" style={{marginRight: 0}}/>
                <Text>Matches: {numberOfMatches}</Text>
              </Button>
            </View>
          </Col>
        </Row>
        <Row size={0.25} style={{alignItems: 'center', justifyContent: "center"}}>
          <Col>
            <Button style={{backgroundColor: 'darkcyan',width: 320, alignSelf: 'center', flexDirection: "row", justifyContent: "center", margin: 5}}>
              <Text>My books</Text>
            </Button>
            <Button danger style={{width: 320, alignSelf: 'center', flexDirection: "row", justifyContent: "center", margin: 5}}>
              <Text>Log out</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
      
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

export default Profile;
