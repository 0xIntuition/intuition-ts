import logger from '@lib/utils/logger'
import { combineHeaders } from '@lib/utils/misc'
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

  return verifiedClaims?.userId ?? null
}

export async function getUser(request: Request): Promise<User | null> {
  const userId = await getUserId(request)
  return userId ? await getPrivyUserById(userId) : null
}

export async function getUserWallet(request: Request): Promise<string | null> {
  logger('[getUserWallet] Entering getUserWallet')
  const user = await getUser(request)
  logger('[getUserWallet] user', user)
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
  if (!user) {
    throw new Error('User not found')
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
  logger('[requireUserWallet] no wallet', wallet)
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
