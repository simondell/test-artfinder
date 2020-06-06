import React from 'react'
import {
  CurrencyCodes,
  CurrencyNames,
} from './Constants'
import RateComparison from '../Rates/RateComparison'
import RatePicker from '../Rates/RatePicker'
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
      <RateComparison />
      <RatePicker />
      <input
        name={`currency-value-${props.denomination}`}
        type="text"
        value={props.value}
      />
    </div>
  )
}
