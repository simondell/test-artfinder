import React from 'react'

export interface Props {
  comparison: string;
  denomination: string;
}

export default (props: Props) =>
  <p>1 {props.denomination} = 0.8 {props.comparison}</p>