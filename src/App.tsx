import React from 'react';
import Currency from './Currency/Currency';
import RatesContext from './Rates/RatesContext'
import './App.css';

interface Amount {
  denomination: CurrencyCodes;
  value: number;
}

function App() {
  let amounts: Amount[] = [
    { denomination: 'USD', value: 0 },
    { denomination: 'JPY', value: 0 },
  ]

  const rates = [
    ['USD', 1.1250],
    ['JPY', 122.48],
    ['BGN', 1.9558],
    ['CZK', 26.623],
    ['DKK', 7.4557],
    ['GBP', 0.89685],
    ['HUF', 344.90],
  ]

  return (
    <div className="App">
      <RatesContext.Provider
        value={rates}
      >
        <header className="App-header">
          <h1>Currency Converter</h1>
        </header>

        <section
          className="converters"
        >
          <Currency
            denomination={amounts[0].denomination}
            value={amounts[0].value}
          />

          <span>to</span>

          <Currency
            denomination={amounts[1].denomination}
            value={amounts[1].value}
          />
        </section>
      </RatesContext.Provider>
    </div>
  );
}

export default App;
