import { UserPresenter } from '@0xintuition/api'

import SidebarNav from '@components/sidebar-nav'
import { chainalysisOracleAbi } from '@lib/abis/chainalysisOracle'
import { getUserByWallet } from '@lib/utils/fetches'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import {
  getUserWallet,
  isOAuthInProgress,
  requireUserWallet,
} from '@server/auth'
import { mainnetClient } from '@server/viem'

export async function loader({ request }: LoaderFunctionArgs) {
  let wallet
  if (await isOAuthInProgress(request)) {
    console.log(`${request.url} : Detected that OAuth in progress`)
    wallet = await getUserWallet(request)
  } else {
    wallet = await requireUserWallet(request)
  }
  invariant(wallet, 'User wallet not found')

  const isSanctioned = wallet
    ? ((await mainnetClient.readContract({
        address: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb',
        abi: chainalysisOracleAbi,
        functionName: 'isSanctioned',
        args: [wallet],
      })) as boolean)
    : false

  if (isSanctioned) {
    return redirect('/sanctioned')
  }

  const userObject = await getUserByWallet(wallet)

  return json({
    userObject,
  })
}

export default function Index() {
  const { userObject } = useLoaderData<{
    userObject: UserPresenter
  }>()
  return (
    <div className="flex items-start gap-4 h-screen min-h-screen">
      <SidebarNav userObject={userObject}>
        <Outlet />
      </SidebarNav>
    </div>
  )
}
