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

describe('SignupScreen', () => {
  const mockSetFullName = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetConfirmPassword = jest.fn();
  const mockHandleSignup = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
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

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={jest.fn()} />);
    
    expect(getByPlaceholderText('fullName')).toBeTruthy();
    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    expect(getByPlaceholderText('confirmPassword')).toBeTruthy();
    expect(getByText('signup')).toBeTruthy();
  });

  it('calls setters on input change', () => {
    const { getByPlaceholderText } = render(<SignupScreen navigation={jest.fn()} />);

    fireEvent.changeText(getByPlaceholderText('fullName'), 'John Doe');
    expect(mockSetFullName).toHaveBeenCalledWith('John Doe');

    fireEvent.changeText(getByPlaceholderText('email'), 'john@example.com');
    expect(mockSetEmail).toHaveBeenCalledWith('john@example.com');

    fireEvent.changeText(getByPlaceholderText('password'), 'password123');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');

    fireEvent.changeText(getByPlaceholderText('confirmPassword'), 'password123');
    expect(mockSetConfirmPassword).toHaveBeenCalledWith('password123');
  });

  it('calls handleSignup on signup button press', () => {
    const { getByText } = render(<SignupScreen navigation={jest.fn()} />);
    
    fireEvent.press(getByText('signup'));
    expect(mockHandleSignup).toHaveBeenCalled();
  });
}); 