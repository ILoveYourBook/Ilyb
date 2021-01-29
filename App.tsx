import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useEffect } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { env } from './env';
import DetailedInfo from './src/components/DetailedInfo';
import NavigationTabs from './src/components/NavigationTabs';
import SignIn from './src/components/SignIn';
import UploadBookForm from './src/components/UploadBookForm';
import UploadedBooks from './src/components/UploadedBooks';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: env.FIREBASE_WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  });
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="loading"
          component={SignIn}
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
        <Scene
          key="uploadBook"
          component={UploadBookForm}
          hideNavBar={true}
          title="UploadBookForm"
        />
        <Scene
          key="uploadedBooks"
          component={UploadedBooks}
          hideNavBar={true}
          title="UploadedBooks"
        />
        <Scene
          key="detailedInfo"
          component={DetailedInfo}
          hideNavBar={true}
          title="DetailedInfo"
        />
      </Scene>
    </Router>
  );
};

export default App;
