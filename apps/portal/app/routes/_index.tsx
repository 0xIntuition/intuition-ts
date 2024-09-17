import PrivyRefresh from '@client/privy-refresh'
import logger from '@lib/utils/logger'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { onboardingModalCookie } from '@server/onboarding'
import { getPrivyTokens } from '@server/privy'
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
  if (accessToken) {
    logger('accessToken', accessToken)
    if (redirectTo) {
      throw redirect(redirectTo)
    }
    throw redirect(PATHS.PROFILE)
  }

  if (!sessionToken) {
    throw redirect('/login')
  } else {
    // if there is no access token, but there is a session token
    // Load the client to refresh the user's session if it's valid
    return json({})
  }
}

export default function Index() {
  return <PrivyRefresh />
}
