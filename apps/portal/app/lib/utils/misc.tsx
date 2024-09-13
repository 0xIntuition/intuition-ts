import React from 'react'

import { Icon, IconName, Text, Theme } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { SubmitFunction } from '@remix-run/react'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'app/consts'
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

const formatNumber = (n: number, precision: number): string => {
  if (Math.abs(n) < 1e-10) {
    return '0'
  }

  let result = n.toFixed(precision)

  // Remove trailing zeros after the decimal point
  result = result.replace(/\.?0+$/, '')

  // If all digits after the decimal are zero, remove the decimal point
  if (result.indexOf('.') !== -1 && !result.split('.')[1]) {
    result = result.split('.')[0]
  }

  return result
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

export interface DataErrorDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

export const DataErrorDisplay = ({
  message = 'An error occured',
  children,
}: DataErrorDisplayProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-6 theme-border border-destructive/50 rounded-lg min-h-52 bg-destructive/10">
      <Icon
        name={IconName.triangleExclamation}
        className="w-12 h-12 mb-4 text-destructive"
      />
      <Text variant="caption" className="text-foreground mb-5">
        {message}
      </Text>
      {children}
    </div>
  )
}

interface LoadMoreParams {
  currentPage: number
  pagination: {
    limit: number
  }
  sortBy: string
  direction: string
  submit: SubmitFunction
}

export function loadMore({
  currentPage,
  pagination,
  sortBy,
  direction,
  submit,
}: LoadMoreParams): () => void {
  return () => {
    const nextPage = currentPage + 1
    const effectiveLimit = nextPage * pagination.limit
    submit(
      {
        page: nextPage.toString(),
        limit: pagination.limit.toString(),
        effectiveLimit: effectiveLimit.toString(),
        sortBy,
        direction,
      },
      { method: 'get', replace: true },
    )
  }
}

// atom helpers
export const getAtomImage = (atom: IdentityPresenter | null | undefined) => {
  if (!atom) {
    return ''
  }
  return atom?.user?.image ?? atom?.image ?? ''
}

export const getAtomLabel = (atom: IdentityPresenter | null | undefined) => {
  if (!atom) {
    return '?'
  }
  return (
    atom.user?.display_name ??
    atom.user?.ens_name ??
    atom.display_name ??
    atom.identity_id ??
    ''
  )
}

export const getAtomDescription = (
  atom: IdentityPresenter | null | undefined,
) => {
  return atom?.user?.description ?? atom?.description ?? ''
}

export const getAtomIpfsLink = (atom: IdentityPresenter | null | undefined) => {
  if (!atom) {
    return ''
  }
  if (atom.is_user === true) {
    return `${BLOCK_EXPLORER_URL}/address/${atom.identity_id}`
  }
  if (atom.identity_id?.startsWith('https')) {
    return atom.identity_id
  }
  return `${IPFS_GATEWAY_URL}/${atom.identity_id?.replace('ipfs://', '')}`
}

export const getAtomLink = (
  atom: IdentityPresenter | null | undefined,
  readOnly: boolean = false,
) => {
  if (!atom) {
    return ''
  }
  if (atom.is_user === true) {
    return readOnly
      ? `${PATHS.READONLY_PROFILE}/${atom.identity_id}`
      : `${PATHS.PROFILE}/${atom.identity_id}`
  }
  return readOnly
    ? `${PATHS.READONLY_IDENTITY}/${atom.id}`
    : `${PATHS.IDENTITY}/${atom.id}`
}

export const getAtomId = (atom: IdentityPresenter) => {
  if (!atom) {
    return ''
  }
  if (atom.is_user === true) {
    return atom.user?.ens_name ?? atom.user?.wallet
  }
  return atom.identity_id
}

export const calculatePointsFromFees = (totalProtocolFees: string): number => {
  const feesInEth = formatUnits(BigInt(totalProtocolFees), 18)
  const pointsPerEth = 10000000
  return Number(feesInEth) * pointsPerEth
}
