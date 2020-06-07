import React from 'react';
import AmountBoard from './Amounts/AmountBoard';
import RatesContext, {
  Rate
} from './Rates/RatesContext' 
import './App.css';

interface Amount {
  denomination: string;
  value: number;
}

// TODO enum instead?
enum Indeces {
  FIRST,
  SECOND,
}

// TODO in a bigger app, genericise actions and types
export enum ActionTypes {
  SET_CURRENCY,
  SET_VALUE,
  // SET_RATES,
};

// TODO this one action type handles all three actions. In a real app this would
//    be three different types (and probably use redux-actions, redux-toolkit or )
interface Action {
  denomination?: string;
  index: Indeces;
  type: ActionTypes;
  value?: number;
};

export function manageAmounts (amounts: Amount[], action: Action): Amount[] {
  const { index } = action

  switch (action.type) {
    case ActionTypes.SET_CURRENCY: {
      const { denomination = amounts[index].denomination } = action
      return [
        ...amounts.slice(0, index),
        { ...amounts[index], denomination },
        ...amounts.slice(index + 1)
      ]
    }

    case ActionTypes.SET_VALUE: {
      const { value = amounts[index].value } = action
      return [
        ...amounts.slice(0, index),
        { ...amounts[index], value },
        ...amounts.slice(index + 1)
      ]
    }

    default:
      return amounts;
  }
}

function App() {
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

  const [amounts, dispatch] = React.useReducer(manageAmounts, [
    { denomination: 'USD', value: 0 },
    { denomination: 'JPY', value: 0 },
  ])

  function setCurrency (index: Indeces) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        denomination: e.target.value,
        index,
        type: ActionTypes.SET_CURRENCY,
      })
    }
  }

  function setValue (index: Indeces) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        index,
        type: ActionTypes.SET_VALUE,
        value: parseFloat(e.target.value),
      })
    }
  }

  return (
    <RatesContext.Provider value={rates}>
      <div className="App">
        <header className="App-header">
          <h1>Currency Converter</h1>
        </header>

        <section
          className="converters"
        >
          <AmountBoard
            onChangeCurrency={setCurrency(Indeces.FIRST)}
            onChangeValue={setValue(Indeces.FIRST)}
            comparison={amounts[Indeces.SECOND].denomination}
            denomination={amounts[Indeces.FIRST].denomination}
            value={amounts[Indeces.FIRST].value}
          />

          <span>to</span>

          <AmountBoard
            onChangeCurrency={setCurrency(Indeces.SECOND)}
            onChangeValue={setValue(Indeces.SECOND)}
            comparison={amounts[Indeces.FIRST].denomination}
            denomination={amounts[Indeces.SECOND].denomination}
            value={amounts[Indeces.SECOND].value}
          />
        </section>
      </div>
    </RatesContext.Provider>
  );
}

export default App;
