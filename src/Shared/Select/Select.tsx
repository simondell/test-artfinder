import React from 'react'
import './Select.css'

export type SelectPair = [string, string]

interface Props {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  valueLabels: SelectPair[];
  value?: string;
}

export default (props: Props) =>
  <select
    onChange={props.onChange}
    value={props.value}
  >
  {
    props.valueLabels.map(([value, label]) =>
      <option
        key={`currency-${value}`}
        value={value}
      >
        {label}
      </option>
    )
  }
  </select>
;
