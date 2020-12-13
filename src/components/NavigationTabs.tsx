import firestore from '@react-native-firebase/firestore';
import { Icon, Tab, TabHeading, Tabs } from 'native-base';
import React, { useState } from 'react';
import { User } from '../models/User';
import Chat from './Chat';
import Home from './Home';
import Profile from './Profile';

const NavigationTabs = (props: { user: User }) => {
  const [user, setUser] = useState<User>(props.user);

  const fetchUser = async () => {
    const userDocument = await firestore()
      .collection('users')
      .doc(user.id)
      .get();
    const userData = userDocument.data() as User;
    setUser(userData);
  };

  return (
    <Tabs initialPage={1} onChangeTab={fetchUser} locked>
      <Tab
        heading={
          <TabHeading>
            <Icon name="account-circle" type="MaterialIcons" />
          </TabHeading>
        }>
        {user ? <Profile user={user} /> : null}
      </Tab>
      <Tab
        heading={
          <TabHeading>
            <Icon name="home" type="MaterialIcons" />
          </TabHeading>
        }>
        {user ? <Home user={user} /> : null}
      </Tab>
      <Tab
        heading={
          <TabHeading>
            <Icon name="chat-bubble" type="MaterialIcons" />
          </TabHeading>
        }>
        <Chat />
      </Tab>
    </Tabs>
  );
};

export default NavigationTabs;
