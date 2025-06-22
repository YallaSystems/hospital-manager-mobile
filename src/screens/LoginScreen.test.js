import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { useLoginViewModel } from '../viewmodels/useLoginViewModel';

// Mock dependencies
jest.mock('../viewmodels/useLoginViewModel');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('LoginScreen', () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useLoginViewModel.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      loading: false,
      error: null,
      handleLogin: mockHandleLogin,
    });
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    
    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    expect(getByText('login')).toBeTruthy();
    expect(getByText("dontHaveAccount signup")).toBeTruthy();
  });

  it('calls setEmail and setPassword on input change', () => {
    const { getByPlaceholderText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);

    fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');

    fireEvent.changeText(getByPlaceholderText('password'), 'password123');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  it('calls handleLogin on login button press', () => {
    const { getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    
    fireEvent.press(getByText('login'));
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it('navigates to signup on signup text press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    
    fireEvent.press(getByText('dontHaveAccount signup'));
    expect(mockNavigate).toHaveBeenCalledWith('Signup');
  });
}); 