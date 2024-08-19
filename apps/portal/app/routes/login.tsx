import { Button, Text } from '@0xintuition/1ui'

import PrivyLoginButton from '@client/privy-login-button'
import { HeaderLogo } from '@components/header-logo'
import logger from '@lib/utils/logger'
import { User as PrivyUser } from '@privy-io/react-auth'
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { verifyPrivyAccessToken } from '@server/privy'
import { PATHS, SUPPORT_EMAIL_ADDRESS } from 'app/consts'
import { parse } from 'cookie'

export async function loader({ request }: LoaderFunctionArgs) {
  const authTokenClaims = await verifyPrivyAccessToken(request)
  if (authTokenClaims) {
    logger('[Loader] User is already authenticated, redirecting to home')
    throw redirect(PATHS.PROFILE)
  }
  return json({ authTokenClaims })
}
export async function action({ request }: ActionFunctionArgs) {
  logger('[Action] Entering login action')
  const url = new URL(request.url)
  const formData = await request.formData()
  const userId = formData.get('userId') // not necessary but just to show its being properly passed to the action post privy-auth
  logger('[Action] userId', userId)

  const redirectUrl = url.searchParams.get('redirectTo') ?? PATHS.PROFILE
  logger('[Action] Redirecting to', redirectUrl)
  const cookies = parse(request.headers.get('cookie') ?? '')
  const privyToken = cookies['privy-token'] // not necessary but just to show its being properly set by privy post auth
  logger('[Action] Redirecting w/ privyToken', privyToken)
  throw redirect(redirectUrl)
}

export default function Login() {
  const submit = useSubmit()
  const { authTokenClaims } = useLoaderData<typeof loader>()
  logger('[Login] authTokenClaims', authTokenClaims)

  function handleLogin(
    user: PrivyUser,
    isNewUser: boolean,
    wasAlreadyAuthenticated: boolean,
  ) {
    logger('user', user)
    logger('isNewUser', isNewUser)
    logger('wasAlreadyAuthenticated', wasAlreadyAuthenticated)

    const formData = new FormData()
    formData.append('userId', user.id)
    submit(formData, { method: 'post' })
  }

  return (
    <div className="flex flex-col justify-between h-screen w-full p-8">
      <HeaderLogo />
      <div className="flex flex-col items-center">
        <Text variant="heading4" weight="semibold" className="mb-4">
          Sign in to Intuition
        </Text>
        <Text variant="body" className="text-secondary-foreground/60 mb-10">
          Connect your wallet to get started
        </Text>
        <PrivyLoginButton handleLogin={handleLogin} />
      </div>
      <div className="flex items-center justify-center max-sm:flex-col max-sm:gap-2 max-sm:items-center max-sm:text-center">
        <Text variant="body" className="text-secondary-foreground/60">
          Have a question or need help resolving an issue?
        </Text>
        <Button
          variant="text"
          onClick={() =>
            (window.location.href = `mailto:${SUPPORT_EMAIL_ADDRESS}`)
          }
        >
          Contact Support
        </Button>
      </div>
    </div>
  )
}