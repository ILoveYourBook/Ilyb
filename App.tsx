import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoadingScreen from './src/components/LoadingScreen';
import Home from './src/components/Home';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="loading"
          component={LoadingScreen}
          title="Loading"
          hideNavBar={true}
          initial
        />
        <Scene
          key="home"
          component={Home}
          hideNavBar={true}
          title="Home"
        />
      </Scene>
    </Router>
  );
};

export default App;
