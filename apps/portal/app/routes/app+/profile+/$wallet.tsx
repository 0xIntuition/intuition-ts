import {
  ApiError,
  IdentitiesService,
  OpenAPI,
  UsersService,
} from '@0xintuition/api'

import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
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
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        Public profile route test
        {JSON.stringify(userIdentity)}
        {JSON.stringify(userTotals)}
      </div>
    </div>
  )
}
