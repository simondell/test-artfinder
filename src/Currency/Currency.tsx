import React from 'react'
import RateComparison from '../Rates/RateComparison'
import CurrencyPicker from './CurrencyPicker'
import './Currency.css'

interface Props {
  denomination: string
  value: number;
}

export default (props: Props) => {
  return (
    <div
      className="currency"
    >
      <RateComparison />
      <CurrencyPicker />
      <input
        name={`currency-value-${props.denomination}`}
        type="text"
        value={props.value}
      />
    </div>
  )
}
