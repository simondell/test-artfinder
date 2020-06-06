import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import RateComparison from './RateComparison';

test('renders a currency conversion label', () => {
  render(
    <RateComparison
      comparison="JPY"
      denomination="USD"
    />
  );

  const ratio = screen.getByText(/1 USD = \d+\.\d+ JPY/);
  expect(ratio).toBeInTheDocument();
});

test.each([
  ['USD', 'JPY'],
  ['GBP', 'JPY'],
  ['GBP', 'EUR'],
  ['USD', 'GBP'],
])('renders "1 %s = nn.nn %s"', (den, com) => {
  render(
    <RateComparison
      comparison={com}
      denomination={den}
    />
  );

  const test = new RegExp(`1 ${den} = \\d+\\.\\d+ ${com}`)
  const ratio = screen.getByText(test);
  expect(ratio).toBeInTheDocument();
});
