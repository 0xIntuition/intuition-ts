import { useEffect } from 'react'

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

import CreateIdentityModal from '@components/create-identity-modal'
import EditProfileModal from '@components/edit-profile-modal'
import EditSocialLinksModal from '@components/edit-social-links-modal'
import { NestedLayout } from '@components/nested-layout'
import { ProfileSocialAccounts } from '@components/profile-social-accounts'
import {
  createIdentityModalAtom,
  editProfileModalAtom,
  editSocialLinksModalAtom,
} from '@lib/state/store'
import { userProfileRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import {
  calculatePercentageGain,
  formatBalance,
  getAuthHeaders,
  sliceString,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useMatches,
  useRevalidator,
} from '@remix-run/react'
import { getVaultDetails } from '@server/multivault'
import { getPrivyAccessToken } from '@server/privy'
import * as blockies from 'blockies-ts'
import { useAtom } from 'jotai'
import { SessionUser } from 'types/user'
import { VaultDetailsType } from 'types/vault'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return console.log('No user found in session')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: user.details.wallet.address,
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

  let userObject
  try {
    userObject = await UsersService.getUserByWallet({
      wallet: user.details.wallet.address,
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
        user.details.wallet.address as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  return json({ user, userIdentity, userObject, userTotals, vaultDetails })
}

export default function Profile() {
  const { user, userObject, userIdentity, userTotals, vaultDetails } =
    useLoaderData<{
      user: SessionUser
      userIdentity: IdentityPresenter
      userObject: UserPresenter
      userTotals: UserTotalsPresenter
      vaultDetails: VaultDetailsType
    }>()

  const { user_conviction_value: user_assets } = vaultDetails

  const imgSrc = blockies
    .create({ seed: user?.details?.wallet?.address })
    .toDataURL()

  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)

  const [editSocialLinksModalActive, setEditSocialLinksModalActive] = useAtom(
    editSocialLinksModalAtom,
  )

  const [createIdentityModalActive, setCreateIdentityModalActive] = useAtom(
    createIdentityModalAtom,
  )

  const revalidator = useRevalidator()

  useEffect(() => {
    setEditProfileModalActive(false)
    setEditSocialLinksModalActive(false)
  }, [])

  useEffect(() => {
    if (!editProfileModalActive) {
      revalidator.revalidate()
    }
  }, [editProfileModalActive])

  const matches = useMatches()
  const currentPath = matches[matches.length - 1].pathname

  // List of paths that should not use the ProfileLayout
  const excludedPaths = ['/app/profile/create']

  if (excludedPaths.includes(currentPath)) {
    return <Outlet />
  }

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
                onClick={() => setEditProfileModalActive(true)}
              >
                Edit Profile
              </Button>
            </ProfileCard>
            <ProfileSocialAccounts
              privyUser={JSON.parse(JSON.stringify(user))}
              handleOpenEditSocialLinksModal={() =>
                setEditSocialLinksModalActive(true)
              }
            />
            {vaultDetails !== null && user_assets !== '0' ? (
              <PositionCard
                onButtonClick={() => logger('sell position clicked')}
              >
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
            ) : null}
            <StakeCard
              tvl={formatBalance(userIdentity.assets_sum)}
              holders={userIdentity.num_positions}
              onBuyClick={() => logger('click buy')} // this will open the stake modal
              onViewAllClick={() => logger('click view all')} // this will navigate to the data-about positions
            />
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setCreateIdentityModalActive(true)}
            >
              Create Identity
            </Button>
          </div>
          <EditProfileModal
            userObject={userObject}
            open={editProfileModalActive}
            onClose={() => setEditProfileModalActive(false)}
          />
          <EditSocialLinksModal
            privyUser={JSON.parse(JSON.stringify(user))}
            open={editSocialLinksModalActive}
            onClose={() => setEditSocialLinksModalActive(false)}
          />
          <CreateIdentityModal
            open={createIdentityModalActive}
            onClose={() => setCreateIdentityModalActive(false)}
          />
        </>
      </div>
    </NestedLayout>
  )
}
