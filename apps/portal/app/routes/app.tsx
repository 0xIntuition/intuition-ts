import { useEffect } from 'react'

import { UserPresenter, UsersService } from '@0xintuition/api'

import PrivyLogout from '@client/privy-logout'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { featureFlagsSchema, getFeatureFlags } from '@server/env'
import { isSanctioned } from '@server/ofac'
import { PATHS } from 'app/consts'
import RootLayout from 'app/layouts/root-layout'
import { Address } from 'viem'
import { z } from 'zod'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, 'Unauthorized')

  const isWalletSanctioned = await isSanctioned(wallet as Address)
  if (isWalletSanctioned) {
    return redirect('/sanctioned')
  }

  if (process.env.FF_FULL_LOCKDOWN_ENABLED === 'true') {
    throw redirect(PATHS.MAINTENANCE)
  }

  const userObject = await fetchWrapper(request, {
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet,
    },
  })

  // TODO: Figure out why SiteWideBanner has no access to window.ENV values [ENG-3367]
  const featureFlags = getFeatureFlags()

  return json({
    wallet,
    userObject,
    featureFlags,
  })
}

export default function App() {
  const { wallet, userObject, featureFlags } = useLoaderData<{
    wallet: string
    userObject: UserPresenter
    featureFlags: z.infer<typeof featureFlagsSchema>
  }>()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <RootLayout userObject={userObject} featureFlags={featureFlags}>
      <Outlet />
      <PrivyLogout wallet={wallet} />
    </RootLayout>
  )
}
