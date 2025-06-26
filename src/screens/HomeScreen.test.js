import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // The t function is mocked to return a specific string for the 'welcome' key, or the key itself for any other keys.
    t: (key) => key === 'welcome' ? 'Welcome to Hospital Manager' : key,
    i18n: { changeLanguage: () => new Promise(() => { }) },
  }),
}));

describe('HomeScreen', () => {
  it('renders welcome text', () => {
    const { getByText } = render(<HomeScreen />);
    const welcomeText = getByText('Welcome to Hospital Manager');
    expect(welcomeText).toBeTruthy();
  });
});
