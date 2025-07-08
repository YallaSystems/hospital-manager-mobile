import { renderHook, act } from '@testing-library/react-hooks';
import { useOtpTimer } from '../useOtpTimer';
import axiosInstance from '../../axiosInstance';
import Toast from 'react-native-toast-message';

// Mock dependencies
jest.mock('../../axiosInstance');
jest.mock('react-native-toast-message');

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;
const mockToast = Toast as jest.Mocked<typeof Toast>;

describe('useOtpTimer', () => {
  const mockEmail = 'test@example.com';
  const mockT = jest.fn((key: string, options?: any) => {
    const translations: { [key: string]: string } = {
      'otpSentSuccessfully': 'OTP sent successfully',
      'error': 'Error',
      'failedToResendOtp': 'Failed to resend OTP',
      'enterOtp': `Enter OTP sent to ${options?.email || 'email'}`,
    };
    return translations[key] || key;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with 60 seconds timer and resend disabled', () => {
    const { result } = renderHook(() => useOtpTimer(mockEmail, mockT));

    expect(result.current.timeLeft).toBe(60);
    expect(result.current.isResendDisabled).toBe(true);
    expect(result.current.isResending).toBe(false);
  });

  it('should countdown timer correctly', () => {
    const { result } = renderHook(() => useOtpTimer(mockEmail, mockT));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(59);
    expect(result.current.isResendDisabled).toBe(true);
  });

  it('should enable resend when timer reaches 0', () => {
    const { result } = renderHook(() => useOtpTimer(mockEmail, mockT));

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isResendDisabled).toBe(false);
  });

  it('should successfully resend OTP', async () => {
    mockAxiosInstance.post.mockResolvedValueOnce({
      data: { message: 'OTP sent successfully' }
    });

    const { result } = renderHook(() => useOtpTimer(mockEmail, mockT));

    // Fast forward to enable resend
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    await act(async () => {
      await result.current.resendOtp();
    });

    expect(mockAxiosInstance.post).toHaveBeenCalledWith('auth/resend-otp', {
      email: mockEmail
    });
    expect(mockToast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'OTP sent successfully',
      text2: 'OTP sent successfully',
      position: 'top',
    });
    expect(result.current.timeLeft).toBe(60);
    expect(result.current.isResendDisabled).toBe(true);
  });

  it('should handle resend OTP error', async () => {
    const errorResponse = {
      response: { data: { message: 'Server error' } }
    };
    mockAxiosInstance.post.mockRejectedValueOnce(errorResponse);

    const { result } = renderHook(() => useOtpTimer(mockEmail, mockT));

    // Fast forward to enable resend
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    await act(async () => {
      await result.current.resendOtp();
    });

    expect(mockToast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error',
      text2: 'Server error',
      position: 'top',
    });
  });
});
