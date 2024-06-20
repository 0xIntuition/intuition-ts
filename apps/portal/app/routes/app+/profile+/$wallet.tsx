import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  PositionCard,
  PositionCardFeesAccrued,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  StakeCard,
} from '@0xintuition/1ui'
import {
  ApiError,
  IdentitiesService,
  OpenAPI,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import { userIdentityRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { formatBalance, getAuthHeaders, sliceString } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useParams } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import * as blockies from 'blockies-ts'
import { Loader2Icon } from 'lucide-react'
import { ExtendedUserPresenter } from 'types/user'

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return console.log('No user found in session')
  }

  if (!params.wallet) {
    return
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: params.wallet,
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

  logger('userIdentity', userIdentity)

  let userTotals
  try {
    if (
      !userIdentity ||
      !userIdentity.creator ||
      typeof userIdentity.creator.id !== 'string'
    ) {
      console.log('Invalid or missing creator ID')
      return
    }
    logger('userIdentity.creator.id', userIdentity?.creator?.id)
    userTotals = await UsersService.getUserTotals({
      id: userIdentity.creator.id,
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
  logger('userTotals', userTotals)
  return json({ user, userIdentity, userTotals })
}

export default function PublicProfile() {
  const { userIdentity, userTotals } = useLoaderData<{
    userIdentity: ExtendedUserPresenter
    userTotals: UserTotalsPresenter
  }>()
  const params = useParams()

  const imgSrc = blockies.create({ seed: params.wallet }).toDataURL()

  logger('userIdentity', userIdentity)
  logger('userTotals', userTotals)

  return (
    <NestedLayout outlet={Outlet} options={userIdentityRouteOptions}>
      <div className="flex flex-col">
        <>
          <div className="w-[300px] h-[230px] flex-col justify-start items-start gap-5 inline-flex">
            <div className="w-[300px] justify-start items-center gap-[18px] inline-flex">
              <div className="w-[70px] pr-1.5 justify-start items-center flex">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={userIdentity.user.image ?? imgSrc}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    <Loader2Icon className="h-6 w-6 animate-spin" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start inline-flex">
                <div className="justify-start items-end gap-1.5 inline-flex">
                  <div className="text-neutral-200 text-xl font-medium leading-[30px]">
                    {userIdentity.user.display_name}
                  </div>
                </div>
                <div className="self-stretch h-6 pb-0.5 justify-start items-end gap-2.5 inline-flex">
                  <div className="text-white/50 text-sm font-medium leading-tight">
                    {userIdentity.user.ens_name ??
                      sliceString(userIdentity.wallet, 6, 4)}
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-4 inline-flex">
              <div className="justify-start items-start gap-1 flex">
                <div className="text-neutral-300 text-sm font-medium leading-tight">
                  -
                </div>
                <div className="text-white/50 text-sm font-normal leading-tight">
                  Following
                </div>
              </div>
              <div className="justify-start items-start gap-1 flex">
                <div className="text-neutral-300 text-sm font-medium leading-tight">
                  -
                </div>
                <div className="text-white/50 text-sm font-normal leading-tight">
                  Followers
                </div>
              </div>
              <div className="justify-start items-start gap-[3px] flex">
                <div className="text-green-500 text-sm font-medium leading-tight">
                  {userTotals.user_points}
                </div>
                <div className="text-white/50 text-sm font-normal leading-tight">
                  Points
                </div>
              </div>
            </div>
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="w-[300px] text-neutral-300 text-sm font-medium leading-tight">
                {userIdentity.user.description}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* social links will go here */}
            <PositionCard onButtonClick={() => logger('sell button clicked')}>
              <PositionCardStaked amount={0.512} />
              <PositionCardOwnership percentOwnership={24} />
              <PositionCardFeesAccrued amount={0.005} />
              <PositionCardLastUpdated timestamp="2024-05-10T00:00:00Z" />
            </PositionCard>
            <StakeCard
              tvl={formatBalance(userIdentity.assets_sum)}
              holders={userIdentity.num_positions}
              onBuyClick={() => logger('click buy')} // this will open the stake modal
              onViewAllClick={() => logger('click view all')} // this will navigate to the data-about positions
            />
          </div>
        </>
      </div>
    </NestedLayout>
  )
}
