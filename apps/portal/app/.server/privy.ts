import { AuthTokenClaims, PrivyClient } from '@privy-io/server-auth'
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
  console.log('Enter verifyPrivyAccessToken')
  const privy = getPrivyClient()
  let authToken = getPrivyAccessToken(req)
  if (!authToken) {
    console.log('Exit verifyPrivyAccessToken')
    return null
  }
  const verifiedClaims = await privy.verifyAuthToken(authToken)
  console.log('Verified claims', JSON.stringify(verifiedClaims, null, 2))
  console.log('Exit verifyPrivyAccessToken')
  return verifiedClaims
}

// takes user privy DID (e.g. authCheck().userId)
export const getPrivyUserById = async (id: string): Promise<any> => {
  const privy = getPrivyClient()
  const user = await privy.getUser(id)
  return user
}

// get access token from cookie or header
export const getPrivyAccessToken = (req: Request): string | null => {
  const cookies = parse(req.headers.get('Cookie') ?? '')
  let authToken =
    req.headers.get('Authorization')?.replace('Bearer ', '') ||
    cookies['privy-token']
  console.log('cookie[privy-token]', cookies['privy-token'])
  console.log(
    "req.headers.get('Authorization')",
    req.headers.get('Authorization'),
  )
  console.log('authToken', authToken)
  return authToken
}