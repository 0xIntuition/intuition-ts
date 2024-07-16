import PrivyLoginButton from '@client/privy-login-button'
import { User as PrivyUser } from '@privy-io/react-auth'
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { useSubmit } from '@remix-run/react'
import { verifyPrivyAccessToken } from '@server/privy'
import { parse } from 'cookie'

export async function loader({ request }: LoaderFunctionArgs) {
  const claims = await verifyPrivyAccessToken(request)
  return json({ message: 'hack the planet', claims })
}

export async function action({ request }: ActionFunctionArgs) {
  console.log('[Action] Entering login action')
  const url = new URL(request.url)
  const formData = await request.formData()
  const userId = formData.get('userId') // not necessary but just to show its being properly passed to the action post privy-auth
  console.log('[Action] userId', userId)

  const redirectUrl =
    url.searchParams.get('redirectTo') ?? '/playground/protected'
  console.log('[Action] Redirecting to', redirectUrl)
  const cookies = parse(request.headers.get('cookie') ?? '')
  const privyToken = cookies['privy-token'] // not necessary but just to show its being properly set by privy post auth
  console.log('[Action] Redirecting w/ privyToken', privyToken)
  throw redirect(redirectUrl)
}

export default function Login() {
  const submit = useSubmit()

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
    <div className="p-10 space-y-5">
      <div className="flex items-center justify-between w-full p-5">
        <PrivyLoginButton handleLogin={handleLogin} />
      </div>
    </div>
  )
}
