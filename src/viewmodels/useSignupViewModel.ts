import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import axiosInstance from '../axiosInstance';
import { URLS } from '../constants/urls';
import { useTranslation } from 'react-i18next';

/**
 * A view model hook for the Signup screen.
 * It encapsulates the state and logic for handling user registration,
 * including form fields for full name, email, password, and confirm password.
 *
 * @param navigation - The navigation prop from React Navigation.
 * @returns An object containing the state variables, their setters, and the signup handler function.
 */
export const useSignupViewModel = (navigation: any) => {
  const [firstName, setFirstName] = useState('fn');
  const [lastName, setLastName] = useState('ln');
  const [email, setEmail] = useState(`sadi@yalla.systems`);
  const [password, setPassword] = useState('12345678');
  const [confirmPassword, setConfirmPassword] = useState('12345678');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  /**
   * Handles the signup process.
   * It validates that the passwords match and will dispatch a signup action.
   * Currently, it navigates to the OTP screen for verification upon successful validation.
   */
  const handleSignup = async () => {
    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: t('errors.passwordTooShort'),
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: t('errors.passwordsDoNotMatch'),
      });
      return;
    }
    // Dispatch signup action here
    // For now, let's navigate to OTP as an example
    try {
      const sendOTPResponse = await axiosInstance.post(URLS.sendOTP, { email: email.trim() });
      navigation.navigate('Otp', { email, password });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: t('errors.failedToSendResetLink'),
      });
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignup,
  };
}; 