import PrivyLogoutButton from '@client/privy-logout-button'
import PrivySwitchWallet from '@client/privy-switch-wallet'
import { requireAuth } from '@middleware/requireAuth'
import { SessionContext } from '@middleware/session'
import { LoaderFunctionArgs } from '@remix-run/node'
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'
import { serverOnly$ } from 'vite-env-only'

export const middleware = serverOnly$([requireAuth])

export async function loader({ context }: LoaderFunctionArgs) {
  const session = context.get(SessionContext)
  console.log('[LOADER] user', session.get('user'))
  return { user: session.get('user') }
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
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
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <Outlet />
    </div>
  )
}
