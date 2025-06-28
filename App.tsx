/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import {store, persistor} from './src/store';
import './src/i18n';
import axiosInstance from './src/axiosInstance';
import { URLS } from './src/constants/urls';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { performHealthCheck } from './src/services/healthCheckService';
import MaintenanceModal from './src/components/MaintenanceModal';

function App(): React.JSX.Element {
  const [isMaintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    performHealthCheck(setMaintenanceModalVisible, t);
  }, []);

  return (
    <Provider store={store}>
      {/* PersistGate is used to persist the state to AsyncStorage */}
      <PersistGate loading={null} persistor={persistor}>
        {/* SafeAreaProvider is used to handle the safe area insets */}
        <SafeAreaProvider>
          <AppNavigator />
          <MaintenanceModal
            visible={isMaintenanceModalVisible}
            onRetry={() => performHealthCheck(setMaintenanceModalVisible, t)}
            title={t('healthCheck.maintenanceTitle', 'System Under Maintenance')}
            message={t('healthCheck.maintenanceMessage', 'We are currently performing maintenance. Please try again later.')}
            retryButtonText={t('healthCheck.retryButton', 'Retry')}
          />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
