import axiosInstance from '../axiosInstance';
import { URLS } from '../constants/urls';
import Toast from 'react-native-toast-message';

export const performHealthCheck = (
  setMaintenanceModalVisible: (visible: boolean) => void,
  t: (key: string) => string
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
        text1: t('healthCheck.failedToastTitle'),
        text2: t('healthCheck.failedToastMessage'),
        position: 'bottom'
      });
    });
}; 