import React from 'react'
import RateComparison, {
  Props as RateComparisonProps
} from '../Rates/RateComparison'
import CurrencyPicker from './CurrencyPicker'
import './MoneyBoard.css'

interface Props extends RateComparisonProps {
  onChangeCurrency: Function;
  value: number;
}

export default (props: Props) => {
  return (
    <div
      className="currency"
    >
      <RateComparison
        comparison={props.comparison}
        denomination={props.denomination}
      />
      <CurrencyPicker
        onChange={props.onChangeCurrency}
        value={props.denomination}
      />
      <input
        name={`currency-value-${props.denomination}`}
        type="text"
        value={props.value}
      />
    </div>
  )
}
