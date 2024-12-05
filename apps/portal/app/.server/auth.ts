import { OpenAPI } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { combineHeaders, getAuthHeaders } from '@lib/utils/misc'
import { getRedirectToUrl } from '@lib/utils/redirect'
import { User } from '@privy-io/server-auth'
import { redirect } from '@remix-run/node'
import { RedirectOptions } from 'app/types'

import {
  getPrivyAccessToken,
  getPrivyClient,
  getPrivySessionToken,
  isOAuthInProgress,
  verifyPrivyAccessToken,
} from './privy'

export async function getUserId(request: Request): Promise<string | null> {
  const verifiedClaims = await verifyPrivyAccessToken(request)
  return verifiedClaims?.userId ?? null
}

export async function getUser(request: Request): Promise<User | null> {
  const privyIdToken = getPrivyAccessToken(request)
  const privyClient = getPrivyClient()

  if (!privyIdToken) {
    logger('No Privy ID token found')
    return null
  }

  try {
    // First verify the token is valid
    const verifiedClaims = await verifyPrivyAccessToken(request)
    if (!verifiedClaims) {
      logger('Invalid Privy token')
      return null
    }

    // Then get the full user object directly using the verified user ID
    const user = await privyClient.getUserById(verifiedClaims.userId)
    logger('Successfully fetched user by ID', user.wallet?.address)
    return user
  } catch (error) {
    logger('Error fetching user', error)
    return null
  }
}

export async function getUserWallet(request: Request): Promise<string | null> {
  const user = await getUser(request)
  if (!user) {
    return null
  }
  return user.wallet?.address ?? null
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
    return null
  }

  // First check if we're missing any tokens
  if (!accessToken || !sessionToken) {
    const redirectUrl = await getRedirectToUrl(request, path, options)
    throw redirect(redirectUrl)
  }

  // If we have both tokens, verify the access token
  const verifiedClaims = await verifyPrivyAccessToken(request)
  if (!verifiedClaims) {
    // Token is invalid, redirect to refresh
    const redirectUrl = await getRedirectToUrl(request, path, options)
    throw redirect(redirectUrl)
  }

  // Only return null if we have valid tokens
  return null
}

export async function setupAPI(request: Request) {
  const apiUrl =
    typeof window !== 'undefined' ? window.ENV?.API_URL : process.env.API_URL

  OpenAPI.BASE = apiUrl

  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
}

export function updateClientAPIHeaders(accessToken: string | null) {
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')

  OpenAPI.HEADERS = headers as Record<string, string>
  logger('[SETUP API] -- END')
}
