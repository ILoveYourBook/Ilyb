import React, { useEffect, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { User } from '../models/User';
import Home from './Home';
import Matches from './Matches';
import Profile from './Profile';

const NavigationTabs = (props: { user: User }) => {
  const [user, setUser] = useState<User>(props.user);

  const ProfileRoute = () => {
    return user ? <Profile user={user} /> : null;
  };
  const HomeRoute = () => {
    return user ? <Home user={user} /> : null;
  };
  const MatchesRoute = () => <Matches user={user} />;
  const fetchUser = async () => {
    const userDocument = await firestore()
      .collection('users')
      .doc(user.id)
      .get();
    const userData = userDocument.data() as User;
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'profile', title: 'Profile', icon: 'account' },
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'matches', title: 'Matches', icon: 'star' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileRoute,
    home: HomeRoute,
    matches: MatchesRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavigationTabs;
