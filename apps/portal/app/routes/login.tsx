import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Text,
} from '@0xintuition/1ui'

import PrivyLoginButton from '@client/privy-login-button'
import { BuiltOnBase } from '@components/built-on-base'
import { HeaderLogo } from '@components/header-logo'
import SiteWideBanner from '@components/site-wide-banner'
import logger from '@lib/utils/logger'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { User as PrivyUser } from '@privy-io/react-auth'
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useSubmit,
} from '@remix-run/react'
import { getFeatureFlags } from '@server/env'
import { verifyPrivyAccessToken } from '@server/privy'
import { PATHS } from 'app/consts'
import { parse } from 'cookie'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()
  const featureFlags = getFeatureFlags()

  const authTokenClaims = await verifyPrivyAccessToken(request)
  if (authTokenClaims) {
    logger('[Loader] User is already authenticated, redirecting to home')
    throw redirect(PATHS.HOME)
  }
  return json({ authTokenClaims, featureFlags })
}
export async function action({ request }: ActionFunctionArgs) {
  logger('[Action] Entering login action')
  const url = new URL(request.url)
  const formData = await request.formData()
  const userId = formData.get('userId') // not necessary but just to show its being properly passed to the action post privy-auth
  logger('[Action] userId', userId)

  const redirectUrl = url.searchParams.get('redirectTo') ?? PATHS.HOME
  logger('[Action] Redirecting to', redirectUrl)
  const cookies = parse(request.headers.get('cookie') ?? '')
  const privyToken = cookies['privy-token'] // not necessary but just to show its being properly set by privy post auth
  const privyIdToken = cookies['privy-id-token']
  logger('privyIdToken', privyIdToken)
  logger('[Action] Redirecting w/ privyToken', privyToken)
  throw redirect(redirectUrl)
}

export default function Login() {
  const submit = useSubmit()
  const { authTokenClaims, featureFlags } = useLoaderData<typeof loader>()
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

  const fetcher = useFetcher()
  const navigate = useNavigate()

  const handleBackNavigation = () => {
    fetcher.submit(
      { action: 'clearOnboardingCookie' },
      { method: 'post', action: '/actions/clear-onboarding-cookie' },
    )
    navigate(PATHS.THE_BIG_BANG)
  }

  return (
    <div>
      <SiteWideBanner featureFlags={featureFlags} />
      <div className="flex flex-col justify-between h-screen w-full p-8">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-2">
            <Button
              onClick={handleBackNavigation}
              variant={ButtonVariant.text}
              size={ButtonSize.icon}
              className="p-0"
            >
              <Icon name={IconName.arrowLeft} className="h-4 w-4" />
            </Button>
            <HeaderLogo />
          </div>
          <div className="justify-end max-sm:hidden">
            <BuiltOnBase />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Text variant="heading4" weight="semibold" className="mb-4">
            Sign in to Intuition
          </Text>
          <Text variant="body" className="text-secondary-foreground/60 mb-10">
            Connect your wallet to get started
          </Text>
          <PrivyLoginButton handleLogin={handleLogin} />
        </div>
        <div className="flex items-center justify-center max-sm:flex-col max-sm:gap-2 max-sm:items-center max-sm:text-center gap-1">
          <div className="justify-center">
            <BuiltOnBase />
          </div>
          <Text variant="body" className="text-secondary-foreground/60">
            Have a question or need help resolving an issue?
          </Text>
          <Link
            to="https://discord.com/channels/909531430881746974/1151564740255043604"
            target="_blank"
            className="text-base text-foreground/70 hover:text-foreground/90"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
