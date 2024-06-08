import { useState } from 'react'

import PrivyLogoutButton from '@client/privy-logout-button'
import PrivySwitchWallet from '@client/privy-switch-wallet'
import OnboardingModal from '@components/onboarding-modal'
import { onboardingModalAtom } from '@lib/state/store'
import { requireAuth } from '@middleware/requireAuth'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'
import { onboardingModalCookie } from '@server/onboarding'
import { useAtomValue } from 'jotai'
import { serverOnly$ } from 'vite-env-only'

export const middleware = serverOnly$([requireAuth])

export async function loader({ context, request }: LoaderFunctionArgs) {
  const session = context.get(SessionContext)
  const user = session.get('user')

  const cookieHeader = request.headers.get('Cookie')
  const cookie = await onboardingModalCookie.parse(cookieHeader)

  if (!cookie) {
    return json({
      user,
      showOnboardingModal: true,
    })
  }

  return json({
    user,
    showOnboardingModal: false,
  })
}

export default function Index() {
  const { user, showOnboardingModal } = useLoaderData<typeof loader>()
  const { revalidate } = useRevalidator()
  const navigate = useNavigate()

  async function handleLogout() {
    console.log('[Index] handleLogout')
    navigate('/login')
  }

  function handleLinkWalletSuccess() {
    console.log('[Index] handleLinkWalletSuccess')
    revalidate()
  }

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(showOnboardingModal)
  const onboardingModalActive = useAtomValue(onboardingModalAtom)

  return (
    <div>
      <div>
        <div className="flex items-start gap-4">
          <Link to="/">Home</Link>
          <PrivyLogoutButton handleLogout={handleLogout} />
          <PrivySwitchWallet
            activeWallet={user?.details?.wallet}
            onLinkWalletSuccess={handleLinkWalletSuccess}
          />
        </div>
      </div>
      <OnboardingModal
        open={onboardingModalActive.isOpen || isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <Outlet />
    </div>
  )
}
