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

// Creates a mock Redux store for testing purposes.
const mockStore = configureStore([]);

// Test suite for the OtpScreen component.
describe('OtpScreen', () => {
  let store;
  const mockRoute = {
    params: {
      email: 'test@example.com',
      password: 'password123',
    },
  };

  // This function runs before each test in the suite.
  beforeEach(() => {
    // Initializes a new mock store before each test.
    store = mockStore({});
    // Mocks the dispatch function of the store.
    store.dispatch = jest.fn();
  });

  // This function runs after each test in the suite to clear mock history.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case to ensure the OTP screen renders correctly with all expected elements.
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );
    
    // Asserts that all the necessary text and input fields are displayed.
    expect(getByText('otpVerification')).toBeTruthy();
    expect(getByText('enterOtp test@example.com')).toBeTruthy();
    expect(getByPlaceholderText('- - - - - -')).toBeTruthy();
    expect(getByText('verify')).toBeTruthy();
  });

  // Test case to verify that the OTP input field handles text changes correctly.
  it('handles OTP input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );

    const otpInput = getByPlaceholderText('- - - - - -');
    // Simulates typing an OTP into the input field.
    fireEvent.changeText(otpInput, '123456');
    // Asserts that the value of the input field is updated.
    expect(otpInput.props.value).toBe('123456');
  });

  // Test case to ensure that a loginRequest action is dispatched with a valid OTP.
  it('dispatches loginRequest on valid OTP submission', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );

    // Simulates typing a valid OTP and pressing the verify button.
    fireEvent.changeText(getByPlaceholderText('- - - - - -'), '123456');
    fireEvent.press(getByText('verify'));

    // Asserts that the loginRequest action was dispatched with the correct credentials.
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'auth/loginRequest',
      payload: { email: 'test@example.com', password: 'password123' },
    });
  });

  // Test case to verify that an alert is shown for an invalid OTP.
  it('shows an alert on invalid OTP submission', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <OtpScreen route={mockRoute} />
      </Provider>
    );

    // Simulates typing an invalid OTP and pressing the verify button.
    fireEvent.changeText(getByPlaceholderText('- - - - - -'), '123');
    fireEvent.press(getByText('verify'));

    // Asserts that an alert with an error message is shown.
    expect(Alert.alert).toHaveBeenCalledWith('error', 'invalidOtp');
  });
}); 