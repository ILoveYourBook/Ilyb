import React, { Component } from 'react';
import { Tab, Tabs, TabHeading, Icon } from 'native-base';
import Home from './Home';
import Profile from './Profile';
export default class NavigationTabs extends Component {
  render() {
    return (
        <Tabs>
          <Tab heading={ <TabHeading><Icon name='account-circle' type="MaterialIcons" /></TabHeading>}>
              <Profile/>
          </Tab>
          <Tab heading={ <TabHeading><Icon name='home' type="MaterialIcons" /></TabHeading>}>
              <Home/>
          </Tab>
          <Tab heading={ <TabHeading><Icon name='chat-bubble' type="MaterialIcons" /></TabHeading>}>
              <Home/>
          </Tab>
        </Tabs>
    );
  }
}