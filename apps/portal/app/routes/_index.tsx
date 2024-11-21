import logger from '@lib/utils/logger'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { onboardingModalCookie } from '@server/onboarding'
import { getPrivyTokens, verifyPrivyAccessToken } from '@server/privy'
import { PATHS } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()

  const cookieHeader = request.headers.get('Cookie')
  const cookie = await onboardingModalCookie.parse(cookieHeader)
  const redirectTo = new URL(request.url).searchParams.get('redirectTo')

  const url = new URL(request.url)
  const isReadonlyRoute = url.pathname.startsWith('/readonly/')

  if (isReadonlyRoute) {
    return json({})
  }

  if (!cookie) {
    throw redirect('/intro')
  }

  const { accessToken, sessionToken } = getPrivyTokens(request)

  // If we have an access token, verify it's still valid
  if (accessToken) {
    const verifiedClaims = await verifyPrivyAccessToken(request)
    if (verifiedClaims) {
      logger('[Loader] User is authenticated, redirecting to destination')
      throw redirect(redirectTo || PATHS.HOME)
    }
    // Token exists but is invalid - continue to refresh flow
  }

  // If we have a session token but no valid access token,
  // redirect to refresh route to handle token refresh
  if (sessionToken) {
    logger(
      '[Loader] Session token present but no valid access token, redirecting to refresh',
    )
    const refreshUrl = new URL('/refresh', request.url)
    if (redirectTo) {
      refreshUrl.searchParams.set('redirectTo', redirectTo)
    }
    throw redirect(refreshUrl.toString())
  }

  // No tokens at all, redirect to login
  logger('[Loader] No tokens present, redirecting to login')
  throw redirect('/login')
}

export default function Index() {
  return null
}
