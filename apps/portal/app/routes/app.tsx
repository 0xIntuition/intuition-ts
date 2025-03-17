import { useEffect } from 'react'

import { getMaintenanceMode } from '@lib/utils/maintenance'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { getUser } from '@server/auth'
import { FeatureFlags, getFeatureFlags } from '@server/env'
import { isSanctioned } from '@server/ofac'
import RootLayout from 'app/layouts/root-layout'
import { Address } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()

  const user = await getUser(request)
  const wallet = user?.wallet?.address

  if (wallet) {
    const isWalletSanctioned = await isSanctioned(wallet as Address)
    if (isWalletSanctioned) {
      return redirect('/sanctioned')
    }
  }

  // TODO: Figure out why SiteWideBanner has no access to window.ENV values [ENG-3367]
  const featureFlags = getFeatureFlags()

  return json({
    user,
    wallet,
    featureFlags,
  })
}

export default function App() {
  const { featureFlags } = useLoaderData<{
    featureFlags: FeatureFlags
  }>()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <RootLayout featureFlags={featureFlags}>
      <Outlet />
    </RootLayout>
  )
}
