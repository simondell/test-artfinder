import React from 'react'

export type Rate = [string, number]

export function getRate (denomenation: string, rates: Rate[]) {
  const rate = rates.find(rate => rate[0] === denomenation);

  if(!rate) return 0

  return rate[1]
}

// TODO I'd really like to index these by the rate name string
//   but TypeScript seems determined to make that tricky for me.
//   I know this is a flaw in my understanding of what TS does.
export default React.createContext([
  ['USD', 1.1250],
  ['HUF', 344.90],
] as Rate[])