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
  getPrivyUserById,
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
    return null
  }
  try {
    // get User returns a partial user object, so we need to check for the wallet address
    const partialUser = await getPrivyUserById(privyIdToken)
    const user = await privyClient.getUserById(partialUser.id)
    logger('Successfully fetched getUserById', user.wallet?.address)
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
  const isOAuth = await isOAuthInProgress(request.url)
  if (isOAuth) {
    // Do not redirect or interrupt the flow.
    return
  } else if (!accessToken) {
    const redirectUrl = await getRedirectToUrl(request, path, options)
    throw redirect(redirectUrl)
  }
  logger('Hit end of handlePrivyRedirect', accessToken, isOAuth)
  return
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
