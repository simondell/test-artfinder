import React from 'react'

export type Rate = [string, number]

export function getRate (denomenation: string, rates: Rate[]) {
  const rate = rates.find(rate => rate[0] === denomenation);

  if(!rate) return 0

  return rate[1]
}

export default React.createContext([
  ['USD', 1.1250],
  ['HUF', 344.90],
] as Rate[])