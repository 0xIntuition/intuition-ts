import PrivyLoginButton from '@client/privy-login-button'
import { User as PrivyUser } from '@privy-io/react-auth'
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { verifyPrivyAccessToken } from '@server/privy'
import { PATHS } from 'consts'
import { parse } from 'cookie'

export async function loader({ request }: LoaderFunctionArgs) {
  const authTokenClaims = await verifyPrivyAccessToken(request)
  if (authTokenClaims) {
    console.log('[Loader] User is already authenticated, redirecting to home')
    throw redirect(PATHS.PROFILE)
  }
  return json({ authTokenClaims })
}
export async function action({ request }: ActionFunctionArgs) {
  console.log('[Action] Entering login action')
  const url = new URL(request.url)
  const formData = await request.formData()
  const userId = formData.get('userId') // not necessary but just to show its being properly passed to the action post privy-auth
  console.log('[Action] userId', userId)

  const redirectUrl = url.searchParams.get('redirectTo') ?? PATHS.PROFILE
  console.log('[Action] Redirecting to', redirectUrl)
  const cookies = parse(request.headers.get('cookie') ?? '')
  const privyToken = cookies['privy-token'] // not necessary but just to show its being properly set by privy post auth
  console.log('[Action] Redirecting w/ privyToken', privyToken)
  throw redirect(redirectUrl)
}

export default function Login() {
  const submit = useSubmit()
  const { authTokenClaims } = useLoaderData<typeof loader>()
  console.log('[Login] authTokenClaims', authTokenClaims)

  function handleLogin(
    user: PrivyUser,
    isNewUser: boolean,
    wasAlreadyAuthenticated: boolean,
  ) {
    console.log('user', user)
    console.log('isNewUser', isNewUser)
    console.log('wasAlreadyAuthenticated', wasAlreadyAuthenticated)

    const formData = new FormData()
    formData.append('userId', user.id)
    submit(formData, { method: 'post' })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <PrivyLoginButton handleLogin={handleLogin} />
    </div>
  )
}
