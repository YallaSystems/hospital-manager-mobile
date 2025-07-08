import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import OtpScreen from '../../screens/OtpScreen';
import { useTranslation } from 'react-i18next';
import type { AuthStackParamList } from '../AppNavigator';
import { Button } from 'react-native';
/**
 * A dedicated stack navigator for the authentication flow.
 * This ensures that the authentication screens (Login, Signup, OTP) have their own navigation context,
 * separate from the main application stack.
 */
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const { t } = useTranslation();

  // Memoize screen options to prevent unnecessary re-renders
  const screenOptions = useMemo(() => ({
    headerShown: true,
    headerLeft: ({ navigation }: any) => (
      <Button title={t('back')} onPress={() => navigation.goBack()} />
    ),
  }), [t]);

  // Memoize screen configurations to prevent unnecessary re-renders
  const screenConfigs = useMemo(() => ({
    login: { title: t('login') },
    signup: { title: t('signup') },
    forgotPassword: { title: t('forgotPassword') },
    otp: { title: t('otpScreen') },
  }), [t]);

  return (
    <AuthStackNavigator.Navigator screenOptions={screenOptions}>
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} options={screenConfigs.login} />
      <AuthStackNavigator.Screen name="Signup" component={SignupScreen} options={screenConfigs.signup} />
      <AuthStackNavigator.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={screenConfigs.forgotPassword} />
      <AuthStackNavigator.Screen name="Otp" component={OtpScreen} options={screenConfigs.otp} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack; 