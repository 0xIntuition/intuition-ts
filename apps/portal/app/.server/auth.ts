import { OpenAPI } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { combineHeaders, getAuthHeaders } from '@lib/utils/misc'
import { getRedirectToUrl } from '@lib/utils/redirect'
import { User } from '@privy-io/server-auth'
import { redirect } from '@remix-run/node'
import { RedirectOptions } from 'types'

import {
  getPrivyAccessToken,
  getPrivySessionToken,
  getPrivyUserById,
  isOAuthInProgress,
  verifyPrivyAccessToken,
} from './privy'

export async function getUserId(request: Request): Promise<string | null> {
  const verifiedClaims = await verifyPrivyAccessToken(request)
  return verifiedClaims?.userId ?? null
}

export async function getUser(request: Request): Promise<User | null> {
  const userId = await getUserId(request)
  return userId ? await getPrivyUserById(userId) : null
}

export async function getUserWallet(request: Request): Promise<string | null> {
  const user = await getUser(request)
  return user?.wallet?.address ?? null
}

export async function requireUserId(
  request: Request,
  options: RedirectOptions = {},
): Promise<string> {
  const userId = await getUserId(request)
  if (!userId) {
    throw await handlePrivyRedirect({ request, options })
  }
  return userId
}

export async function requireUser(
  request: Request,
  options: RedirectOptions = {},
): Promise<User> {
  const user = await getUser(request)
  if (!user) {
    throw await handlePrivyRedirect({ request, options })
  }
  return user
}

export async function requireUserWallet(
  request: Request,
  options: RedirectOptions = {},
): Promise<string> {
  const wallet = await getUserWallet(request)
  if (!wallet) {
    throw await handlePrivyRedirect({ request, options })
  }
  return wallet
}

export async function requireAnonymous(
  request: Request,
  options: RedirectOptions = {},
): Promise<void> {
  const userId = await getUserId(request)
  if (userId) {
    throw await handlePrivyRedirect({ request, options })
  }
}

export async function logout(
  {
    redirectTo = '/',
  }: {
    redirectTo?: string
  },
  responseInit?: ResponseInit,
) {
  throw redirect(redirectTo, {
    ...responseInit,
    headers: combineHeaders(responseInit?.headers),
  })
}

export async function handlePrivyRedirect({
  request,
  path = '/',
  options = {},
}: {
  request: Request
  path?: string
  options?: RedirectOptions
}) {
  const accessToken = getPrivyAccessToken(request)
  const sessionToken = getPrivySessionToken(request)
  const isOAuth = await isOAuthInProgress(request.url)
  if (isOAuth) {
    // Do not redirect or interrupt the flow.
    return
  } else if (!accessToken || !sessionToken) {
    const redirectUrl = await getRedirectToUrl(request, path, options)
    throw redirect(redirectUrl)
  }
  logger('Hit end of handlePrivyRedirect', accessToken, sessionToken, isOAuth)
  return
}

export async function setupAPI(request: Request) {
  logger('[SETUP API] -- START')
  const apiUrl =
    typeof window !== 'undefined' ? window.ENV?.API_URL : process.env.API_URL

  OpenAPI.BASE = apiUrl
  const accessToken = getPrivyAccessToken(request)
  logger('[SETUP API] Access Token:', truncateToken(accessToken))
  const headers = getAuthHeaders(accessToken ?? '')
  logger('[SETUP API] Headers:', truncateHeaders(headers))

  if (typeof window !== 'undefined') {
    // Client-side
    const accessToken = localStorage.getItem('privy:token')
    const headers = getAuthHeaders(accessToken || '')
    OpenAPI.HEADERS = headers as Record<string, string>
  } else if (request) {
    // Server-side
    const accessToken = getPrivyAccessToken(request)
    const headers = getAuthHeaders(accessToken || '')
    OpenAPI.HEADERS = headers as Record<string, string>
  }
  console.log('[SETUP API] -- END', OpenAPI.HEADERS)
}

export function updateClientAPIHeaders(accessToken: string | null) {
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')

  OpenAPI.HEADERS = headers as Record<string, string>
  logger('[SETUP API] -- END')
}

export function logAPI() {
  logger('OpenAPI Base', JSON.stringify(OpenAPI.BASE, null, 2))
  logger('OpenAPI Headers', JSON.stringify(OpenAPI.HEADERS, null, 2))
}

// these are temporary helpers to not expose access token to the logs
function truncateToken(token: string | null): string {
  if (!token) {
    return 'null'
  }
  return token.length > 8 ? `${token.slice(0, 4)}...${token.slice(-4)}` : token
}

function truncateHeaders(
  headers: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, truncateToken(value)]),
  )
}
