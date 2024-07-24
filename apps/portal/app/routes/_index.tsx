import PrivyRefresh from '@client/privy-refresh'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { onboardingModalCookie } from '@server/onboarding'
import { getPrivyTokens } from '@server/privy'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = await onboardingModalCookie.parse(cookieHeader)
  const redirectTo = new URL(request.url).searchParams.get('redirectTo')

  if (!cookie) {
    throw redirect('/intro')
  }
  const { accessToken, sessionToken } = getPrivyTokens(request)
  if (accessToken) {
    console.log('accessToken', accessToken)
    if (redirectTo) {
      throw redirect(redirectTo)
    }
    throw redirect('/app/profile')
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
