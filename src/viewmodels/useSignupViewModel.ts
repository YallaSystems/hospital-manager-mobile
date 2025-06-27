import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import axiosInstance from '../axiosInstance';
import { URLS } from '../constants/urls';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../constants/paths';

/**
 * A view model hook for the Signup screen.
 * It encapsulates the state and logic for handling user registration,
 * including form fields for full name, email, password, and confirm password.
 *
 * @param navigation - The navigation prop from React Navigation.
 * @returns An object containing the state variables, their setters, and the signup handler function.
 */
export const useSignupViewModel = (navigation: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  type Sex = 'male' | 'female' | '';
  const [sex, setSex] = useState<Sex>('');
  const [role, setRole] = useState('patient');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  /**
   * Handles the signup process.
   * It validates that the passwords match and will dispatch a signup action.
   * Currently, it navigates to the OTP screen for verification upon successful validation.
   */
  const handleSignup = useCallback(async () => {
    if (!firstName.trim()) {
      Toast.show({
        type: 'error',
        text1: t('missingData', 'Missing Data'),
        text2: t('errors.enterFirstName', 'Please enter your first name'),
      });
      return;
    }
    if (!lastName.trim()) {
      Toast.show({
        type: 'error',
        text1: t('missingData', 'Missing Data'),
        text2: t('errors.enterLastName', 'Please enter your last name'),
      });
      return;
    }
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: t('missingData', 'Missing Data'),
        text2: t('errors.enterYourEmail', 'Please enter your email address'),
      });
      return;
    }
    // Block plus addressing: local part must not contain '+'
    const emailRegex = /^[^\s@+]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Toast.show({
        type: 'error',
        text1: t('missingData', 'Missing Data'),
        text2: t('errors.enterValidEmail', 'Please enter a valid email address'),
      });
      return;
    }
    if (!sex) {
      Toast.show({
        type: 'error',
        text1: t('missingData', 'Missing Data'),
        text2: t('errors.selectSex', 'Please select your gender'),
      });
      return;
    }
    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: t('missingData', 'Missing Data'),
        text2: t('errors.passwordTooShort', 'Password must be at least 8 characters long'),
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t('missingData', 'Missing Data'),
        text2: t('errors.passwordsDoNotMatch', 'Passwords do not match'),
      });
      return;
    }
    // Dispatch signup action here
    // For now, let's navigate to OTP as an example
    try {
      const sendOTPResponse = await axiosInstance.post(URLS.sendOTP, { email: email.trim() });
      Toast.show({
        type: 'success',
        text1: t('success', 'Success'),
        text2: sendOTPResponse.data.message,
      });
      navigation.navigate(PATHS.AUTH.OTP, { email, password });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: t('error', 'An error occurred'),
        text2: t('errors.failedToSendResetLink', 'Failed to send reset link. Please try again.'),
      });
    }
  }, [firstName, lastName, email, sex, password, confirmPassword, navigation, t]);

  const handleSignupSubmitAfterOTP = async (Otp: string) => {
    try {
      const response = await axiosInstance.post(
        URLS.register,
        {
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          sex,
          role,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: Otp,
          },
        }
      );
      Toast.show({
        type: 'success',
        text1: t('success', 'Success'),
        text2: response.data.message || 'Registration successful',
      });
      navigation.replace(PATHS.Main, { screen: PATHS.MAIN.HomeStackScreen });
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: t('error', 'An error occurred'),
        text2: err?.response?.data?.message || t('errors.failedToRegister', 'Registration failed'),
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
    sex,
    setSex,
    role,
    setRole,
    handleSignupSubmitAfterOTP,
  };
}; 