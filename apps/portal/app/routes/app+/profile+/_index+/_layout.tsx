import React, { useEffect, useState } from 'react'

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
  UserPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import PrivyRevalidate from '@client/privy-revalidate'
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
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  fetchWrapper,
  formatBalance,
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
import { requireUser, requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import * as blockies from 'blockies-ts'
import { NO_WALLET_ERROR, PATHS, userProfileRouteOptions } from 'consts'
import { useAtom } from 'jotai'
import { VaultDetailsType } from 'types/vault'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  let userIdentity
  try {
    userIdentity = await fetchWrapper({
      method: IdentitiesService.getIdentityById,
      args: { id: userWallet },
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw redirect('/create')
    }
    logger('Error fetching userIdentity', error)
    throw error
  }

  const userObject = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: userWallet,
    },
  })

  const userTotals = await fetchWrapper({
    method: UsersService.getUserTotals,
    args: {
      id: userObject.id,
    },
  })

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

export interface ProfileLoaderData {
  privyUser: User
  userWallet: string
  userIdentity: IdentityPresenter
  userObject: UserPresenter
  userTotals: UserTotalsPresenter
  vaultDetails: VaultDetailsType
}

export default function Profile() {
  const {
    userObject: user,
    privyUser,
    userWallet,
    userIdentity,
    userTotals,
    vaultDetails,
  } = useLiveLoader<{
    privyUser: User
    userWallet: string
    userIdentity: IdentityPresenter
    userObject: UserPresenter
    userTotals: UserTotalsPresenter
    vaultDetails: VaultDetailsType
  }>(['attest', 'create'])

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : userIdentity

  const { user_asset_delta } = userIdentity

  const [userObject, setUserObject] = useState<
    UserPresenter | null | undefined
  >(userIdentity.user ?? user)

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
  const excludedPaths = [PATHS.PROFILE_CREATE]

  if (excludedPaths.includes(currentPath)) {
    return <Outlet />
  }

  if (!userObject) {
    return null
  }
  logger('userIdentity', userIdentity)
  return (
    <NestedLayout outlet={Outlet} options={userProfileRouteOptions}>
      <div className="flex-col justify-start items-start gap-5 inline-flex">
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
                  ? +calculatePercentageOfTvl(user_assets ?? '0', assets_sum)
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
          onViewAllClick={() => navigate(PATHS.PROFILE_DATA_ABOUT)}
        />
      </div>
      <EditProfileModal
        userObject={userObject}
        setUserObject={setUserObject}
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
      <PrivyRevalidate />
    </NestedLayout>
  )
}
