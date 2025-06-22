import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OtpScreen from './OtpScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Alert } from 'react-native';

// Mock dependencies
jest.mock('react-native/Libraries/Alert/Alert');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, params) => (params ? `${key} ${params.email}` : key),
  }),
}));

const mockStore = configureStore([]);

describe('OtpScreen', () => {
  let store;
  const mockRoute = {
    params: {
      email: 'test@example.com',
      password: 'password123',
    },
  };

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );
    
    expect(getByText('otpVerification')).toBeTruthy();
    expect(getByText('enterOtp test@example.com')).toBeTruthy();
    expect(getByPlaceholderText('- - - - - -')).toBeTruthy();
    expect(getByText('verify')).toBeTruthy();
  });

  it('handles OTP input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );

    const otpInput = getByPlaceholderText('- - - - - -');
    fireEvent.changeText(otpInput, '123456');
    expect(otpInput.props.value).toBe('123456');
  });

  it('dispatches loginRequest on valid OTP submission', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('- - - - - -'), '123456');
    fireEvent.press(getByText('verify'));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'auth/loginRequest',
      payload: { email: 'test@example.com', password: 'password123' },
    });
  });

  it('shows an alert on invalid OTP submission', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('- - - - - -'), '123');
    fireEvent.press(getByText('verify'));

    expect(Alert.alert).toHaveBeenCalledWith('error', 'invalidOtp');
  });
}); 