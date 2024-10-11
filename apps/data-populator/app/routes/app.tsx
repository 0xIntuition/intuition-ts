import { useEffect } from 'react'

import PrivyLogout from '@client/privy-logout'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  logger('[Loader] Entering app loader')

  const wallet = await requireUserWallet(request)
  logger('wallet', wallet)
  invariant(wallet, 'Unauthorized')

  return json({
    wallet,
  })
}

export default function App() {
  const { wallet } = useLoaderData<{ wallet: string }>()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="h-screen flex">
      <Outlet />
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
