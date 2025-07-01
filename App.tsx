/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './src/wdyr';
import React, { useEffect, useState } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/store';
import './src/i18n';
import axiosInstance from './src/axiosInstance';
import { URLS } from './src/constants/urls';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { performHealthCheck } from './src/services/healthCheckService';
import MaintenanceModal from './src/components/MaintenanceModal';
import AuthInitializer from './src/components/AuthInitializer';

function App(): React.JSX.Element {
  const [isMaintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    performHealthCheck(setMaintenanceModalVisible, t);
  }, []);

  return (
    <Provider store={store}>
      {/* SafeAreaProvider is used to handle the safe area insets */}
      <SafeAreaProvider>
        <AuthInitializer>
          <AppNavigator />
        </AuthInitializer>
        <MaintenanceModal
          visible={isMaintenanceModalVisible}
          onRetry={() => performHealthCheck(setMaintenanceModalVisible, t)}
          title={t('healthCheck.maintenanceTitle', 'System Under Maintenance')}
          message={t('healthCheck.maintenanceMessage', 'We are currently performing maintenance. Please try again later.')}
          retryButtonText={t('healthCheck.retryButton', 'Retry')}
        />
      </SafeAreaProvider>
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
