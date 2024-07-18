import React from 'react'

import { Theme } from '@0xintuition/1ui'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatUnits } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const themes: Array<Theme> = Object.values(Theme)

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themes.includes(value as Theme)
}

/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Error} if condition is falsey
 */
export function invariant(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  condition: any,
  message: string | (() => string),
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === 'function' ? message() : message)
  }
}

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') {
    return error
  }
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }
  console.error('Unable to get error message for error', error)
  return 'Unknown Error'
}

export function pascalCaseString(str: string): string {
  return str.replace(/^[a-z]/, (chr) => chr.toUpperCase())
}

export function sliceString(
  id: string | undefined,
  startNum: number,
  endNum?: number,
  maxLength?: number,
) {
  if (id && maxLength && id.length <= maxLength) {
    return id
  }

  if (endNum === undefined) {
    endNum = startNum
  }
  return `${id?.slice(0, startNum)}...${id?.slice(-endNum)}`
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str
  }
  return `${str.slice(0, maxLength)}...`
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
}

export function parseMessage(message: string) {
  const parsedMessage = message.charAt(0).toUpperCase() + message.slice(1)
  return parsedMessage
}

export function getAuthHeaders(token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  if (!token) {
    headers['x-api-key'] = process.env.API_KEY as string
  }

  return headers
}

// delay helper for use with mocking async requests
export function delay(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Not working
export function useUpdateQueryStringValueWithoutNavigation(
  queryKey: string,
  queryValue: string,
) {
  React.useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search)
    const oldQuery = currentSearchParams.get(queryKey) ?? ''
    if (queryValue === oldQuery) {
      return
    }

    if (queryValue) {
      currentSearchParams.set(queryKey, queryValue)
    } else {
      currentSearchParams.delete(queryKey)
    }
    const newUrl = [window.location.pathname, currentSearchParams.toString()]
      .filter(Boolean)
      .join('?')
    // alright, let's talk about this...
    // Normally with remix, you'd update the params via useSearchParams from react-router-dom
    // and updating the search params will trigger the search to update for you.
    // However, it also triggers a navigation to the new url, which will trigger
    // the loader to run which we do not want because all our data is already
    // on the client and we're just doing client-side filtering of data we
    // already have. So we manually call `window.history.pushState` to avoid
    // the router from triggering the loader.
    window.history.replaceState(null, '', newUrl)
  }, [queryKey, queryValue])
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

export const formatBalance = (
  balance: bigint | string | number,
  decimals = 18,
  precision?: number,
): string => {
  if (!balance) {
    return '0'
  }

  const n = Number(balance.toString()) / 10 ** decimals
  let result: string

  if (n > 0 && n < 1) {
    result = n.toLocaleString(undefined, {
      minimumFractionDigits: precision ?? 4,
      maximumFractionDigits: precision ?? 4,
    })
  } else if (n < 0 && n > -1) {
    result = n.toLocaleString(undefined, {
      minimumFractionDigits: precision ?? 4,
      maximumFractionDigits: precision ?? 4,
    })
  } else {
    result = n.toLocaleString(undefined, {
      minimumFractionDigits: precision ?? 2,
      maximumFractionDigits: precision ?? 2,
    })
  }

  if (result.includes('.')) {
    result = result.replace(/\.?0+$/, '')
  }

  return result
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

// this replaces the node module `crypto` which is causing issues (known issue)
// the polyfill was also causing issues

export function getRandomBytes(size: number) {
  if (
    typeof window !== 'undefined' &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    return window.crypto.getRandomValues(new Uint8Array(size))
  }
  throw new Error(
    'Secure random bytes generation is not supported in this environment',
  )
}

export function calculatePercentageGain(
  delta: number,
  totalValue: number,
): number {
  const originalValue = totalValue - delta
  if (originalValue === 0) {
    return 0
  }
  return (delta / originalValue) * 100
}

export function pluralize(
  count: number,
  singular: string,
  plural: string = `${singular}s`,
): string {
  return `${count} ${count === 1 ? singular : plural}`
}

export const truncateNumber = (balance: string | number): string => {
  const n = Number(
    typeof balance === 'string' ? balance.replace(/,/g, '') : balance,
  )
  if (isNaN(n)) {
    console.error('Invalid number input:', balance)
    return 'Invalid number'
  }
  if (n >= 1000000000) {
    return `${(n / 1000000000).toFixed(2).replace(/\.0$/, '')}B`
  }
  if (n >= 1000000) {
    return `${(n / 1000000).toFixed(2).replace(/\.0$/, '')}M`
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(2).replace(/\.0$/, '')}K`
  }
  return n.toFixed(2)
}
