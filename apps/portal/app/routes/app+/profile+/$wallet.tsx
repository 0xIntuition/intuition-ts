import {
  Button,
  PositionCard,
  PositionCardFeesAccrued,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  ProfileCard,
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
import {
  calculatePercentageGain,
  formatBalance,
  getAuthHeaders,
  sliceString,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useParams } from '@remix-run/react'
import { getVaultDetails } from '@server/multivault'
import { getPrivyAccessToken } from '@server/privy'
import * as blockies from 'blockies-ts'
import { ExtendedUserPresenter } from 'types/user'
import { VaultDetailsType } from 'types/vault'

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

  if (!params.wallet) {
    return
  }

  if (params.wallet === user?.details?.wallet?.address) {
    throw redirect('/app/profile')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: params.wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userIdentity = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  let userTotals
  try {
    if (
      !userIdentity ||
      !userIdentity.creator ||
      typeof userIdentity.creator.id !== 'string'
    ) {
      logger('Invalid or missing creator ID')
      return
    }

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

  logger('userIdentity', userIdentity)

  let vaultDetails: VaultDetailsType | null = null

  if (userIdentity !== undefined && userIdentity.vault_id) {
    vaultDetails = await getVaultDetails(
      userIdentity.contract,
      userIdentity.vault_id,
      user.details.wallet.address as `0x${string}`,
    )
  }

  return json({ user, userIdentity, userTotals, vaultDetails })
}

export default function PublicProfile() {
  const { userIdentity, userTotals, vaultDetails } = useLoaderData<{
    userIdentity: ExtendedUserPresenter
    userTotals: UserTotalsPresenter
    vaultDetails: VaultDetailsType
  }>()
  const params = useParams()

  const { user_conviction_value: user_assets } = vaultDetails

  const imgSrc = blockies.create({ seed: params.wallet }).toDataURL()

  return (
    <NestedLayout outlet={Outlet} options={userIdentityRouteOptions}>
      <div className="flex flex-col">
        <>
          <div className="w-[300px] h-[230px] flex-col justify-start items-start mb-6  inline-flex">
            <ProfileCard
              type="user"
              avatarSrc={userIdentity.user.image ?? imgSrc}
              name={userIdentity.user.display_name ?? ''}
              walletAddress={
                userIdentity.ens_name ??
                sliceString(userIdentity.user.wallet, 6, 4)
              }
              stats={{
                numberOfFollowers: userTotals.follower_count,
                numberOfFollowing: userTotals.followed_count,
                points: userTotals.user_points,
              }}
              bio={userIdentity.user.description ?? ''}
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
          <div className="flex flex-col gap-6">
            {/* social links will go here */}
            <PositionCard onButtonClick={() => logger('sell position clicked')}>
              <PositionCardStaked
                amount={user_assets ? +formatBalance(user_assets, 18, 4) : 0}
              />
              <PositionCardOwnership
                percentOwnership={
                  userIdentity.user_asset_delta !== null &&
                  userIdentity.user_assets
                    ? +calculatePercentageGain(
                        +userIdentity.user_assets -
                          +userIdentity.user_asset_delta,
                        +userIdentity.user_assets,
                      ).toFixed(1)
                    : 0
                }
              />
              <PositionCardFeesAccrued
                amount={
                  userIdentity.user_asset_delta
                    ? +formatBalance(
                        +userIdentity.user_assets -
                          +userIdentity.user_asset_delta,
                        18,
                        5,
                      )
                    : 0
                }
              />
              <PositionCardLastUpdated timestamp={userIdentity.updated_at} />
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
