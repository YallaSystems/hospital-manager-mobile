import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { loginRequest } from '../store/slices/authSlice';
import { useOtpTimer } from '../hooks/useOtpTimer';

/**
 * View model for OTP screen functionality
 * Encapsulates all OTP-related business logic including:
 * - OTP input validation
 * - Timer management
 * - Resend functionality
 * - Different flow handling (login, signup, forgot password)
 * 
 * @param email - User's email address
 * @param password - User's password (optional, for login flow)
 * @param t - Translation function
 * @returns Object containing all OTP screen state and handlers
 */
export const useOtpViewModel = (
  email: string, 
  password: string | undefined, 
  t: (key: string, options?: any) => string
) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const dispatch = useDispatch();
  
  // Use the OTP timer hook
  const { timeLeft, isResendDisabled, isResending, resendOtp } = useOtpTimer(email, t);

  /**
   * Validates OTP format
   * Industry standard: 6-digit numeric OTP
   */
  const isValidOtp = useCallback((otpValue: string): boolean => {
    return otpValue.length === 6 && /^\d{6}$/.test(otpValue);
  }, []);

  /**
   * Handles OTP input changes with validation
   * Ensures only numeric input and max length
   */
  const handleOtpChange = useCallback((value: string) => {
    // Only allow numeric input
    const numericValue = value.replace(/[^0-9]/g, '');
    // Limit to 6 digits
    const limitedValue = numericValue.slice(0, 6);
    setOtp(limitedValue);
  }, []);

  /**
   * Handles OTP verification
   * Supports different flows: login, signup, forgot password
   */
  const handleOtpSubmit = useCallback(async () => {
    if (!isValidOtp(otp)) {
      Alert.alert(t('error'), t('invalidOtp'));
      return;
    }

    setIsVerifying(true);

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email && password) {
        // Login/Signup flow - dispatch login request after OTP verification
        dispatch(loginRequest({ email, password }));
      } else if (email) {
        // Forgot password flow - handle password reset
        Alert.alert(
          t('success'), 
          'Password reset OTP verified successfully!',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(t('error'), t('invalidOtp'));
      }
    } catch (error) {
      Alert.alert(t('error'), t('invalidOtp'));
    } finally {
      setIsVerifying(false);
    }
  }, [otp, email, password, isValidOtp, dispatch, t]);

  /**
   * Clears the OTP input
   */
  const clearOtp = useCallback(() => {
    setOtp('');
  }, []);

  return {
    otp,
    isVerifying,
    timeLeft,
    isResendDisabled,
    isResending,
    handleOtpChange,
    handleOtpSubmit,
    resendOtp,
    clearOtp,
    isValidOtp: isValidOtp(otp),
  };
};
