import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import RateComparison from './RateComparison';
import RatesContext from '../Rates/RatesContext'

test.each([
  ['USD', '0.7500', 'JPY'],
  ['GBP', '1.5000', 'JPY'],
  ['GBP', '0.2500', 'BGN'],
  ['USD', '0.5000', 'GBP'],
])('renders "1 %s = %s %s"', (den, rate, com) => {
  render(
    <RatesContext.Provider
      value={[
        ['BGN', 0.5],
        ['GBP', 2],
        ['JPY', 3],
        ['USD', 4],
      ]}
    >
      <RateComparison
        comparison={com}
        denomination={den}
      />
    </RatesContext.Provider>
  );
  const hook = new RegExp(`1 ${den}`)
  const ratio = screen.getByText(hook);

  const test = new RegExp(`1 ${den} = ${rate} ${com}`)
  expect(ratio.textContent).toMatch(test)
});
