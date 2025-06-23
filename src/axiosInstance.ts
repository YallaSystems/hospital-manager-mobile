import axios, { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import Toast from 'react-native-toast-message';
import { store } from './store';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://9kcsl9ztlc.execute-api.ap-southeast-1.amazonaws.com/v1/', // Set your API base URL here
  timeout: 10000,
});

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth?.user?.token;
    if (token && config.headers && typeof (config.headers as AxiosHeaders).set === 'function') {
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for retry and error toast
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    // Retry logic
    if (!config || config.__retryCount >= 3) {
      // Show toast for error message
      const message = error?.response?.data?.message || error?.message || 'Network error';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'bottom'
      });
      return Promise.reject(error);
    }
    config.__retryCount = config.__retryCount ? config.__retryCount + 1 : 1;
    return axiosInstance(config);
  }
);

export default axiosInstance; 