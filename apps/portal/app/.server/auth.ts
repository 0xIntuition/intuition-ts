import { redirect } from '@remix-run/node'
import { getPrivyUserById, verifyPrivyAccessToken } from './privy'
import { combineHeaders, invariant } from '@lib/utils/misc'
import { commitUserSession, getUserSession, setUserSession } from './user'

export async function getUserId(request: Request) {
  const verifiedClaims = await verifyPrivyAccessToken(request)
  if (!verifiedClaims) {
    return null
  }
  return verifiedClaims.userId
}

export async function getUserById(userId: string) {
  const user = await getPrivyUserById(userId)
  return user
}

export async function requireUserId(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const userId = await getUserId(request)
  if (!userId) {
    const requestUrl = new URL(request.url)
    redirectTo =
      redirectTo === null
        ? null
        : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`
    const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null
    const loginRedirect = ['/login', loginParams?.toString()]
      .filter(Boolean)
      .join('?')
    throw redirect(loginRedirect)
  }
  return userId
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request)
  if (userId) {
    throw redirect('/playground')
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
  // 1. Clear any session
  throw redirect(redirectTo, {
    ...responseInit,
    headers: combineHeaders(
      responseInit?.headers,
    ),
  })
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  invariant(userId, 'No userId provided by Privy')
  const user = await getPrivyUserById(userId)

  // check if there is a user in userSessionStorage
  const userSession = await getUserSession(request)

  // check if userDetails is the same object as userSession
  const requiresUpdate = deepCompare(user, userSession) || !userSession
  if (requiresUpdate) {
    console.log("Requires user detail update")
    await setUserSession(request, user)
  }
  return user
}

export function deepCompare(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b)
}