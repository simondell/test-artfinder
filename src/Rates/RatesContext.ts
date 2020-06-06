import React from 'react'

export type Rate = [string, number]

export default React.createContext([
  ['USD', 1.1250],
  ['HUF', 344.90],
] as Rate[])