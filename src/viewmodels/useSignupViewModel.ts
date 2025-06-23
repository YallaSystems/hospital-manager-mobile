import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import axiosInstance from '../axiosInstance';

/**
 * A view model hook for the Signup screen.
 * It encapsulates the state and logic for handling user registration,
 * including form fields for full name, email, password, and confirm password.
 *
 * @param navigation - The navigation prop from React Navigation.
 * @returns An object containing the state variables, their setters, and the signup handler function.
 */
export const useSignupViewModel = (navigation: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  /**
   * Handles the signup process.
   * It validates that the passwords match and will dispatch a signup action.
   * Currently, it navigates to the OTP screen for verification upon successful validation.
   */
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Dispatch signup action here
    // For now, let's navigate to OTP as an example
    try {
      await axiosInstance.post('auth/send-otp', { email: email.trim() });
      navigation.navigate('Otp', { email, password });
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignup,
  };
}; 