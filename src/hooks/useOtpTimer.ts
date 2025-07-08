import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../axiosInstance';
import { URLS } from '../constants/urls';
import Toast from 'react-native-toast-message';

/**
 * Custom hook for managing OTP timer and resend functionality
 * Follows industry best practices for OTP handling:
 * - 60-second countdown timer
 * - Automatic timer reset on resend
 * - Error handling with user feedback
 * - Loading states for better UX
 * - Cleanup on unmount to prevent memory leaks
 */
export const useOtpTimer = (email: string, t: (key: string, options?: any) => string) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isResending, setIsResending] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  // Reset timer function
  const resetTimer = useCallback(() => {
    setTimeLeft(60);
    setIsResendDisabled(true);
  }, []);

  // Resend OTP function
  const resendOtp = useCallback(async () => {
    if (isResendDisabled || isResending) return;

    setIsResending(true);
    
    try {
      const response = await axiosInstance.post(URLS.resendOTP, { 
        email: email.trim() 
      });
      
      Toast.show({
        type: 'success',
        text1: t('otpSentSuccessfully'),
        text2: response.data?.message || t('enterOtp', { email }),
        position: 'top',
      });
      
      resetTimer();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: error.response?.data?.message || t('failedToResendOtp'),
        position: 'top',
      });
    } finally {
      setIsResending(false);
    }
  }, [email, isResendDisabled, isResending, resetTimer, t]);

  return {
    timeLeft,
    isResendDisabled,
    isResending,
    resendOtp,
    resetTimer,
  };
};
