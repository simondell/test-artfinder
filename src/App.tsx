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

type Rate = [CurrencyCodes, number]

function App() {
  let amounts: Amount[] = [
    { denomination: CurrencyCodes.USD, value: 0 },
    { denomination: CurrencyCodes.JPY, value: 0 },
  ]

  const [rates, setRates] = React.useState<Rate[]>([])

  React.useEffect(() => {
    setRates([
      [CurrencyCodes['USD'], 1.1250],
      [CurrencyCodes['JPY'], 122.48],
      [CurrencyCodes['BGN'], 1.9558],
      [CurrencyCodes['CZK'], 26.623],
      [CurrencyCodes['DKK'], 7.4557],
      [CurrencyCodes['GBP'], 0.89685],
      [CurrencyCodes['HUF'], 344.90],
    ])
  }, [setRates])

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
