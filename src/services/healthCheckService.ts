import axiosInstance from '../axiosInstance';
import { URLS } from '../constants/urls';
import Toast from 'react-native-toast-message';
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
      Toast.show({
        type: 'error',
        text1: t('healthCheck.failedToastTitle', { defaultValue: 'Error' }),
        text2: t('healthCheck.failedToastMessage', { defaultValue: 'Health check failed' }),
        position: 'bottom'
      });
    });
}; 