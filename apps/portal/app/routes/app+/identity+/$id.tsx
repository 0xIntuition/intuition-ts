import {
  Button,
  ProfileCard,
  StakeCard,
  Tags,
  TagsBadge,
  TagsBadges,
  TagsButton,
} from '@0xintuition/1ui'
import { ApiError, IdentitiesService, OpenAPI } from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import { identityRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { formatBalance, getAuthHeaders, sliceString } from '@lib/utils/misc'
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
  logger('identity in client', identity)

  return (
    <NestedLayout outlet={Outlet} options={identityRouteOptions}>
      <div className="flex flex-col">
        <div className="w-[300px] h-[230px] flex-col justify-start items-start  inline-flex gap-6">
          <ProfileCard
            variant="entity"
            avatarSrc={identity?.image ?? ''}
            name={identity?.display_name ?? ''}
            walletAddress={sliceString(identity?.identity_id, 6, 4)}
            bio={identity?.description ?? ''}
          >
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => logger('follow functionality')}
            >
              Follow
            </Button>
          </ProfileCard>
          {identity?.tags !== null && (
            <Tags>
              <TagsBadges numberOfTags={identity?.tag_count ?? 0}>
                {identity?.tags?.map((tag, index) => (
                  <TagsBadge
                    key={index}
                    label={tag.display_name}
                    value={tag.num_positions}
                  />
                ))}
              </TagsBadges>
              <TagsButton onClick={() => 'add tags clicked'} />
            </Tags>
          )}
          <StakeCard
            tvl={formatBalance(identity?.assets_sum)}
            holders={identity?.num_positions}
            onBuyClick={() => logger('click buy')} // this will open the stake modal
            onViewAllClick={() => logger('click view all')} // this will navigate to the data-about positions
          />
        </div>
      </div>
    </NestedLayout>
  )
}
