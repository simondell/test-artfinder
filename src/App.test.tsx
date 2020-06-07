import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import App, {
  ActionTypes,
  manageAmounts,
} from './App';

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

test('manageAmounts() returns initial state, by default', () => {
  const arbitrary = { type: 3 }
  const initialState = [
    { denomination: 'EUR', value: 0 },
    { denomination: 'GBP', value: 0 },
  ]

  const nextState = manageAmounts(initialState, arbitrary)

  expect(nextState).toEqual(initialState)
})

test.each([
  [0, 'ISK'],
  [0, 'PHP'],
  [1, 'PHP'],
  [1, 'THB'],
])('manageAmounts() updates amount[%d] to %s', (index, denomination) => {
  const setCurrency = {
    denomination,
    index,
    type: ActionTypes.SET_CURRENCY,
  }
  const initialState = [
    { denomination: 'EUR', value: 0 },
    { denomination: 'GBP', value: 0 },
  ]

  const nextState = manageAmounts(initialState, setCurrency)

  expect(nextState[index].denomination).not.toEqual(initialState[index].denomination)
  expect(nextState[index].denomination).toEqual(denomination)
})

