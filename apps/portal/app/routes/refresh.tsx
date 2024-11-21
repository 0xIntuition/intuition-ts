import PrivyRefresh from '@client/privy-refresh'
import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { ShouldRevalidateFunctionArgs, useLoaderData } from '@remix-run/react'
import { getUser, logout } from '@server/auth'
import {
  getPrivyAccessToken,
  getPrivyClient,
  getPrivyTokens,
  verifyPrivyAccessToken,
} from '@server/privy'
import { PATHS } from 'app/consts'
import { ClientOnly } from 'remix-utils/client-only'

export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken, sessionToken } = getPrivyTokens(request)
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirectTo') || PATHS.HOME
  const providedAccessToken = url.searchParams.get('access_token')

  logger('[Refresh Loader] Entering refresh route with redirectTo', redirectTo)

  // If we have a provided access token from the client, verify and use it
  if (providedAccessToken) {
    const privy = getPrivyClient()
    const verifiedClaims = await privy.verifyAuthToken(
      providedAccessToken,
      process.env.PRIVY_VERIFICATION_KEY,
    )
    if (verifiedClaims) {
      logger(
        '[Refresh Loader] Provided access token is valid, redirecting to',
        redirectTo,
      )
      throw redirect(redirectTo)
    }
  }

  // Rest of the existing validation logic
  if (accessToken) {
    const verified = await verifyPrivyAccessToken(request)
    if (verified) {
      logger(
        '[Refresh Loader] User has valid tokens, redirecting to',
        redirectTo,
      )
      throw redirect(redirectTo)
    }
  }

  // If there's no session token at all, user needs to login
  if (!sessionToken) {
    logger('[Refresh Loader] No session token, redirecting to login')
    await logout({})
  }

  // Return the redirect destination for client-side handling
  return json({ redirectTo })
}

export default function Refresh() {
  const { redirectTo } = useLoaderData<typeof loader>()
  return <PrivyRefresh refreshPath="/refresh" redirectTo={redirectTo} />
}
