import { formatNumber } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

export function invariant(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  condition: any,
  message: string | (() => string),
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === 'function' ? message() : message)
  }
}

export function getAuthHeaders(apiKey?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (apiKey) {
    headers['x-api-key'] = apiKey
  }

  return headers
}

export const formatBalance = (
  balance: bigint | string | number,
  decimals = 18,
): string => {
  const formattedBalance = formatUnits(BigInt(balance), decimals)
  const numBalance = +formattedBalance

  if (numBalance === 0 || numBalance < 1e-10) {
    return '0'
  }

  for (let i = 4; i <= 10; i++) {
    const formatted = formatNumber(numBalance, i)
    if (formatted !== '0') {
      return formatted
    }
  }

  return '0'
}

export const formatDisplayBalance = (
  balance: number | bigint,
  maxInt?: number,
) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: maxInt ?? 6,
  }).format(balance)

export function calculatePercentageOfTvl(
  positionAssets: string,
  totalAssets: string,
) {
  const position = +formatUnits(BigInt(positionAssets), 18)
  const total = +formatUnits(BigInt(totalAssets ?? '0'), 18)
  const percentage = ((position / total) * 100).toFixed(2)
  return percentage
}

export function calculateTotalPages(total: number, limit: number) {
  return Math.ceil(total / limit)
}

export const renderTooltipIcon = (icon: React.ReactNode | string) => {
  if (typeof icon === 'string') {
    return <img src={icon} className="h-4 w-4" alt="Icon" />
  }
  return icon
}
