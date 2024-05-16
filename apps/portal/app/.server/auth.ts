import { FormStrategy } from '@lib/utils/auth-strategy'
import { invariant } from '@lib/utils/misc'
import type { User } from '@types/user'
import logger from '@lib/utils/logger'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from './session'
import { redirect } from '@remix-run/react'
import { getUserByWallet } from './user'

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

export const authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: '_session',
  sessionErrorKey: '_session_error',
})

const apiUrl = process.env.API_URL

if (!apiUrl) {
  throw new Error('API_URL is not defined')
}

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const didSession = form.get('didSession')
    const wallet = form.get('wallet')
    const accessToken = form.get('accessToken')
    // Validate the inputs
    invariant(
      typeof didSession === 'string',
      'DID Session must be a serialized string',
    )
    invariant(didSession.length > 0, 'DID Session must not be empty')
    invariant(typeof wallet === 'string', 'Wallet must be a string')
    invariant(wallet.length > 0, 'Wallet must not be empty')
    invariant(typeof accessToken === 'string', 'Access Token must be a string')
    invariant(accessToken.length > 0, 'Access Token must not be empty')

    const user = await authenticate(didSession, wallet, accessToken)
    return user
  }),
  'auth',
)

export async function authenticate(
  didSession: string,
  wallet: string,
  accessToken: string,
): Promise<User> {
  logger('didSession', didSession)
  logger('wallet', wallet)
  logger('accessToken', accessToken)
  // const session = await DIDSession.fromSession(didSession)

  // logger('SESSION', session)

  // if (!session || !session.hasSession || session.isExpired) {
  //   throw new Error('Invalid DID Session')
  // }
  // const ensName = await mainnetClient.getEnsName({ address: wallet as Address })

  // const isAuthed = await fetch(`${apiUrl}/auth`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': process.env.API_KEY!,
  //   },
  //   body: JSON.stringify({
  //     didSession: didSession,
  //   }),
  // })
  // logger('isAuthed', isAuthed)

  // if (!isAuthed.ok) {
  //   throw new Error('Not authorized')
  // }

  // const { newUser, userId } = await isAuthed.json()

  const userIdResponse = await getUserByWallet({
    wallet: wallet,
    accessToken: accessToken,
  })

  const { data: userIdData } = userIdResponse

  return {
    didSession,
    wallet,
    accessToken,
    id: userIdData ? userIdData.id : '',
  }
}
export async function login(request: Request) {
  await authenticator.authenticate('auth', request, {
    successRedirect: '/profile',
  })
}

export async function logout(request: Request) {
  await authenticator.logout(request, { redirectTo: '/' })
}

// export async function requireAuthedUser(request: Request) {
//   const user = await authenticator.isAuthenticated(request)
//   if (user) return await Promise.resolve(user)
//   return redirect('/')
// }

export const requireAuthedUser = async <TRequest extends Request>(
  request: TRequest,
) => {
  const user = await authenticator.isAuthenticated(request) // why is this null
  if (!user) {
    throw redirect('/', 302)
  }

  return user
}

export async function isAuthedUser(request: Request) {
  const user = await authenticator.isAuthenticated(request)

  if (user) return await Promise.resolve(user)
  return null
}
