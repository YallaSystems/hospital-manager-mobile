/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import {store, persistor} from './src/store';
import './src/i18n';
import Toast from 'react-native-toast-message';
import axiosInstance from './src/axiosInstance';
import { URLS } from './src/constants/urls';

function App(): React.JSX.Element {
  useEffect(() => {
    axiosInstance.get(URLS.healthCheck)
      .then(res => {
        console.log('Health check success:', res.data);
      })
      .catch(err => {
        console.log('Health check error:', err);
      });
  }, []);

  return (
    <Provider store={store}>
      {/* PersistGate is used to persist the state to AsyncStorage */}
      <PersistGate loading={null} persistor={persistor}>
        {/* SafeAreaProvider is used to handle the safe area insets */}
        <SafeAreaProvider>
          <AppNavigator />
          <Toast />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
