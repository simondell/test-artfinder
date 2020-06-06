import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyPicker from './CurrencyPicker';
import RatesContext from '../Rates/RatesContext'

test('renders options for each currency in rates context', () => {
  render(
    <RatesContext.Provider
      value={[
        ['CZK', 26.623],
        ['DKK', 7.4557],
        ['GBP', 0.89685],
        ['HUF', 344.90],
      ]}
    >
      <CurrencyPicker
        onChange={() => {}}
      />
    </RatesContext.Provider>
  );
  const options = screen.getAllByRole('option')
  expect(options.length).toEqual(4)
})

test('selects the option matching the passed value', () => {
  render(
    <RatesContext.Provider
      value={[
        ['CZK', 26.623],
        ['DKK', 7.4557],
        ['GBP', 0.89685],
        ['HUF', 344.90],
      ]}
    >
      <CurrencyPicker
        onChange={() => {}}
        value="HUF"
      />
    </RatesContext.Provider>
  );
  const selector = screen.getByRole('combobox')
  expect(selector.value).toEqual('HUF')
})

test('selecting an option calls the provided change handler', () => {
  const spy = jest.fn()

  render(
    <RatesContext.Provider
      value={[
        ['CZK', 26.623],
        ['DKK', 7.4557],
        ['GBP', 0.89685],
        ['HUF', 344.90],
      ]}
    >
      <CurrencyPicker
        onChange={spy}
        value="HUF"
      />
    </RatesContext.Provider>
  );

  const selector = screen.getByRole('combobox')
  userEvent.selectOptions(selector, ['HUF'])

  expect(spy).toHaveBeenCalled()
})

