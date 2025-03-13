import { combineHeaders } from '@lib/utils/misc'
import { User } from '@privy-io/server-auth'
import { redirect } from '@remix-run/node'

import {
  getPrivyAccessToken,
  getPrivySessionToken,
  getPrivyUserById,
  verifyPrivyAccessToken,
} from './privy'

export async function getUserId(request: Request): Promise<string | null> {
  const verifiedClaims = await verifyPrivyAccessToken(request)
  return verifiedClaims?.userId ?? null
}

export async function getUser(request: Request): Promise<User | null> {
  try {
    return await getPrivyUserById(request)
  } catch (error) {
    return null
  }
}

export async function getUserWallet(request: Request): Promise<string | null> {
  const user = await getUser(request)
  return user?.wallet?.address ?? null
}

export async function requireUserId(
  request: Request,
  redirectTo: string = '/',
): Promise<string> {
  const userId = await getUserId(request)
  if (!userId) {
    throw redirect(redirectTo)
  }
  return userId
}

export async function requireUser(
  request: Request,
  redirectTo: string = '/dashboard',
): Promise<User> {
  const user = await getUser(request)
  if (!user) {
    throw redirect(redirectTo)
  }
  return user
}

export async function requireUserWallet(
  request: Request,
  redirectTo: string = '/',
): Promise<string> {
  const wallet = await getUserWallet(request)
  if (!wallet) {
    throw redirect(redirectTo)
  }
  return wallet
}

export async function requireAnonymous(
  request: Request,
  redirectTo: string = '/',
): Promise<void> {
  const userId = await getUserId(request)
  if (userId) {
    throw redirect(redirectTo)
  }
}

export async function handlePrivyRedirect({
  request,
  redirectTo = '/',
}: {
  request: Request
  redirectTo?: string
}) {
  const accessToken = getPrivyAccessToken(request)
  const sessionToken = getPrivySessionToken(request)

  if (!accessToken || !sessionToken) {
    throw redirect(redirectTo)
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
