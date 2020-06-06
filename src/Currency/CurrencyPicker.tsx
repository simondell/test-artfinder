import React from 'react'
import {
  CurrencyNames
} from './Constants'
import Select, {
  SelectPair
} from '../Shared/Select/Select'
import RatesContext, {
  Rate
} from '../Rates/RatesContext'

export interface Props {
  onChange: Function;
  value?: string;
}

export default (props: Props) => {
  const rates = React.useContext(RatesContext)
  const pairs = rates.reduce((pairs, rate: Rate) => {
    const [code] = rate
    const knownCodes = Object.keys(CurrencyNames)

    if(!knownCodes.includes(code)) return pairs

    const newPair: SelectPair = [code, CurrencyNames[code]]
    return [
      ...pairs,
      newPair
    ]
  }, [] as SelectPair[])

  return (
    <Select
      valueLabels={pairs}
      value={props.value}
    />
  )
}