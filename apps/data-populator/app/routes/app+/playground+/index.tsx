import PrivyLogout from '@client/privy-logout'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
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

export default function Playground() {
  const { wallet } = useLoaderData<{ wallet: string }>()

  return (
    <div className="h-screen flex">
      <Outlet />
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
