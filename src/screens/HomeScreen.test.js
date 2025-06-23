import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

// Mocking the react-i18next library to control translations in tests.
jest.mock('react-i18next', () => ({
  // Mocking the useTranslation hook.
  useTranslation: () => ({
    // The t function is mocked to return a specific string for the 'welcome' key,
    // or the key itself for any other keys.
    t: (key) => key === 'welcome' ? 'Welcome to Hospital Manager' : key,
    // Mocking the i18n instance with an empty changeLanguage function.
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

// Test suite for the HomeScreen component.
describe('HomeScreen', () => {
  // Test case to verify that the welcome text is rendered correctly.
  it('renders welcome text', () => {
    // Renders the HomeScreen component for testing.
    const {getByText} = render(<HomeScreen />);
    // Gets the element containing the welcome text.
    const welcomeText = getByText('Welcome to Hospital Manager');

    // Asserts that the welcomeText element is present in the component.
    expect(welcomeText).toBeTruthy(); // ✅ Checks if the text is rendered
  });
});
