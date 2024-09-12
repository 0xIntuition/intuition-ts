import { useEffect, useState } from 'react'

import {
  Banner,
  ProfileCard,
  Tags,
  TagsContent,
  TagWithValue,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
  TagEmbeddedPresenter,
  UserPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import FollowModal from '@components/follow/follow-modal'
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import SaveListModal from '@components/save-list/save-list-modal'
import { SegmentedNav } from '@components/segmented-nav'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getIdentityOrPending } from '@lib/services/identities'
import { getPurchaseIntentsByAddress } from '@lib/services/phosphor'
import {
  followModalAtom,
  imageModalAtom,
  saveListModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { calculatePointsFromFees, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useNavigate } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { getRelicCount } from '@server/relics'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
  readOnlyUserIdentityRouteOptions,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined in params')
  }

  const { identity: userIdentity, isPending } = await getIdentityOrPending(
    request,
    wallet,
  )

  logger('userIdentity in loader after pending check', userIdentity)

  if (!userIdentity) {
    throw new Response('Not Found', { status: 404 })
  }

  if (!userIdentity.creator) {
    throw new Response('Invalid or missing creator ID', { status: 404 })
  }

  const getCreatorId = (
    creator: string | UserPresenter | null | undefined,
  ): string | null | undefined => {
    if (creator === null || creator === undefined) {
      return creator // Returns null or undefined
    }
    if (typeof creator === 'string') {
      return creator
    }
    if ('id' in creator) {
      return creator.id
    }
    return undefined
  }

  const creatorId = getCreatorId(userIdentity.creator)
  if (!creatorId) {
    throw new Error('Invalid or missing creator ID')
  }

  const userTotals = await fetchWrapper(request, {
    method: UsersService.getUserTotals,
    args: {
      id: creatorId,
    },
  })

  if (!userTotals) {
    return logger('No user totals found')
  }

  // TODO: Remove this relic hold/mint count and points calculation when it is stored in BE.
  const relicHoldCount = await getRelicCount(wallet as `0x${string}`)

  const userCompletedMints = await getPurchaseIntentsByAddress(
    wallet,
    'CONFIRMED',
  )

  const relicMintCount = userCompletedMints.data?.total_results

  let vaultDetails: VaultDetailsType | null = null

  if (!!userIdentity && userIdentity.vault_id) {
    try {
      vaultDetails = await getVaultDetails(
        userIdentity.contract,
        userIdentity.vault_id,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  let followClaim: ClaimPresenter | null = null
  let followVaultDetails: VaultDetailsType | null = null

  const followClaimResponse = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      subject: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicate: getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      object: userIdentity.vault_id,
      page: 1,
      limit: 1,
    },
  })

  if (followClaimResponse.data && followClaimResponse.data.length) {
    followClaim = followClaimResponse.data[0]
  }

  if (userIdentity.user && followClaim) {
    try {
      followVaultDetails = await getVaultDetails(
        followClaim.contract,
        followClaim.vault_id,
      )
    } catch (error) {
      logger('Failed to fetch followVaultDetails', error)
      followVaultDetails = null
    }
  }

  return json({
    wallet,

    userIdentity,
    userTotals,
    followClaim,
    followVaultDetails,
    vaultDetails,
    isPending,
    relicHoldCount: relicHoldCount.toString(),
    relicMintCount,
  })
}

export default function ReadOnlyProfile() {
  const {
    wallet,
    userWallet,
    userIdentity,
    userTotals,
    followClaim,
    followVaultDetails,
    vaultDetails,
    isPending,
    relicMintCount,
    relicHoldCount,
  } = useLiveLoader<{
    wallet: string
    userWallet: string
    userIdentity: IdentityPresenter
    userTotals: UserTotalsPresenter
    followClaim: ClaimPresenter
    followVaultDetails: VaultDetailsType
    vaultDetails: VaultDetailsType
    isPending: boolean
    relicMintCount: number
    relicHoldCount: string
  }>(['attest', 'create'])

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [followModalActive, setFollowModalActive] = useAtom(followModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const [selectedTag, setSelectedTag] = useState<TagEmbeddedPresenter>()

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

  // TODO: Remove this relic hold/mint count and points calculation when it is stored in BE.
  const nftMintPoints = relicMintCount ? relicMintCount * 2000000 : 0
  const nftHoldPoints = relicHoldCount ? +relicHoldCount * 250000 : 0
  const totalNftPoints = nftMintPoints + nftHoldPoints

  const feePoints = calculatePointsFromFees(userTotals.total_protocol_fee_paid)

  const totalPoints =
    userTotals.referral_points +
    userTotals.quest_points +
    totalNftPoints +
    feePoints

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-5 inline-flex max-lg:w-full">
      <ProfileCard
        variant="user"
        avatarSrc={userIdentity?.user?.image ?? ''}
        name={userIdentity?.user?.display_name ?? ''}
        id={
          userIdentity?.user?.ens_name ??
          userIdentity?.user?.wallet ??
          userIdentity.identity_id
        }
        vaultId={userIdentity.vault_id}
        stats={{
          numberOfFollowers: userTotals.follower_count,
          numberOfFollowing: userTotals.followed_count,
          // TODO: Remove this relic hold/mint count and points calculation when it is stored in BE.
          points: totalPoints,
        }}
        bio={userIdentity?.user?.description ?? ''}
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${userIdentity.identity_id}`}
        followingLink={`${PATHS.PROFILE}/${wallet}/connections?tab=following`}
        followerLink={`${PATHS.PROFILE}/${wallet}/connections?tab=followers`}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
            identity: userIdentity,
          })
        }}
      />

      {!isPending && (
        <>
          <Tags>
            {userIdentity?.tags && userIdentity?.tags.length > 0 && (
              <TagsContent numberOfTags={userIdentity?.tag_count ?? 0}>
                {userIdentity?.tags?.map((tag) => (
                  <TagWithValue
                    key={tag.identity_id}
                    label={tag.display_name}
                    value={tag.num_tagged_identities}
                  />
                ))}
              </TagsContent>
            )}
          </Tags>
        </>
      )}
    </div>
  )

  const rightPanel = isPending ? (
    <Banner
      variant="warning"
      title="Please Refresh the Page"
      message="It looks like the on-chain transaction was successful, but we're still waiting for the information to update. Please refresh the page to ensure everything is up to date."
    >
      <NavigationButton
        reloadDocument
        variant="secondary"
        to=""
        className="max-lg:w-full"
      >
        Refresh
      </NavigationButton>
    </Banner>
  ) : (
    <>
      <div className="flex flex-row justify-end mb-6 max-lg:justify-center">
        <SegmentedNav options={readOnlyUserIdentityRouteOptions} />
      </div>
      <Outlet />
    </>
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      {!isPending && (
        <>
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
          <FollowModal
            userWallet={userWallet}
            contract={userIdentity.contract}
            open={followModalActive.isOpen}
            identity={userIdentity}
            claim={followClaim}
            vaultDetails={followVaultDetails}
            onClose={() => {
              setFollowModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
              }))
            }}
          />
          <TagsModal
            identity={userIdentity}
            userWallet={userWallet}
            open={tagsModalActive.isOpen}
            mode={tagsModalActive.mode}
            onClose={() =>
              setTagsModalActive({
                ...tagsModalActive,
                isOpen: false,
              })
            }
          />
          {selectedTag && (
            <SaveListModal
              contract={userIdentity.contract ?? MULTIVAULT_CONTRACT_ADDRESS}
              tag={saveListModalActive.tag ?? selectedTag}
              identity={userIdentity}
              userWallet={userWallet}
              open={saveListModalActive.isOpen}
              onClose={() =>
                setSaveListModalActive({
                  ...saveListModalActive,
                  isOpen: false,
                })
              }
              min_deposit={vaultDetails?.min_deposit}
            />
          )}
        </>
      )}
      <ImageModal
        identity={userIdentity}
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/$wallet" />
}
