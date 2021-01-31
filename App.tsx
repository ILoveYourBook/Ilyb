import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useEffect } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { env } from './env';
import BooksList from './src/components/BooksList';
import DetailedInfo from './src/components/DetailedInfo';
import NavigationTabs from './src/components/NavigationTabs';
import SignInContainer from './src/components/SignInContainer';
import UploadBookForm from './src/components/UploadBookForm';
import { ownedBooksReducer } from './src/redux/reducers/OwnedBooksReducer';
import { userReducer } from './src/redux/reducers/UserReducer';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: env.FIREBASE_WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  });

  const rootReducer = combineReducers({
    user: userReducer,
    ownedBooks: ownedBooksReducer,
  });
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene
            key="loading"
            component={SignInContainer}
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
            key="booksList"
            component={BooksList}
            hideNavBar={true}
            title="BooksList"
          />
          <Scene
            key="detailedInfo"
            component={DetailedInfo}
            hideNavBar={true}
            title="DetailedInfo"
          />
        </Scene>
      </Router>
    </Provider>
  );
};

export default App;
