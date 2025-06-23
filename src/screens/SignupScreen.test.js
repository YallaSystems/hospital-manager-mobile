import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignupScreen from './SignupScreen';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';

// Mock dependencies
jest.mock('../viewmodels/useSignupViewModel');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Test suite for the SignupScreen component.
describe('SignupScreen', () => {
  const mockSetFullName = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetConfirmPassword = jest.fn();
  const mockHandleSignup = jest.fn();

  // This function runs before each test in the suite.
  beforeEach(() => {
    // Reset mocks before each test to ensure test isolation.
    jest.clearAllMocks();
    // Mocks the return value of the useSignupViewModel hook to control its output during testing.
    useSignupViewModel.mockReturnValue({
      fullName: '',
      setFullName: mockSetFullName,
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      confirmPassword: '',
      setConfirmPassword: mockSetConfirmPassword,
      handleSignup: mockHandleSignup,
    });
  });

  // Test case to ensure that the signup screen renders correctly with all input fields and the signup button.
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={jest.fn()} />);
    
    // Asserts that all the necessary input fields and the signup button are displayed.
    expect(getByPlaceholderText('fullName')).toBeTruthy();
    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    expect(getByPlaceholderText('confirmPassword')).toBeTruthy();
    expect(getByText('signup')).toBeTruthy();
  });

  // Test case to verify that input changes call the correct setter functions from the view model.
  it('calls setters on input change', () => {
    const { getByPlaceholderText } = render(<SignupScreen navigation={jest.fn()} />);

    // Simulates typing a full name and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('fullName'), 'John Doe');
    expect(mockSetFullName).toHaveBeenCalledWith('John Doe');

    // Simulates typing an email and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('email'), 'john@example.com');
    expect(mockSetEmail).toHaveBeenCalledWith('john@example.com');

    // Simulates typing a password and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('password'), 'password123');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');

    // Simulates typing a confirmation password and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('confirmPassword'), 'password123');
    expect(mockSetConfirmPassword).toHaveBeenCalledWith('password123');
  });

  // Test case to ensure that pressing the signup button calls the handleSignup function.
  it('calls handleSignup on signup button press', () => {
    const { getByText } = render(<SignupScreen navigation={jest.fn()} />);
    
    // Simulates a press on the signup button.
    fireEvent.press(getByText('signup'));
    // Asserts that the handleSignup function was called.
    expect(mockHandleSignup).toHaveBeenCalled();
  });
}); 