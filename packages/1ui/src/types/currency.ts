export const Currency = {
  ETH: 'ETH',
}

export type CurrencyType = (typeof Currency)[keyof typeof Currency]
