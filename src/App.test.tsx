import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import App from './App';

test('renders a currency converter app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Currency Converter/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders two select boxes for currency types', () => {
  render(<App />);
  const selectors = screen.getAllByRole('combobox')
  expect(selectors.length).toEqual(2)
})

test('renders two text fields for numbers', () => {
  render(<App />);
  const selectors = screen.getAllByRole('textbox')
  expect(selectors.length).toEqual(2)
})