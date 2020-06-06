import React from 'react';
import Currency from './Currency/Currency';
import {
  CurrencyCodes
} from './Currency/Constants'
import './App.css';

interface Amount {
  denomination: CurrencyCodes;
  value: number;
}

function App() {
  let exchanges: Amount[] = [
    { denomination: CurrencyCodes.JPY, value: 0 },
    { denomination: CurrencyCodes.JPY, value: 0 },
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>

      <section
        className="converters"
      >
        <Currency
          denomination={exchanges[0].denomination}
          value={exchanges[0].value}
        />

        <span>to</span>

        <Currency
          denomination={exchanges[1].denomination}
          value={exchanges[1].value}
        />
      </section>
    </div>
  );
}

export default App;
