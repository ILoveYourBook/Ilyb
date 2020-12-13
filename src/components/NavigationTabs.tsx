import { User } from '@react-native-community/google-signin';
import { Icon, Tab, TabHeading, Tabs } from 'native-base';
import React from 'react';
import Chat from './Chat';
import Home from './Home';
import Profile from './Profile';

type Props = {
  user: User;
};

const NavigationTabs = (props: Props) => {
  return (
    <Tabs initialPage={1} locked>
      <Tab
        heading={
          <TabHeading>
            <Icon name="account-circle" type="MaterialIcons" />
          </TabHeading>
        }>
        <Profile user={props.user} />
      </Tab>
      <Tab
        heading={
          <TabHeading>
            <Icon name="home" type="MaterialIcons" />
          </TabHeading>
        }>
        <Home user={props.user} />
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
