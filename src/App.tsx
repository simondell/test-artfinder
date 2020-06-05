import React from 'react';
import Currency from './Currency/Currency';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>

      <section
        className="converters"
      >
        <Currency
          denomination={'USD'}
          value={1}
        />

        <span>to</span>

        <Currency
          denomination={'USD'}
          value={1}
        />
      </section>
    </div>
  );
}

export default App;
