import { useEffect, useState } from 'react'

import { Header } from '@components/header'
import { HistoryModal } from '@components/history-modal'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLocation } from '@remix-run/react'
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
  const { pathname } = useLocation()

  const [, setShowOptions] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const handleOpenOptions = () => setShowOptions(true)
  const handleOpenHistory = () => setShowHistory(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="h-screen flex flex-col">
      <Header
        onOpenOptions={handleOpenOptions}
        onOpenHistory={handleOpenHistory}
      />
      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
      <Outlet />
    </div>
  )
}
