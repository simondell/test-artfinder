import React from 'react';
import AmountBoard from './Amounts/AmountBoard';
import RatesContext, {
  getRate,
  Rate,
} from './Rates/RatesContext' 
import './App.css';

// NOTE I have used lodash and ramda to accomplish what these do.
//    In a full project I'd likely use such a library.
import set from './Shared/Helpers/set'
import updateAt from './Shared/Helpers/updateAt'

interface Amount {
  denomination: string;
  value: number;
}

// TODO enum instead?
enum Indeces {
  FIRST,
  SECOND,
}

// TODO these action types are not easily maintainable
export enum AmountsActionTypes {
  SET_CURRENCY = 'SET_CURRENCY',
  SET_VALUE = 'SET_VALUE',
};

interface AmountsAction {
  index: Indeces;
  denomination?: string;
  value?: number;
  type: AmountsActionTypes;
}

function setCurrency (index: Indeces, denomination: string): AmountsAction {
  return {
    denomination,
    index,
    type: AmountsActionTypes.SET_CURRENCY,
  }
}

function setValue (index: Indeces, value: number): AmountsAction {
  return {
    index,
    type: AmountsActionTypes.SET_VALUE,
    value,
  }
}


export enum RatesActionTypes {
  SET_RATES = 'SET_RATES',
};

interface RatesAction {
  type: RatesActionTypes
  rates: Rate[]
}

function setRates (rates: Rate[]): RatesAction {
  return {
    rates,
    type: RatesActionTypes.SET_RATES
  }
}

export function manageAmounts (state: ConverterState, action: AmountsAction): ConverterState {
  const {
    amounts,
    rates,
  } = state

  const { index } = action

  switch (action.type) {
    case AmountsActionTypes.SET_CURRENCY: {
      const {
        denomination: previousDenomenation,
        value: previousValue,
      } = amounts[index]
      const { denomination = previousDenomenation } = action;

      const previousRate = getRate(previousDenomenation, rates);
      const denominationRate = getRate(denomination, rates);
      const ratio = denominationRate / previousRate;
      const value = previousValue * ratio

      const updated = { denomination, value }
      const updatedAmounts = updateAt<Amount>(index, updated, amounts);

      return set<ConverterState>('amounts', updatedAmounts, state)
    }

    case AmountsActionTypes.SET_VALUE: {
      const updated = set<Amount>('value', action.value, amounts[index])
      // const { value = amounts[index].value } = action;
      // const newAmount = set<Amount>('value', value, amounts[index]);
      // return updateAt<Amount>(index, newAmount, amounts);

      const other = index == Indeces.FIRST
        ? amounts[Indeces.SECOND]
        : amounts[Indeces.FIRST]

      const {
        denomination: otherDenomenation,
        value: otherValue,
      } = other

      const otherRate = getRate(otherDenomenation, rates);
      const rate = getRate(updated.denomination, rates);
      const ratio = otherRate / rate;
      const newOtherValue = otherValue * ratio

      const updatedOther = set<Amount>('value', newOtherValue, other)

      const newAmounts = [updated, updatedOther]
      return set<ConverterState>('amounts', newAmounts, state)
    }

    default:
      return state;
  }
}

interface ConverterState {
  amounts: Amount[],
  rates: Rate[]
}

const defaultState: ConverterState = {
  amounts: [
    { denomination: 'HOT', value: 1 },
    { denomination: 'DOG', value: 1 },
  ],
  rates: [
    ['DOG', 5],
    ['HOT', 0.23],
  ],
}

export function rootReducer (state = defaultState, action: AmountsAction | RatesAction ): ConverterState {
  switch (action.type) {
    case RatesActionTypes.SET_RATES:
      const { rates } = action as RatesAction
      return set<ConverterState>('rates', rates, state);

    case AmountsActionTypes.SET_CURRENCY: 
    case AmountsActionTypes.SET_VALUE: {
      return manageAmounts(state, action as AmountsAction);
    }

    default:
      return state;
  }
}

function App() {
  const [{ amounts, rates }, dispatch] = React.useReducer(rootReducer, defaultState)

  React.useEffect(() => {
    const rates: Rate[] = [
      ['USD', 1.1250],
      ['JPY', 122.48],
      ['BGN', 1.9558],
      ['CZK', 26.623],
      ['DKK', 7.4557],
      ['GBP', 0.89685],
      ['HUF', 344.90],
    ]
    dispatch(setRates(rates))
    dispatch(setCurrency(Indeces.FIRST, rates[0][0]))
    dispatch(setCurrency(Indeces.SECOND, rates[0][0]))
  }, [])

  function onChangeCurrencyFor (index: Indeces) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setCurrency(index, e.target.value))
    }
  }

  function onChangeValueFor (index: Indeces) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setValue(index, parseFloat(e.target.value)))
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
            onChangeCurrency={onChangeCurrencyFor(Indeces.FIRST)}
            onChangeValue={onChangeValueFor(Indeces.FIRST)}
            comparison={amounts[Indeces.SECOND].denomination}
            denomination={amounts[Indeces.FIRST].denomination}
            value={amounts[Indeces.FIRST].value}
          />

          <span>to</span>

          <AmountBoard
            onChangeCurrency={onChangeCurrencyFor(Indeces.SECOND)}
            onChangeValue={onChangeValueFor(Indeces.SECOND)}
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
