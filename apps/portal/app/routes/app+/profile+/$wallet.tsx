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
  IdentityPresenter,
  OpenAPI,
  UserPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import StakeModal from '@components/stake/stake-modal'
import { stakeModalAtom } from '@lib/state/store'
import { userProfileRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  getAuthHeaders,
  sliceString,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getVaultDetails } from '@server/multivault'
import { getPrivyAccessToken } from '@server/privy'
import * as blockies from 'blockies-ts'
import { useAtom } from 'jotai'
import { SessionUser } from 'types/user'
import { VaultDetailsType } from 'types/vault'

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  const wallet = params.wallet

  if (!wallet) {
    return console.log('Wallet parameter is not defined')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userIdentity = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  if (!userIdentity) {
    return redirect('/create')
  }

  console.log('userIdentity', userIdentity)

  let userObject
  try {
    userObject = await UsersService.getUserByWallet({
      wallet: wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userObject = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  if (!userObject) {
    return logger('No user found in DB')
  }

  let userTotals
  try {
    userTotals = await UsersService.getUserTotals({
      id: userObject.id,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userTotals = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  let vaultDetails: VaultDetailsType | null = null

  if (userIdentity !== undefined && userIdentity.vault_id) {
    try {
      vaultDetails = await getVaultDetails(
        userIdentity.contract,
        userIdentity.vault_id,
        user?.details?.wallet?.address as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  return json({
    wallet,
    user,
    userIdentity,
    userObject,
    userTotals,
    vaultDetails,
  })
}

export default function Profile() {
  const { wallet, user, userObject, userIdentity, userTotals, vaultDetails } =
    useLoaderData<{
      wallet: string
      user: SessionUser
      userIdentity: IdentityPresenter
      userObject: UserPresenter
      userTotals: UserTotalsPresenter
      vaultDetails: VaultDetailsType
    }>()

  const { user_conviction_value: user_assets } = vaultDetails

  const imgSrc = blockies.create({ seed: wallet }).toDataURL()

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)

  return (
    <NestedLayout outlet={Outlet} options={userProfileRouteOptions}>
      <div className="flex flex-col">
        <>
          <div className="w-[300px] h-[230px] flex-col justify-start items-start gap-5 inline-flex">
            <ProfileCard
              variant="user"
              avatarSrc={userObject.image ?? imgSrc}
              name={userObject.display_name ?? ''}
              walletAddress={
                userObject.ens_name ?? sliceString(userObject.wallet, 6, 4)
              }
              stats={{
                numberOfFollowers: userTotals.follower_count,
                numberOfFollowing: userTotals.followed_count,
                points: userTotals.user_points,
              }}
              bio={userObject.description ?? ''}
            >
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => null}
              >
                Follow
              </Button>
            </ProfileCard>
            {/* <ProfileSocialAccounts
              privyUser={JSON.parse(JSON.stringify(user))}
              handleOpenEditSocialLinksModal={() =>
                setEditSocialLinksModalActive(true)
              }
            /> */}
            {vaultDetails !== null && user_assets !== '0' ? (
              <PositionCard
                onButtonClick={() =>
                  setStakeModalActive((prevState) => ({
                    ...prevState,
                    mode: 'redeem',
                    modalType: 'identity',
                    isOpen: true,
                  }))
                }
              >
                <PositionCardStaked
                  amount={user_assets ? +formatBalance(user_assets, 18, 4) : 0}
                />
                <PositionCardOwnership
                  percentOwnership={
                    userIdentity.user_assets !== null && userIdentity.assets_sum
                      ? +calculatePercentageOfTvl(
                          userIdentity.user_assets,
                          userIdentity.assets_sum,
                        )
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
            ) : null}
            <StakeCard
              tvl={formatBalance(userIdentity.assets_sum)}
              holders={userIdentity.num_positions}
              onBuyClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'deposit',
                  modalType: 'identity',
                  isOpen: true,
                }))
              }
              onViewAllClick={() => logger('click view all')} // this will navigate to the data-about positions
            />
          </div>

          <StakeModal
            user={user}
            contract={userIdentity.contract}
            open={stakeModalActive.isOpen}
            identity={userIdentity}
            min_deposit={vaultDetails.min_deposit}
            modalType={'identity'}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
                mode: undefined,
              }))
            }}
          />
        </>
      </div>
    </NestedLayout>
  )
}
