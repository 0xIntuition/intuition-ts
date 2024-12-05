import { PATHS } from '@consts/paths'
import logger from '@lib/utils/logger'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getPrivyTokens, verifyPrivyAccessToken } from '@server/privy'

export async function loader({ request }: LoaderFunctionArgs) {
  const redirectTo = new URL(request.url).searchParams.get('redirectTo')
  const { accessToken, sessionToken } = getPrivyTokens(request)

  // No tokens at all - redirect to login
  if (!accessToken && !sessionToken) {
    logger('[Loader] No tokens present, redirecting to login')
    throw redirect('/login')
  }

  // Has session token but no access token - needs refresh
  if (!accessToken && sessionToken) {
    logger(
      '[Loader] No access token but have session token, redirecting to refresh',
    )
    const refreshUrl = new URL('/refresh', request.url)
    if (redirectTo) {
      refreshUrl.searchParams.set('redirectTo', redirectTo)
    }
    throw redirect(refreshUrl.toString())
  }

  // Verify access token if present
  if (accessToken) {
    const verifiedClaims = await verifyPrivyAccessToken(request)
    if (verifiedClaims) {
      logger('[Loader] Access token verified, redirecting to destination')
      throw redirect(redirectTo || PATHS.APP)
    }

    // Token is invalid - try refresh if we have session token
    if (sessionToken) {
      logger(
        '[Loader] Access token invalid but have session token, redirecting to refresh',
      )
      const refreshUrl = new URL('/refresh', request.url)
      if (redirectTo) {
        refreshUrl.searchParams.set('redirectTo', redirectTo)
      }
      throw redirect(refreshUrl.toString())
    }
  }

  // If we get here, we have an invalid access token and no session token
  logger(
    '[Loader] Invalid access token and no session token, redirecting to login',
  )
  throw redirect('/login')
}

export default function Index() {
  return null
}
