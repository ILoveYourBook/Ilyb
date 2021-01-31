import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeContainer from './HomeContainer';
import MatchesContainer from './MatchesContainer';
import ProfileContainer from './ProfileContainer';

const NavigationTabs = () => {
  const ProfileRoute = () => <ProfileContainer />;
  const HomeRoute = () => <HomeContainer />;
  const MatchesRoute = () => <MatchesContainer />;

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
