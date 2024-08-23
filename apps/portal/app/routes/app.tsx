import { useEffect } from 'react'

import { ApiError, UserPresenter, UsersService } from '@0xintuition/api'

import PrivyLogout from '@client/privy-logout'
import { getIdentityOrPending } from '@lib/services/identities'
import logger from '@lib/utils/logger'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { FeatureFlags, getFeatureFlags } from '@server/env'
import { isSanctioned } from '@server/ofac'
import { PATHS } from 'app/consts'
import RootLayout from 'app/layouts/root-layout'
import { Address } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()

  const wallet = await requireUserWallet(request)
  invariant(wallet, 'Unauthorized')

  const isWalletSanctioned = await isSanctioned(wallet as Address)
  if (isWalletSanctioned) {
    return redirect('/sanctioned')
  }

  let userObject
  try {
    userObject = await fetchWrapper(request, {
      method: UsersService.getUserByWalletPublic,
      args: {
        wallet,
      },
    })
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      throw redirect('/invite')
    }
    logger('Error fetching userObject', error)
    throw error
  }

  const { identity: userIdentity, isPending } = await getIdentityOrPending(
    request,
    wallet,
  )
  logger(`isPending: ${isPending}`)

  if (!userIdentity && !isPending) {
    throw redirect('/invite')
  }

  if (!userIdentity && isPending) {
    throw redirect('/invite')
  }

  if (isPending) {
    throw redirect(PATHS.PROFILE)
  }

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
    featureFlags: FeatureFlags
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
