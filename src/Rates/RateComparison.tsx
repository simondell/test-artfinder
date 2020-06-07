import React from 'react'
import RatesContext, {
  getRate,
  Rate
} from '../Rates/RatesContext'

export interface Props {
  comparison: string;
  denomination: string;
}

export default (props: Props) => {
  const rates = React.useContext(RatesContext);

  const denominationRate = getRate(props.denomination, rates);
  const comparisonRate = getRate(props.comparison, rates);
  const ratio = comparisonRate / denominationRate;

  const ratioDisplay = (ratio === 1 || ratio === 0)
    ? `${ratio}.0000`
    : (new String(ratio)).slice(0, 6).padEnd(6, '0')

  const comparison = `1 ${props.denomination} = ${ratioDisplay} ${props.comparison}`

  return (
    <p>{comparison}</p>
  )
}
