import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  logger('[Loader] Entering app loader')

  const wallet = await requireUserWallet(request)
  invariant(wallet, 'Unauthorized')

  return json({
    wallet,
  })
}

export default function App() {
  return (
    <div className="h-screen flex">
      <Outlet />
    </div>
  )
}
