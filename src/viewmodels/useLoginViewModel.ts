import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../store/slices/authSlice';
import type { RootState } from '../store';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

// TODO: The navigation prop is temporarily typed as `any` to avoid a type mismatch
// that occurs due to the nested navigation structure. When the `LoginScreen` was moved
// into the `AuthStack`, its navigation prop changed from the `RootStack`'s navigation
// to the `AuthStack`'s navigation. However, this view model still needs to access
// `navigation.replace('Main')`, which is part of the `RootStack`. This should be
// refactored, for example, by handling the navigation logic in the navigator itself
// based on the authentication state.
export const useLoginViewModel = (
  navigation: any
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Main');
    }
  }, [isAuthenticated, navigation]);

  /**
   * Navigates to the OTP screen, passing the email and password as parameters.
   * This allows the OTP screen to perform the login action after successful verification.
   */
  const handleLogin = () => {
    navigation.navigate('Otp', { email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
}; 