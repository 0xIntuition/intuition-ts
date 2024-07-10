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
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
  OpenAPI,
  UserTotalsPresenter,
} from '@0xintuition/api'

import FollowModal from '@components/follow/follow-modal'
import { NestedLayout } from '@components/nested-layout'
import StakeModal from '@components/stake/stake-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { followModalAtom, stakeModalAtom } from '@lib/state/store'
import { userIdentityRouteOptions } from '@lib/utils/constants'
import { fetchUserIdentity, fetchUserTotals } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  getAuthHeaders,
  sliceString,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
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

  if (wallet === user?.details?.wallet?.address) {
    throw redirect('/app/profile')
  }

  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const userIdentity = await fetchUserIdentity(wallet)

  if (!userIdentity) {
    return redirect('/create')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    logger('Invalid or missing creator ID')
    return
  }

  const userTotals = await fetchUserTotals(userIdentity.creator.id)

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

  console.log('vaultDetails', vaultDetails)

  let followClaim: ClaimPresenter | undefined = undefined
  let followVaultDetails: VaultDetailsType | undefined = undefined

  if (userIdentity.follow_claim_id) {
    try {
      followClaim = await ClaimsService.getClaimById({
        id: userIdentity.follow_claim_id,
      })
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        followClaim = undefined
        logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      } else {
        throw error
      }
    }
  }

  console.log('followClaim', followClaim)

  if (userIdentity.user && followClaim && followClaim.vault_id) {
    try {
      followVaultDetails = await getVaultDetails(
        followClaim.contract,
        followClaim.vault_id,
        userIdentity.user.wallet as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch followVaultDetails', error)
      followVaultDetails = undefined
    }
  }

  logger('followVaultDetails', followVaultDetails)

  return json({
    wallet,
    user,
    userIdentity,
    userTotals,
    followClaim,
    followVaultDetails,
    vaultDetails,
  })
}

export default function Profile() {
  const {
    wallet,
    user,
    userIdentity,
    userTotals,
    followClaim,
    followVaultDetails,
    vaultDetails,
  } = useLiveLoader<{
    wallet: string
    user: SessionUser
    userIdentity: IdentityPresenter
    userTotals: UserTotalsPresenter
    followClaim: ClaimPresenter
    followVaultDetails: VaultDetailsType
    vaultDetails: VaultDetailsType
  }>(['attest', 'create'])

  const { user_assets = '0', assets_sum = '0' } = vaultDetails
    ? vaultDetails
    : userIdentity

  logger('followVaultDetails', followVaultDetails)

  const { user_asset_delta } = userIdentity

  const imgSrc = blockies.create({ seed: wallet }).toDataURL()

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [followModalActive, setFollowModalActive] = useAtom(followModalAtom)

  return (
    <NestedLayout outlet={Outlet} options={userIdentityRouteOptions}>
      <div className="flex flex-col">
        <>
          <div className="w-[300px] h-[230px] flex-col justify-start items-start gap-5 inline-flex">
            <ProfileCard
              variant="user"
              avatarSrc={userIdentity?.user?.image ?? imgSrc}
              name={userIdentity?.user?.display_name ?? ''}
              walletAddress={
                userIdentity?.user?.ens_name ??
                sliceString(userIdentity?.user?.wallet, 6, 4)
              }
              stats={{
                numberOfFollowers: userTotals.follower_count,
                numberOfFollowing: userTotals.followed_count,
                points: userTotals.user_points,
              }}
              bio={userIdentity?.user?.description ?? ''}
            >
              <Button
                variant="secondary"
                className="w-full"
                onClick={() =>
                  setFollowModalActive((prevState) => ({
                    ...prevState,
                    mode: 'redeem',
                    modalType: 'identity',
                    isOpen: true,
                  }))
                }
              >
                {followVaultDetails &&
                (followVaultDetails?.user_conviction ?? '0') > '0'
                  ? `Following · ${formatBalance(followVaultDetails.user_assets ?? '0', 18, 4)} ETH`
                  : 'Follow'}
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
                    user_assets !== null && assets_sum
                      ? +calculatePercentageOfTvl(user_assets, assets_sum)
                      : 0
                  }
                />
                <PositionCardFeesAccrued
                  amount={
                    user_asset_delta
                      ? +formatBalance(+user_assets - +user_asset_delta, 18, 5)
                      : 0
                  }
                />
                <PositionCardLastUpdated timestamp={userIdentity.updated_at} />
              </PositionCard>
            ) : null}
            <StakeCard
              tvl={+formatBalance(assets_sum ?? '0')}
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
            user={user as SessionUser}
            contract={userIdentity.contract}
            open={stakeModalActive.isOpen}
            identity={userIdentity}
            vaultDetails={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
                mode: undefined,
              }))
            }}
          />
          <FollowModal
            user={user as SessionUser}
            contract={userIdentity.contract}
            open={followModalActive.isOpen}
            identity={userIdentity}
            claim={followClaim}
            vaultDetails={followVaultDetails}
            onClose={() => {
              setFollowModalActive((prevState) => ({
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
