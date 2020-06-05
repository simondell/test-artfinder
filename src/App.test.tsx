import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders a currency converter app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Currency Converter/i);
  expect(linkElement).toBeInTheDocument();
});
