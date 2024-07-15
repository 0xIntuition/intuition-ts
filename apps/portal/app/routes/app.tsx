import { ApiError, UserPresenter, UsersService } from '@0xintuition/api'

import SidebarNav from '@components/sidebar-nav'
import { chainalysisOracleAbi } from '@lib/abis/chainalysisOracle'
import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { mainnetClient } from '@server/viem'
import { serverOnly$ } from 'vite-env-only'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)

  if (!wallet) {
    return logger('No user found in session')
  }

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

  let userObject
  try {
    userObject = await UsersService.getUserByWallet({
      wallet: wallet,
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
