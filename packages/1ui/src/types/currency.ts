export const Currency = {
  ETH: 'ETH',
} as const

export type CurrencyType = (typeof Currency)[keyof typeof Currency]
