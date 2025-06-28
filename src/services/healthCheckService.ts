import axiosInstance from '../axiosInstance';
import { URLS } from '../constants/urls';
import { Alert } from 'react-native';
import type { TFunction } from 'i18next';

export const performHealthCheck = (
  setMaintenanceModalVisible: (visible: boolean) => void,
  t: TFunction
) => {
  axiosInstance.get(URLS.healthCheck)
    .then(res => {
      setMaintenanceModalVisible(false);
      console.log('Health check success:', res.data);
    })
    .catch(err => {
      setMaintenanceModalVisible(true);
      Alert.alert(
        t('healthCheck.failedTitle', { defaultValue: 'Error' }),
        t('healthCheck.failedMessage', { defaultValue: 'Health check failed' })
      );
    });
}; 