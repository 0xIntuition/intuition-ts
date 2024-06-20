import { Button, ProfileCard } from '@0xintuition/1ui'
import { ApiError, IdentitiesService, OpenAPI } from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import { identityRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { getAuthHeaders, sliceString } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import { ExtendedIdentityPresenter } from 'types/identity'

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
  }

  if (!params.id) {
    return
  }

  let identity
  try {
    identity = await IdentitiesService.getIdentityById({
      id: params.id,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      identity = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  logger('identity', identity)

  return json({
    identity: identity,
  })
}

export default function IdentityDetails() {
  const { identity } = useLoaderData<{ identity: ExtendedIdentityPresenter }>()

  return (
    <NestedLayout outlet={Outlet} options={identityRouteOptions}>
      <div className="flex flex-col">
        <div className="w-[300px] h-[230px] flex-col justify-start items-start mb-6  inline-flex">
          <ProfileCard
            type="entity"
            avatarSrc={identity.image ?? ''}
            name={identity.display_name ?? ''}
            walletAddress={sliceString(identity.identity_id, 6, 4)}
            stats={{
              numberOfFollowers: identity.follower_count,
              numberOfFollowing: identity.followed_count,
            }}
            bio={identity.description ?? ''}
          >
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => logger('follow functionality')}
            >
              Follow
            </Button>
          </ProfileCard>
        </div>
      </div>
    </NestedLayout>
  )
}
