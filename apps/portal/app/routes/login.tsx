import PrivyLoginButton from '@client/privy-login-button'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { User as PrivyUser } from '@privy-io/react-auth'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { parse } from 'cookie'
import { verifyPrivyAccessToken } from '@server/privy'

export async function loader({ request }: LoaderFunctionArgs) {
  const authTokenClaims = await verifyPrivyAccessToken(request)
  if (authTokenClaims) {
    console.log('[Loader] User is already authenticated, redirecting to home')
    throw redirect('/app')
  }
  return json({ authTokenClaims })
}
export async function action({ request }: ActionFunctionArgs) {
  console.log('[Action] Entering login action')
  const url = new URL(request.url)
  const formData = await request.formData()
  const userId = formData.get('userId') // not necessary but just to show its being properly passed to the action post privy-auth
  console.log('[Action] userId', userId)

  const redirectUrl = url.searchParams.get('redirectTo') ?? '/app'
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
    <div>
      <PrivyLoginButton handleLogin={handleLogin} />
    </div>
  )
}
