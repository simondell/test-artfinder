import React from 'react'
import './Currency.css'

interface Props {
  denomination: string;
  value: number;
}

export default (props: Props) =>
  <div
    className="currency"
  >
    <select>
      <option>USD</option>
      <option>EUR</option>
      <option>GBP</option>
    </select>
    <input
      name={`currency-value-${props.denomination}`}
      type="text"
      value={props.value}
    />
  </div>