import React from 'react'

export type SelectPair = [string, string]

interface Props {
  valueLabels: SelectPair[]
  value?: string
}

export default (props: Props) =>
  <select
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