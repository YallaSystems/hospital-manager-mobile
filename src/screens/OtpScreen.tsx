import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../store/slices/authSlice';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AppNavigator';

type OtpScreenProps = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

const OtpScreen = ({ route }: OtpScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { email, password } = route.params || {};

  const [otp, setOtp] = useState('');
  const otpInput = useRef<TextInput>(null);

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      if (email && password) {
        // Login flow - dispatch login request
        dispatch(loginRequest({ email, password }));
      } else if (email) {
        // Forgot password flow - handle password reset
        // Here you would typically make an API call to verify OTP and reset password
        Alert.alert('Success', 'Password reset OTP verified successfully!');
      } else {
        Alert.alert(t('error'), t('invalidOtp'));
      }
    } else {
      Alert.alert(t('error'), t('invalidOtp'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('otpVerification')}</Text>
        <Text style={styles.subtitle}>{t('enterOtp', { email })}</Text>
        <TextInput
          ref={otpInput}
          placeholder="- - - - - -"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
          style={styles.otpInput}
          textContentType="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
          <Text style={styles.buttonText}>{t('verify')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpInput: {
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 10,
  },
  button: {
    backgroundColor: '#f4511e',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OtpScreen; 