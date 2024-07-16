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
  IdentityPresenter,
  OpenAPI,
  UserPresenter,
  UserTotalsPresenter,
} from '@0xintuition/api'

import EditProfileModal from '@components/edit-profile/modal'
import EditSocialLinksModal from '@components/edit-social-links-modal'
import { NestedLayout } from '@components/nested-layout'
import { ProfileSocialAccounts } from '@components/profile-social-accounts'
import StakeModal from '@components/stake/stake-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  editProfileModalAtom,
  editSocialLinksModalAtom,
  stakeModalAtom,
} from '@lib/state/store'
import { userProfileRouteOptions } from '@lib/utils/constants'
import {
  fetchIdentity,
  fetchUserTotals,
  getUserByWallet,
} from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  getAuthHeaders,
  invariant,
  sliceString,
} from '@lib/utils/misc'
import { User } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import {
  Outlet,
  useMatches,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'
import { requireUser } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { getPrivyAccessToken } from '@server/privy'
import * as blockies from 'blockies-ts'
import { useAtom } from 'jotai'
import { VaultDetailsType } from 'types/vault'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address

  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  logger('accessToken', accessToken)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const userIdentity = await fetchIdentity(userWallet)

  if (!userIdentity) {
    return redirect('/create')
  }

  const userObject = await getUserByWallet(userWallet)

  if (!userObject) {
    logger('No user found in DB')
    return
  }

  const userTotals = await fetchUserTotals(userObject.id)

  let vaultDetails: VaultDetailsType | null = null

  if (userIdentity !== undefined && userIdentity.vault_id) {
    try {
      vaultDetails = await getVaultDetails(
        userIdentity.contract,
        userIdentity.vault_id,
        userWallet as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  return json({
    privyUser: user,
    userWallet,
    userIdentity,
    userObject,
    userTotals,
    vaultDetails,
  })
}

export default function Profile() {
  const { privyUser, userWallet, userIdentity, userTotals, vaultDetails } =
    useLiveLoader<{
      privyUser: User
      userWallet: string
      userIdentity: IdentityPresenter
      userObject: UserPresenter
      userTotals: UserTotalsPresenter
      vaultDetails: VaultDetailsType
    }>(['attest', 'create'])

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : userIdentity

  const { user_asset_delta } = userIdentity

  const imgSrc = blockies.create({ seed: userWallet }).toDataURL()

  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)

  const [editSocialLinksModalActive, setEditSocialLinksModalActive] = useAtom(
    editSocialLinksModalAtom,
  )

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)

  const revalidator = useRevalidator()
  const navigate = useNavigate()

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

  if (!userIdentity.user) {
    return null
  }

  return (
    <NestedLayout outlet={Outlet} options={userProfileRouteOptions}>
      <div className="flex flex-col">
        <>
          <div className="w-[300px] h-[230px] flex-col justify-start items-start gap-5 inline-flex">
            <ProfileCard
              variant="user"
              avatarSrc={userIdentity.user.image ?? imgSrc}
              name={userIdentity.user.display_name ?? ''}
              walletAddress={
                userIdentity.user.ens_name ??
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
                onClick={() => setEditProfileModalActive(true)}
              >
                Edit Profile
              </Button>
            </ProfileCard>
            <ProfileSocialAccounts
              privyUser={JSON.parse(JSON.stringify(privyUser))}
              handleOpenEditSocialLinksModal={() =>
                setEditSocialLinksModalActive(true)
              }
            />
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
                    user_assets !== null && assets_sum
                      ? +calculatePercentageOfTvl(
                          user_assets ?? '0',
                          assets_sum,
                        )
                      : 0
                  }
                />
                <PositionCardFeesAccrued
                  amount={
                    user_asset_delta
                      ? +formatBalance(
                          +(user_assets ?? 0) - +user_asset_delta,
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
              tvl={+formatBalance(assets_sum)}
              holders={userIdentity.num_positions}
              onBuyClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'deposit',
                  modalType: 'identity',
                  isOpen: true,
                }))
              }
              onViewAllClick={() => navigate('/app/profile/data-about')}
            />
          </div>
          <EditProfileModal
            userObject={userIdentity.user}
            open={editProfileModalActive}
            onClose={() => setEditProfileModalActive(false)}
          />
          <EditSocialLinksModal
            privyUser={JSON.parse(JSON.stringify(privyUser))}
            open={editSocialLinksModalActive}
            onClose={() => setEditSocialLinksModalActive(false)}
          />
          <StakeModal
            userWallet={userWallet}
            contract={userIdentity.contract}
            open={stakeModalActive.isOpen}
            identity={userIdentity}
            vaultDetails={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
              }))
            }}
          />
        </>
      </div>
    </NestedLayout>
  )
}
