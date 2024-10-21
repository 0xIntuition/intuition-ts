import logger from '@lib/utils/logger'
import { AuthTokenClaims, PrivyClient, User } from '@privy-io/server-auth'
import { parse } from 'cookie'

export function getPrivyClient() {
  return new PrivyClient(
    process.env.PRIVY_APP_ID || '',
    process.env.PRIVY_APP_SECRET || '',
  )
}

// export const verifyPrivyAccessToken = async (
//   req: Request,
// ): Promise<AuthTokenClaims | null> => {
//   logger('[verifyPrivyAccessToken] Entering verifyPrivyAccessToken')
//   const privy = getPrivyClient()
//   const authToken = getPrivyAccessToken(req)
//   logger('[verifyPrivyAccessToken] authToken', authToken)
//   if (!authToken) {
//     logger('No privy access token found')
//     return null
//   }
//   logger('[verifyPrivyAccessToken] verifiedClaims')
//   const verifiedClaims = await privy.verifyAuthToken(
//     authToken,
//     process.env.PRIVY_VERIFICATION_KEY,
//   )
//   logger('[verifyPrivyAccessToken] verifiedClaims', verifiedClaims)
//   return verifiedClaims
// }

export const verifyPrivyAccessToken = async (
  req: Request,
): Promise<AuthTokenClaims | null> => {
  logger('[verifyPrivyAccessToken] Entering verifyPrivyAccessToken')
  const privy = getPrivyClient()
  const authToken = getPrivyAccessToken(req)
  logger('[verifyPrivyAccessToken] authToken', authToken)
  if (!authToken) {
    logger('[verifyPrivyAccessToken] No privy access token found')
    return null
  }

  const verificationKey = process.env.PRIVY_VERIFICATION_KEY
  if (verificationKey) {
    // Convert the escaped newlines back to actual newlines
    const formattedKey = verificationKey.replace(/\\n/g, '\n')
    logger('[verifyPrivyAccessToken] Verification key found')

    try {
      const verifiedClaims = await privy.verifyAuthToken(
        authToken,
        formattedKey,
      )
      logger('[verifyPrivyAccessToken] verifiedClaims', verifiedClaims)
      return verifiedClaims
    } catch (error) {
      logger(
        '[verifyPrivyAccessToken] Error verifying auth token with custom key',
        error,
      )
      // Fallback to default verification if custom key fails
      logger(
        '[verifyPrivyAccessToken] Attempting verification with default key',
      )
    }
  }

  // If no verification key or custom verification failed, use default verification
  try {
    const verifiedClaims = await privy.verifyAuthToken(authToken)
    logger('[verifyPrivyAccessToken] verifiedClaims', verifiedClaims)
    return verifiedClaims
  } catch (error) {
    logger('[verifyPrivyAccessToken] Error verifying auth token', error)
    return null
  }
}

// takes user privy DID (e.g. authCheck().userId)
export const getPrivyUserById = async (id: string): Promise<User> => {
  const privy = getPrivyClient()
  logger('[getPrivyUserById] Entering getPrivyUserById')
  const user = await privy.getUserById(id)
  return user
}

// get access token from cookie or header
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

// get session token from cookie
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

export async function isOAuthInProgress(requestUrl: string) {
  // Check if privy_oauth_code, privy_oauth_state, or privy_oauth_provider are in query params
  // these parameters are a required component of Privy's OAuth login flow and applying a redirect will destructively erase them.
  const url = new URL(requestUrl)
  return (
    url.searchParams.has('privy_oauth_code') ||
    url.searchParams.has('privy_oauth_state') ||
    url.searchParams.has('privy_oauth_provider')
  )
}
