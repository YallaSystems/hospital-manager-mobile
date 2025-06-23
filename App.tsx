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
import Toast from 'react-native-toast-message';
import axiosInstance from './src/axiosInstance';
import { URLS } from './src/constants/urls';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

function App(): React.JSX.Element {
  const [isMaintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const { t } = useTranslation();

  const performHealthCheck = () => {
    axiosInstance.get(URLS.healthCheck)
      .then(res => {
        setMaintenanceModalVisible(false);
        console.log('Health check success:', res.data);
      })
      .catch(err => {
        setMaintenanceModalVisible(true);
        Toast.show({
          type: 'error',
          text1: t('healthCheck.failedToastTitle'),
          text2: t('healthCheck.failedToastMessage'),
          position: 'bottom'
        });
      });
  };

  useEffect(() => {
    performHealthCheck();
  }, []);

  return (
    <Provider store={store}>
      {/* PersistGate is used to persist the state to AsyncStorage */}
      <PersistGate loading={null} persistor={persistor}>
        {/* SafeAreaProvider is used to handle the safe area insets */}
        <SafeAreaProvider>
          <AppNavigator />
          <Toast />
          {/* Maintenance Modal */}
          <Modal
            visible={isMaintenanceModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {}}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{t('healthCheck.maintenanceTitle')}</Text>
                <Text style={styles.modalText}>{t('healthCheck.maintenanceMessage')}</Text>
                <View style={{ marginTop: 14, width: '100%' }}>
                  <Button title={t('healthCheck.retryButton')} onPress={performHealthCheck} />
                </View>
              </View>
            </View>
          </Modal>
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
