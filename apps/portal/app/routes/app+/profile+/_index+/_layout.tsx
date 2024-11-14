import { useEffect, useState } from 'react'

import {
  Banner,
  Button,
  Icon,
  IconName,
  Identity,
  IdentityStakeCard,
  PieChartVariant,
  PositionCard,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  ProfileCard,
  Tag,
  Tags,
  TagsButton,
  TagsContent,
  TagWithValue,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
  UserPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import PrivyRevalidate from '@client/privy-revalidate'
import EditProfileModal from '@components/edit-profile/modal'
import EditSocialLinksModal from '@components/edit-social-links-modal'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import { ProfileSocialAccounts } from '@components/profile-social-accounts'
import ImageModal from '@components/profile/image-modal'
import SaveListModal from '@components/save-list/save-list-modal'
import { SegmentedNav } from '@components/segmented-nav'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getIdentityOrPending } from '@lib/services/identities'
import { getPurchaseIntentsByAddress } from '@lib/services/phosphor'
import { getTags } from '@lib/services/tags'
import {
  editProfileModalAtom,
  editSocialLinksModalAtom,
  imageModalAtom,
  saveListModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  calculatePointsFromFees,
  formatBalance,
  getAtomImage,
  getAtomLabel,
  invariant,
} from '@lib/utils/misc'
import { User } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  useMatches,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { getRelicCount } from '@server/relics'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
  userIdentityRouteOptions,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  // TODO: Remove this relic hold/mint count and points calculation when it is stored in BE.
  const relicHoldCount = await getRelicCount(userWallet as `0x${string}`)

  const userCompletedMints = await getPurchaseIntentsByAddress(
    userWallet,
    'CONFIRMED',
  )

  const relicMintCount = userCompletedMints.data?.total_results

  const userObject = await fetchWrapper(request, {
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet: userWallet,
    },
  })
  invariant(userObject, 'No user object found.')

  const { identity: userIdentity, isPending } = await getIdentityOrPending(
    request,
    wallet,
  )

  invariant(userIdentity, 'No user identity found')

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

  let followClaim: ClaimPresenter | null = null

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

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const { tagClaims } = await getTags({
    request,
    subjectId: userIdentity.id,
    searchParams,
  })

  return json({
    privyUser: user,
    userWallet,
    userIdentity,
    tagClaims,
    userObject,
    userTotals,
    vaultDetails,
    followClaim,
    isPending,
    relicHoldCount: relicHoldCount.toString(),
    relicMintCount,
  })
}

export interface ProfileLoaderData {
  privyUser: User
  userWallet: string
  userIdentity: IdentityPresenter
  tagClaims: ClaimPresenter[]
  userObject: UserPresenter
  userTotals: UserTotalsPresenter
  vaultDetails: VaultDetailsType
  followClaim: ClaimPresenter
  isPending: boolean
  relicMintCount: number
  relicHoldCount: string
}

export default function Profile() {
  const {
    userObject: user,
    privyUser,
    userWallet,
    userIdentity,
    tagClaims,
    userTotals,
    vaultDetails,
    isPending,
    relicMintCount,
    relicHoldCount,
  } = useLiveLoader<ProfileLoaderData>(['attest', 'create'])

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : userIdentity

  const [userObject, setUserObject] = useState<
    UserPresenter | null | undefined
  >(userIdentity.user ?? user)
  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)
  const [editSocialLinksModalActive, setEditSocialLinksModalActive] = useAtom(
    editSocialLinksModalAtom,
  )
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)

  const [selectedTag, setSelectedTag] = useState<
    IdentityPresenter | null | undefined
  >(null)

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

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
        avatarSrc={userObject.image ?? ''}
        name={userObject.display_name ?? ''}
        id={userObject.ens_name ?? userObject.wallet}
        vaultId={userIdentity.vault_id}
        stats={{
          numberOfFollowers: userTotals.follower_count,
          numberOfFollowing: userTotals.followed_count,
          // TODO: Remove this relic hold/mint count and points calculation when it is stored in BE.
          points: totalPoints,
        }}
        bio={userObject.description ?? ''}
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${userObject.wallet}`}
        followingLink={`${PATHS.PROFILE_CONNECTIONS}?tab=following`}
        followerLink={`${PATHS.PROFILE_CONNECTIONS}?tab=followers`}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
            identity: userIdentity,
          })
        }}
      >
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setEditProfileModalActive(true)}
        >
          <Icon name={IconName.avatarSparkle} className="h-4 w-4" /> Edit
          Profile
        </Button>
      </ProfileCard>
      <ProfileSocialAccounts
        privyUser={JSON.parse(JSON.stringify(privyUser))}
        handleOpenEditSocialLinksModal={() =>
          setEditSocialLinksModalActive(true)
        }
      />
      {!isPending && (
        <>
          <Tags>
            <div className="flex flex-col gap-2">
              {Array.isArray(tagClaims) && tagClaims.length > 0 ? (
                <TagsContent numberOfTags={tagClaims?.length ?? 0}>
                  {tagClaims.slice(0, 5).map((tagClaim) => (
                    <TagWithValue
                      key={tagClaim.claim_id}
                      label={tagClaim.object?.display_name}
                      value={tagClaim.num_positions}
                      onStake={() => {
                        setSelectedTag(tagClaim.object)
                        setSaveListModalActive({
                          isOpen: true,
                          id: tagClaim.vault_id,
                          tag: tagClaim.object,
                        })
                      }}
                    />
                  ))}
                </TagsContent>
              ) : null}
              <Tag
                className="w-fit border-dashed"
                onClick={() => {
                  setTagsModalActive({ isOpen: true, mode: 'add' })
                }}
              >
                <Icon name="plus-small" className="w-5 h-5" />
                Add tags
              </Tag>
            </div>

            <TagsButton
              onClick={() => {
                setTagsModalActive({ isOpen: true, mode: 'view' })
              }}
            />
          </Tags>
          {vaultDetails !== null && user_assets !== '0' ? (
            <PositionCard
              onButtonClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'redeem',
                  modalType: 'identity',
                  identity: userIdentity,
                  isOpen: true,
                }))
              }
            >
              <PositionCardStaked
                amount={user_assets ? +formatBalance(user_assets, 18) : 0}
              />
              <PositionCardOwnership
                percentOwnership={
                  user_assets !== null && assets_sum
                    ? +calculatePercentageOfTvl(user_assets ?? '0', assets_sum)
                    : 0
                }
                variant={PieChartVariant.default}
              />
              <PositionCardLastUpdated timestamp={userIdentity.updated_at} />
            </PositionCard>
          ) : null}
          <IdentityStakeCard
            tvl={+formatBalance(assets_sum)}
            holders={userIdentity.num_positions}
            variant={userIdentity.is_user ? Identity.user : Identity.nonUser}
            identityImgSrc={getAtomImage(userIdentity)}
            identityDisplayName={getAtomLabel(userIdentity)}
            onBuyClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'identity',
                identity: userIdentity,
                isOpen: true,
              }))
            }
            onViewAllClick={() => navigate(PATHS.PROFILE_DATA_ABOUT)}
          />
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
        <SegmentedNav options={userIdentityRouteOptions} />
      </div>
      <Outlet />
    </>
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      {!isPending && (
        <>
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
            vaultDetailsProp={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
              }))
            }}
          />
          <TagsModal
            identity={userIdentity}
            tagClaims={tagClaims}
            userWallet={userWallet}
            open={tagsModalActive.isOpen}
            mode={tagsModalActive.mode}
            onClose={() => {
              setTagsModalActive({
                ...tagsModalActive,
                isOpen: false,
              })
              setSelectedTag(undefined)
            }}
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

      <PrivyRevalidate />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/layout" />
}
