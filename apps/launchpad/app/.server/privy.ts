import { AuthTokenClaims, PrivyClient, User } from '@privy-io/server-auth'
import { parse } from 'cookie'

export function getPrivyClient() {
  return new PrivyClient(
    process.env.PRIVY_APP_ID || '',
    process.env.PRIVY_APP_SECRET || '',
  )
}

export const verifyPrivyAccessToken = async (
  req: Request,
): Promise<AuthTokenClaims | null> => {
  const privy = getPrivyClient()
  const authToken = getPrivyAccessToken(req)
  if (!authToken) {
    return null
  }
  const verifiedClaims = await privy.verifyAuthToken(
    authToken,
    process.env.PRIVY_VERIFICATION_KEY,
  )
  return verifiedClaims
}

export const getPrivyUserById = async (id: string): Promise<User> => {
  const privy = getPrivyClient()
  const user = await privy.getUser(id)
  return user
}

export const getPrivyAccessToken = (req: Request): string | null => {
  const cookies = parse(req.headers.get('Cookie') ?? '')

  const authIdToken =
    req.headers.get('Authorization')?.replace('Bearer ', '') ||
    cookies['privy-id-token']
  if (authIdToken) {
    return authIdToken
  }

  const authToken =
    req.headers.get('Authorization')?.replace('Bearer ', '') ||
    cookies['privy-token']

  return authToken
}

export const getPrivySessionToken = (req: Request): string | null => {
  const cookies = parse(req.headers.get('Cookie') ?? '')
  return cookies['privy-session']
}

export const getPrivyTokens = (
  req: Request,
): {
  accessToken: string | null
  sessionToken: string | null
} => {
  return {
    accessToken: getPrivyAccessToken(req),
    sessionToken: getPrivySessionToken(req),
  }
}
