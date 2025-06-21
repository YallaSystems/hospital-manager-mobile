/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import {store, persistor} from './src/store';
import './src/i18n';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      {/* PersistGate is used to persist the state to AsyncStorage */}
      <PersistGate loading={null} persistor={persistor}>
        {/* SafeAreaProvider is used to handle the safe area insets */}
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
