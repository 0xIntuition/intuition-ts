import { PATHS } from '@consts/paths'
import logger from '@lib/utils/logger'
import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyTokens } from '@server/privy'

export async function loader({ request }: LoaderFunctionArgs) {
  const redirectTo = new URL(request.url).searchParams.get('redirectTo')
  const { accessToken, sessionToken } = getPrivyTokens(request)
  if (accessToken) {
    logger('accessToken', accessToken)
    if (redirectTo) {
      throw redirect(redirectTo)
    }
    throw redirect(PATHS.APP)
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
  // return <PrivyRefresh />
}
