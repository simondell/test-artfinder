import React from 'react';
import MoneyBoard from './Currency/MoneyBoard';
import RatesContext, {
  Rate
} from './Rates/RatesContext' 
import './App.css';

interface Amount {
  denomination: string;
  value: number;
}

function App() {
  const FIRST = 0;
  const SECOND = 1;

  let amounts: Amount[] = [
    { denomination: 'USD', value: 0 },
    { denomination: 'JPY', value: 0 },
  ]

  const [rates, setRates] = React.useState<Rate[]>([])

  React.useEffect(() => {
    setRates([
      ['USD', 1.1250],
      ['JPY', 122.48],
      ['BGN', 1.9558],
      ['CZK', 26.623],
      ['DKK', 7.4557],
      ['GBP', 0.89685],
      ['HUF', 344.90],
    ])
  }, [])

  return (
    <RatesContext.Provider value={rates}>
      <div className="App">
        <header className="App-header">
          <h1>Currency Converter</h1>
        </header>

        <section
          className="converters"
        >
          <MoneyBoard
            comparison={amounts[SECOND].denomination}
            denomination={amounts[FIRST].denomination}
            value={amounts[FIRST].value}
          />

          <span>to</span>

          <MoneyBoard
            comparison={amounts[FIRST].denomination}
            denomination={amounts[SECOND].denomination}
            value={amounts[SECOND].value}
          />
        </section>
      </div>
    </RatesContext.Provider>
  );
}

export default App;
