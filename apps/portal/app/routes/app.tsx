import { useEffect } from 'react'

import { UserPresenter, UsersService } from '@0xintuition/api'

import PrivyLogout from '@client/privy-logout'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { isSanctioned } from '@server/ofac'
import RootLayout from 'app/layouts/root-layout'
import { Address } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, 'Unauthorized')

  const isWalletSanctioned = await isSanctioned(wallet as Address)
  if (isWalletSanctioned) {
    return redirect('/sanctioned')
  }

  const userObject = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet,
    },
  })

  return json({
    wallet,
    userObject,
  })
}

export default function App() {
  const { wallet, userObject } = useLoaderData<{
    wallet: string
    userObject: UserPresenter
  }>()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <RootLayout userObject={userObject}>
      <Outlet />
      <PrivyLogout wallet={wallet} />
    </RootLayout>
  )
}
