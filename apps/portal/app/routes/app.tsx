import { ApiError, UserPresenter, UsersService } from '@0xintuition/api'

import SidebarNav from '@components/sidebar-nav'
import { chainalysisOracleAbi } from '@lib/abis/chainalysisOracle'
import logger from '@lib/utils/logger'
import { requireAuth } from '@middleware/requireAuth'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { mainnetClient } from '@server/viem'
import { serverOnly$ } from 'vite-env-only'

export const middleware = serverOnly$([requireAuth])

export async function loader({ context }: LoaderFunctionArgs) {
  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
  }

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

  let userObject
  try {
    userObject = await UsersService.getUserByWallet({
      wallet: user.details.wallet.address,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userObject = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  if (!userObject) {
    return console.log('No user found in DB')
  }

  return json({
    user,
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
