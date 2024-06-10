import PrivyLogoutButton from '@client/privy-logout-button'
import PrivySwitchWallet from '@client/privy-switch-wallet'
import { chainalysisOracleAbi } from '@lib/abis/chainalysisOracle'
import { requireAuth } from '@middleware/requireAuth'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'
import { mainnetClient } from '@server/viem'
import { serverOnly$ } from 'vite-env-only'

export const middleware = serverOnly$([requireAuth])

export async function loader({ context }: LoaderFunctionArgs) {
  const session = context.get(SessionContext)
  const user = session.get('user')

  const isSanctioned = user?.details?.wallet?.address
    ? ((await mainnetClient.readContract({
        address: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb',
        abi: chainalysisOracleAbi,
        functionName: 'isSanctioned',
        args: [user?.details?.wallet?.address],
      })) as boolean)
    : false

  if (isSanctioned) {
    return redirect('/sanctioned')
  }

  return json({
    user,
  })
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
