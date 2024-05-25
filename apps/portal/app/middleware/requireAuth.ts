import { redirect } from '@remix-run/node'
import { getPrivyUserById, verifyPrivyAccessToken } from '@server/privy'
import { getEnsName } from '@server/viem'
import { type MiddlewareFunctionArgs } from 'remix-create-express-app/middleware'

import { SessionContext } from './session'

export async function requireAuth({
  request,
  context,
  next,
}: MiddlewareFunctionArgs) {
  console.log('[MDL] Enter requireAuth')
  const session = context.get(SessionContext)

  // Check privy cookie's access token
  // TODO: Check if we need to hit API here as well (or replace this with API auth check)
  const authTokenClaims = await verifyPrivyAccessToken(request)
  console.log('[MDL] authTokenClaims', authTokenClaims)

  // if no valid token claim found, redirect to login page
  if (!authTokenClaims) {
    console.log('[MDL] No valid token claim found, redirecting to login page')
    const url = new URL(request.url)
    // if there is an existing user in session, clear it
    if (session.get('user')) {
      console.log('[MDL] Clearing SessionContext[user]')
      session.unset('user')
    }
    console.log('[MDL] Redirecting to login page')
    throw redirect(`/login?redirectTo=${encodeURI(url.pathname + url.search)}`)
  }

  // if there is already user data in the session, check if the userId matches the token claim
  const user = session.get('user')
  if (user && user.details?.id !== authTokenClaims.userId) {
    console.log(
      '[MDL] User data in session does not match token claim, clearing session',
    )
    session.unset('user')
  }
  let details = await getPrivyUserById(authTokenClaims.userId)
  const ensName = await getEnsName(details.wallet.address as `0x${string}`)
  if (ensName) {
    details = { ...details, ensName }
  }

  // set the user in the context from the cookie
  console.log(
    '[MDL] Setting SessionContext[user]',
    JSON.stringify({ privyAuthTokenClaims: authTokenClaims }),
  )
  session.set('user', { privyAuthTokenClaims: authTokenClaims, details })
  console.log('[MDL] SessionContext[user] set successfully')
  // log context
  console.log(
    '[MDL] SessionContext[user]',
    JSON.stringify(session.get('user'), null, 2),
  )
  console.log('[MDL] Exit requireAuth')
  return await next()
}
