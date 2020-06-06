import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
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

// test.each([
//   ['USD', 'JPY'],
//   ['GBP', 'JPY'],
//   ['GBP', 'EUR'],
//   ['USD', 'GBP'],
// ])('renders "1 %s = nn.nn %s"', (den, com) => {
//   render(
//     <CurrencyPicker
//       comparison={com}
//       denomination={den}
//     />
//   );

//   const test = new RegExp(`1 ${den} = \\d+\\.\\d+ ${com}`)
//   const ratio = screen.getByText(test);
//   expect(ratio).toBeInTheDocument();
// });
