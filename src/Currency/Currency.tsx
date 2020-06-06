import React from 'react'
import { $enum } from "ts-enum-util";

import Currencies from './Constants'
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
    {
      $enum(Currencies).map((label, code) => {
        // TODO fill out all the names
        if(!label) return null

        return (
          <option
            key={`currency-${code}`}
            value={code}
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