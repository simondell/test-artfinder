import React from 'react'

interface Props {
  pairs: [[string, string]]
  value?: string
}

export default (props: Props) =>
  <select
    value={props.value}
  >
  {
    props.pairs.map(([key, value]) =>
      <option
        key={`currency-${key}`}
        value={key}
      >
        {value}
      </option>
    )
  }
  </select>