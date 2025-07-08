import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AppNavigator';
import { useOtpViewModel } from '../viewmodels/useOtpViewModel';

type OtpScreenProps = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

const OtpScreen = ({ route }: OtpScreenProps) => {
  const { t } = useTranslation();
  const { email, password } = route.params || {};
  const otpInput = useRef<TextInput>(null);

  // Use the OTP view model for all business logic
  const {
    otp,
    isVerifying,
    timeLeft,
    isResendDisabled,
    isResending,
    handleOtpChange,
    handleOtpSubmit,
    resendOtp,
    isValidOtp,
  } = useOtpViewModel(email || '', password, t);

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
          onChangeText={handleOtpChange}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
          style={[
            styles.otpInput,
            isValidOtp && styles.otpInputValid,
          ]}
          textContentType="none"
          autoFocus
        />

        <TouchableOpacity
          style={[
            styles.button,
            (!isValidOtp || isVerifying) && styles.buttonDisabled
          ]}
          onPress={handleOtpSubmit}
          disabled={!isValidOtp || isVerifying}
        >
          {isVerifying ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>{t('verify')}</Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP Section */}
        <View style={styles.resendContainer}>
          {isResendDisabled ? (
            <Text style={styles.timerText}>
              {t('resendOtpIn', { seconds: timeLeft })}
            </Text>
          ) : (
            <TouchableOpacity
              style={styles.resendButton}
              onPress={resendOtp}
              disabled={isResending}
            >
              {isResending ? (
                <ActivityIndicator color="#f4511e" size="small" />
              ) : (
                <Text style={styles.resendButtonText}>
                  {t('resendOtp')}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
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
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  otpInput: {
    width: '80%',
    height: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 10,
    backgroundColor: '#fafafa',
  },
  otpInputValid: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  button: {
    backgroundColor: '#f4511e',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f4511e',
    backgroundColor: 'transparent',
  },
  resendButtonText: {
    color: '#f4511e',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OtpScreen; 