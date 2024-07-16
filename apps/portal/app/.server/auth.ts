import { combineHeaders, getAuthHeaders } from '@lib/utils/misc'
import { redirect } from '@remix-run/node'
import {
  getPrivyAccessToken,
  getPrivySessionToken,
  getPrivyUserById,
  isOAuthInProgress,
  verifyPrivyAccessToken,
} from '@server/privy'
import { RedirectTo } from 'types/navigation'

import logger from '@lib/utils/logger';
import { OpenAPI } from '@0xintuition/api';
import { getRedirectToUrl } from '@lib/utils/redirect';

const DEFAULT_REDIRECT_URL = '/login'

export async function getUserId(request: Request) {
  const verifiedClaims = await verifyPrivyAccessToken(request)
  if (!verifiedClaims) {
    return null
  }
  return verifiedClaims.userId
}

export async function getUser(
  request: Request,
) {
  const userId = await getUserId(request)
  if (!userId) {
    return null
  }
  const user = await getPrivyUserById(userId!)
  return user
}

export async function getUserWallet(request: Request) {
  const user = await getUser(request)
  if (!user) {
    return null
  }
  return user.wallet?.address
}

export async function requireUserId(
  request: Request,
  { redirectTo }: RedirectTo = {},
) {
  const userId = await getUserId(request)
  if (!userId) {
    return await handlePrivyRedirect(request, { redirectTo })
  }
  return userId
}

export async function requireUser(
  request: Request,
  { redirectTo }: RedirectTo = {},
) {
  const user = await getUser(request)
  if (!user) {
    return await handlePrivyRedirect(request, { redirectTo })
  }
  return user
}

export async function requireUserWallet(
  request: Request,
  { redirectTo }: RedirectTo = {},
) {
  const wallet = await getUserWallet(request)
  if (!wallet) {
    return await handlePrivyRedirect(request, { redirectTo })
  }
  return wallet
}

export async function requireAnonymous(
  request: Request,
  { redirectTo }: RedirectTo = {},
) {
  const userId = await getUserId(request)
  if (userId) {
    return await handlePrivyRedirect(request, { redirectTo })
  }
}

export async function logout(
  {
    request,
    redirectTo = '/',
  }: {
    request: Request
    redirectTo?: string
  },
  responseInit?: ResponseInit,
) {
  throw redirect(redirectTo, {
    ...responseInit,
    headers: combineHeaders(responseInit?.headers),
  })
}

export async function setupAPI(request: Request) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
}

export async function handlePrivyRedirect(request: Request, redirectTo: RedirectTo = {}) {
  const accessToken = getPrivyAccessToken(request)
  const sessionToken = getPrivySessionToken(request)
  const isOAuth = await isOAuthInProgress(request.url)
  if (isOAuth) {
    // Do not redirect or interrupt the flow.
    return
  } else if (!accessToken && !sessionToken) {
    const redirectUrl = await getRedirectToUrl(request, DEFAULT_REDIRECT_URL, redirectTo)
    throw redirect(redirectUrl)
  } else if (!accessToken && sessionToken) {
    // TODO: handle /refresh where we redirect and client-side getAccessToken with privy-react
    logger('Refreshing session')
    return
  }
  logger('Hit end of handlePrivyRedirect', accessToken, sessionToken, isOAuth)
  return
}
