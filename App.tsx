import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import LoadingScreen from './src/components/LoadingScreen';
import NavigationTabs from './src/components/NavigationTabs';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="loading"
          component={LoadingScreen}
          title="Loading"
          hideNavBar={true}
          initial
        />
        <Scene
          key="nav"
          component={NavigationTabs}
          hideNavBar={true}
          title="NavigationTabs"
        />
      </Scene>
    </Router>
  );
};

export default App;
