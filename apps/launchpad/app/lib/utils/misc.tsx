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

  // Count leading zeros after decimal
  const leadingZeros =
    numBalance < 1 ? -Math.floor(Math.log10(numBalance)) - 1 : 0

  // Show leading zeros + 2 significant digits
  return numBalance.toFixed(leadingZeros + 2)
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

export function combineHeaders(
  ...headers: Array<ResponseInit['headers'] | null | undefined>
) {
  const combined = new Headers()
  for (const header of headers) {
    if (!header) {
      continue
    }
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value)
    }
  }
  return combined
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str
  }
  return `${str.slice(0, maxLength)}...`
}

export function toRoman(num: number): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return roman[num - 1] || num.toString()
}

export const truncateNumber = (balance: string | number): string => {
  const n = Number(
    typeof balance === 'string' ? balance.replace(/,/g, '') : balance,
  )
  if (isNaN(n)) {
    console.error('Invalid number input:', balance)
    return 'Invalid number'
  }
  const format = (num: number, divisor: number, suffix: string) =>
    `${(num / divisor).toFixed(2).replace(/\.?0+$/, '')}${suffix}`

  if (n >= 1000000000) {
    return format(n, 1000000000, 'B')
  }
  if (n >= 1000000) {
    return format(n, 1000000, 'M')
  }
  if (n >= 1000) {
    return format(n, 1000, 'K')
  }
  return n.toFixed(2).replace(/\.?0+$/, '')
}

export function toRomanNumeral(num: number): string {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ]

  let result = ''
  let remaining = num

  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }

  return result
}
