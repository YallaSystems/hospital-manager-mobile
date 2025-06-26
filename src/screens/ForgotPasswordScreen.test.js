import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import axiosInstance from '../axiosInstance';

// Mock dependencies
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('../axiosInstance', () => ({
  post: jest.fn(() => Promise.resolve()),
}));

// Test suite for the ForgotPasswordScreen component.
describe('ForgotPasswordScreen', () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();
  const mockNavigation = {
    navigate: mockNavigate,
    goBack: mockGoBack,
    reset: jest.fn(),
    canGoBack: () => true,
    getParent: jest.fn(),
    getState: jest.fn(),
    dispatch: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    isFocused: () => true,
    addListener: jest.fn(() => () => {}),
    removeListener: jest.fn(),
  };

  // This function runs before each test in this suite.
  beforeEach(() => {
    // It clears all mock function call history to ensure that tests are independent of each other.
    jest.clearAllMocks();
  });

  // Test case to ensure that the component renders correctly with all expected elements.
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} route={{key: 'test', name: 'ForgotPassword'}} />
    );
    
    // .toBeTruthy() is a Jest matcher that checks if a value is truthy (i.e. not false, 0, "", null, undefined, or NaN).
    // In this case, `getByText` returns an element if found (which is a truthy value), or throws an error, failing the test.
    expect(getByText('resetPassword')).toBeTruthy();
    expect(getByText('enterEmailForReset')).toBeTruthy();
    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByText('sendResetLink')).toBeTruthy();
  });

  // Test case to verify that an error message is shown when the user tries to submit an empty email.
  it('shows error for empty email', async () => {
    const { getByText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} route={{key: 'test', name: 'ForgotPassword'}} />
    );
    
    // Simulates a press on the "sendResetLink" button.
    fireEvent.press(getByText('sendResetLink'));
    
    // `waitFor` is used to handle asynchronous UI updates.
    // It waits until the expectation within the callback is met.
    await waitFor(() => {
      // Asserts that the error message for an empty email is displayed.
      expect(getByText('errors.enterYourEmail')).toBeTruthy();
    });
  });

  // Test case to verify that an error message is shown for an invalid email format.
  it('shows error for invalid email format', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} route={{key: 'test', name: 'ForgotPassword'}} />
    );
    
    // Simulates typing an invalid email into the email input field.
    fireEvent.changeText(getByPlaceholderText('email'), 'invalid-email');
    // Simulates a press on the "sendResetLink" button.
    fireEvent.press(getByText('sendResetLink'));
    
    // Waits for the UI to update and asserts that the validation error message is displayed.
    await waitFor(() => {
      expect(getByText('errors.enterValidEmail')).toBeTruthy();
    });
  });

  // Test case to ensure navigation to the OTP screen occurs after submitting a valid email.
  it('navigates to OTP screen with valid email', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} route={{key: 'test', name: 'ForgotPassword'}} />
    );
    
    // Simulates typing a valid email address.
    fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
    // Simulates a press on the "sendResetLink" button.
    fireEvent.press(getByText('sendResetLink'));
    
    // Waits for the navigation to occur and asserts that it navigates to the 'Otp' screen with the email as a parameter.
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Otp', { email: 'test@example.com' });
    }, { timeout: 2000 });
  });

  // Test case to verify that pressing the back button triggers the goBack function.
  it('navigates back when back button is pressed', () => {
    const { getByText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} route={{key: 'test', name: 'ForgotPassword'}} />
    );
    
    // Simulates a press on the "back" button.
    fireEvent.press(getByText('back'));
    // Asserts that the goBack mock function was called.
    expect(mockGoBack).toHaveBeenCalled();
  });
}); 