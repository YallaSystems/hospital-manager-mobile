import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
  it('renders welcome text', () => {
    const {getByText} = render(<HomeScreen />);
    const welcomeText = getByText('Welcome to Hospital Manager');

    expect(welcomeText).toBeTruthy(); // ✅ Checks if the text is rendered
  });
});
