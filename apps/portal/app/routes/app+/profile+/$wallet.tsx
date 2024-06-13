import {
  ApiError,
  IdentitiesService,
  OpenAPI,
  UsersService,
} from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const wallet = params.wallet

  if (!wallet) {
    return console.log('Wallet is undefined')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userIdentity = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  let userTotals
  try {
    userTotals = await UsersService.getUserTotals({
      id: wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userTotals = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  logger('userIdentity', userIdentity)
  logger('userTotals', userTotals)

  return json({ userIdentity, userTotals })
}

export default function PublicProfile() {
  const { userIdentity, userTotals } = useLiveLoader<typeof loader>([
    'create-meme',
    'stake',
  ])

  return (
    <NestedLayout outlet={Outlet}>
      <div className="flex flex-col">
        <h3>User Identity</h3>
        <p className="w-[600px] text-wrap">{JSON.stringify(userIdentity)}</p>
        <h3>User Totals</h3>
        <p>{JSON.stringify(userTotals, null, 2)}</p>
      </div>
    </NestedLayout>
  )
}
