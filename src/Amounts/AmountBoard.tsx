import React from 'react'
import RateComparison, {
  Props as RateComparisonProps
} from '../Rates/RateComparison'
import CurrencyPicker from '../Currency/CurrencyPicker'
import './AmountBoard.css'

interface Props extends RateComparisonProps {
  onChangeCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        onChange={props.onChangeValue}
        name={`currency-value-${props.denomination}`}
        type="text"
        value={isNaN(props.value) ? '' : props.value }
      />
    </div>
  )
}
