import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => (key === 'welcome' ? 'Welcome to Hospital Manager' : key),
    i18n: {changeLanguage: () => new Promise(() => {})},
  }),
}));

describe('HomeScreen', () => {
  it('renders welcome text', () => {
    const {getByText} = render(<HomeScreen />);
    const welcomeText = getByText('Welcome to Hospital Manager');

    expect(welcomeText).toBeTruthy(); // ✅ Checks if the text is rendered
  });
});
