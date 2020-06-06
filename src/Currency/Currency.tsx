import React from 'react'
import {
  CurrencyCodes,
  CurrencyNames,
} from './Constants'
import './Currency.css'

interface Props {
  denomination: CurrencyCodes
  value: number;
}

export default (props: Props) => {
  return (
    <div
      className="currency"
    >
      <select
        value={props.denomination}
      >
      {
        Object.keys(CurrencyNames).map(currencyKey => {
          const label = CurrencyNames[currencyKey as CurrencyCodes]

          // TODO fill out all the names
          if(!label) return null

          return (
            <option
              key={`currency-${currencyKey}`}
              // selected={currencyKey === props.denomination}
              value={currencyKey}
            >
              {label}
            </option>
          )
        })
      }
      </select>
      <input
        name={`currency-value-${props.denomination}`}
        type="text"
        value={props.value}
      />
    </div>
  )
}
