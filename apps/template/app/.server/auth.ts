<<<<<<< HEAD
import logger from '@lib/utils/logger'
import { combineHeaders } from '@lib/utils/misc'
=======
import { OpenAPI } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { combineHeaders, getAuthHeaders } from '@lib/utils/misc'
>>>>>>> 1814bcc60 (Add stripped down version of portal base)
import { getRedirectToUrl } from '@lib/utils/redirect'
import { User } from '@privy-io/server-auth'
import { redirect } from '@remix-run/node'
import { RedirectOptions } from 'app/types'

import {
  getPrivyAccessToken,
  getPrivySessionToken,
  getPrivyUserById,
  isOAuthInProgress,
  verifyPrivyAccessToken,
} from './privy'

export async function getUserId(request: Request): Promise<string | null> {
  const verifiedClaims = await verifyPrivyAccessToken(request)
<<<<<<< HEAD

=======
>>>>>>> 1814bcc60 (Add stripped down version of portal base)
  return verifiedClaims?.userId ?? null
}

export async function getUser(request: Request): Promise<User | null> {
  const userId = await getUserId(request)
  return userId ? await getPrivyUserById(userId) : null
}

export async function getUserWallet(request: Request): Promise<string | null> {
<<<<<<< HEAD
  logger('[getUserWallet] Entering getUserWallet')
  const user = await getUser(request)
  logger('[getUserWallet] user', user)
=======
  const user = await getUser(request)
>>>>>>> 1814bcc60 (Add stripped down version of portal base)
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
<<<<<<< HEAD
  if (!user) {
    throw new Error('User not found')
  }
=======
>>>>>>> 1814bcc60 (Add stripped down version of portal base)
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
<<<<<<< HEAD
  logger('[requireUserWallet] no wallet', wallet)
=======
>>>>>>> 1814bcc60 (Add stripped down version of portal base)
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
<<<<<<< HEAD
=======

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
>>>>>>> 1814bcc60 (Add stripped down version of portal base)
