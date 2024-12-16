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
  IdentityPresenter,
  UserPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetAtomQuery,
  GetConnectionsCountDocument,
  GetConnectionsCountQuery,
  GetConnectionsCountQueryVariables,
  GetTagsDocument,
  GetTagsQuery,
  GetTagsQueryVariables,
  useGetAccountQuery,
  useGetConnectionsCountQuery,
  useGetTagsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import FollowModal from '@components/follow/follow-modal'
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import SaveListModal from '@components/save-list/save-list-modal'
import { SegmentedNav } from '@components/segmented-nav'
import ShareCta from '@components/share-cta'
import ShareModal from '@components/share-modal'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getIdentityOrPending } from '@lib/services/identities'
import { getPurchaseIntentsByAddress } from '@lib/services/phosphor'
import {
  followModalAtom,
  imageModalAtom,
  saveListModalAtom,
  shareModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  calculatePointsFromFees,
  formatBalance,
  identityToAtom,
  invariant,
} from '@lib/utils/misc'
import { User } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useMatches, useNavigate } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser } from '@server/auth'
import { getRelicCount } from '@server/relics'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
  userIdentityRouteOptions,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { useAtom } from 'jotai'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined in params')
  }

  const queryAddress = wallet.toLowerCase()

  if (wallet.toLowerCase() === userWallet.toLowerCase()) {
    throw redirect(PATHS.PROFILE)
  }

  const queryClient = new QueryClient()

  // TODO: Remove this relic hold/mint count and points calculation when it is stored in BE.
  const relicHoldCount = await getRelicCount(userWallet as `0x${string}`)

  const userCompletedMints = await getPurchaseIntentsByAddress(
    wallet,
    'CONFIRMED',
  )

  const relicMintCount = userCompletedMints.data?.total_results

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

  let accountResult: GetAccountQuery | null = null

  try {
    logger('Fetching Account Data...')
    accountResult = await fetcher<GetAccountQuery, GetAccountQueryVariables>(
      GetAccountDocument,
      { address: queryAddress },
    )()

    if (!accountResult) {
      throw new Error('No account data found for address')
    }

    if (!accountResult.account?.atom_id) {
      throw new Error('No atom ID found for account')
    }

    await queryClient.prefetchQuery({
      queryKey: ['get-account', { address: queryAddress }],
      queryFn: () => accountResult,
    })

    const accountTagsResult = await fetcher<
      GetTagsQuery,
      GetTagsQueryVariables
    >(GetTagsDocument, {
      subjectId: accountResult.account.atom_id,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    })()

    logger('Account Tags Result:', accountTagsResult)

    await queryClient.prefetchQuery({
      queryKey: [
        'get-tags',
        {
          subjectId: accountResult.account.atom_id,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      queryFn: () => accountTagsResult,
    })

    const accountConnectionsCountResult = await fetcher<
      GetConnectionsCountQuery,
      GetConnectionsCountQueryVariables
    >(GetConnectionsCountDocument, {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountResult.account.atom_id,
      address: queryAddress,
    })()

    logger('Account Connections Count Result:', accountConnectionsCountResult)

    await queryClient.prefetchQuery({
      queryKey: [
        'get-connections-count',
        {
          address: queryAddress,
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          objectId: accountResult.account.atom_id,
        },
      ],
      queryFn: () => accountConnectionsCountResult,
    })
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      queryAddress,
    })
    throw error
  }

  return json({
    privyUser: user,
    userWallet,
    userIdentity,
    userTotals,
    isPending,
    relicHoldCount: relicHoldCount.toString(),
    relicMintCount,
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      subjectId: accountResult?.account?.atom_id,
      queryAddress,
    },
  })
}

export interface ProfileLoaderData {
  privyUser: User
  userWallet: string
  userIdentity: IdentityPresenter
  userTotals: UserTotalsPresenter
  isPending: boolean
  relicMintCount: number
  relicHoldCount: string
  initialParams: {
    queryAddress: string
    subjectId: string
  }
}

export default function Profile() {
  const {
    userWallet,
    userIdentity,
    userTotals,
    relicMintCount,
    relicHoldCount,
    initialParams,
  } = useLiveLoader<ProfileLoaderData>(['attest', 'create'])

  // TODO: Remove this once the `status is added to atoms -- that will be what we check if something is pending. For now setting this to false and removing the legacy isPending check
  const isPending = false

  const { data: accountResult } = useGetAccountQuery(
    {
      address: initialParams.queryAddress,
    },
    {
      queryKey: ['get-account', { address: initialParams.queryAddress }],
    },
  )

  const { data: accountTagsResult } = useGetTagsQuery(
    {
      subjectId: accountResult?.account?.atom_id,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    {
      queryKey: [
        'get-tags',
        {
          subjectId: initialParams?.subjectId,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      enabled: !!accountResult?.account?.atom_id,
    },
  )

  const { data: accountConnectionsCountResult } = useGetConnectionsCountQuery(
    {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountResult?.account?.atom_id,
      address: initialParams.queryAddress,
    },
    {
      queryKey: [
        'get-connections-count',
        {
          address: initialParams.queryAddress,
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          objectId: accountResult?.account?.atom_id,
        },
      ],
    },
  )

  const { data: vaultDetails } = useGetVaultDetails(
    MULTIVAULT_CONTRACT_ADDRESS,
    accountResult?.account?.atom_id,
    undefined, // no counterVaultId
    {
      queryKey: [
        'get-vault-details',
        MULTIVAULT_CONTRACT_ADDRESS,
        accountResult?.account?.atom_id,
      ],
    },
  )

  logger('Account Result:', accountResult)
  logger('Account Tags Result:', accountTagsResult)
  logger('Account Connections Count Result:', accountConnectionsCountResult)
  logger('tags', accountTagsResult && accountTagsResult?.triples)
  logger('Vault Details:', vaultDetails)

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : userIdentity

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)
  const [followModalActive, setFollowModalActive] = useAtom(followModalAtom)

  const [selectedTag, setSelectedTag] = useState<
    IdentityPresenter | null | undefined
  >(null)

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

  const navigate = useNavigate()
  const matches = useMatches()
  const currentPath = matches[matches.length - 1].pathname

  // List of paths that should not use the ProfileLayout
  const excludedPaths = [PATHS.PROFILE_CREATE]

  if (excludedPaths.includes(currentPath)) {
    return <Outlet />
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
        avatarSrc={accountResult?.account?.image ?? ''}
        name={accountResult?.account?.label ?? ''}
        id={accountResult?.account?.id ?? ''}
        vaultId={accountResult?.account?.atom_id ?? 0}
        stats={{
          numberOfFollowers:
            accountConnectionsCountResult?.followers_count?.[0]?.vault
              ?.positions_aggregate?.aggregate?.count ?? 0,
          numberOfFollowing:
            accountConnectionsCountResult?.following_count?.aggregate?.count ??
            0,
          points: totalPoints,
        }}
        bio={accountResult?.account?.atom?.value?.person?.description ?? ''}
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${accountResult?.account?.id}`}
        followingLink={`${PATHS.PROFILE_CONNECTIONS}?tab=following`}
        followerLink={`${PATHS.PROFILE_CONNECTIONS}?tab=followers`}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
          })
        }}
      >
        {!isPending && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              setFollowModalActive((prevState) => ({
                ...prevState,
                isOpen: true,
              }))
            }
          >
            <>
              <Icon name={IconName.peopleAdd} className="h-4 w-4" />
              Follow
            </>
          </Button>
        )}
      </ProfileCard>
      {!isPending && (
        <>
          <Tags>
            <div className="flex flex-row gap-2 md:flex-col">
              {accountTagsResult && accountTagsResult.triples.length > 0 ? (
                <TagsContent
                  numberOfTags={accountTagsResult.triples.length ?? 0}
                >
                  {accountTagsResult.triples.slice(0, 5).map((tag) => (
                    <TagWithValue
                      key={tag.id}
                      label={tag.object?.label ?? ''}
                      value={tag.vault?.allPositions?.aggregate?.count ?? 0}
                      onStake={() => {
                        setSelectedTag(
                          tag?.object as unknown as IdentityPresenter,
                        ) // TODO: (ENG-4782) temporary type fix until we lock in final types
                        setSaveListModalActive({
                          isOpen: true,
                          id: tag.id,
                          tag: tag.object as unknown as IdentityPresenter, // TODO: (ENG-4782) temporary type fix until we lock in final types
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
                }} // TODO: The View All Tags modal is currently not working -- there are issues that we will fix in another ticket
              >
                <Icon name="plus-small" className="w-5 h-5" />
                Add tags
              </Tag>
            </div>

            <TagsButton
              className="text-warning"
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
                  identity: {
                    // TODO: (ENG-4782) temporary type fix until we lock in final types
                    id: accountResult?.account?.id ?? '',
                    label: accountResult?.account?.label ?? '',
                    image: accountResult?.account?.image ?? '',
                    vault_id: accountResult?.account?.atom_id,
                    assets_sum: '0',
                    user_assets: '0',
                    contract: MULTIVAULT_CONTRACT_ADDRESS,
                    asset_delta: '0',
                    conviction_price: '0',
                    conviction_price_delta: '0',
                    conviction_sum: '0',
                    num_positions: 0,
                    price: '0',
                    price_delta: '0',
                    status: 'active',
                    total_conviction: '0',
                    type: 'user',
                    updated_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    creator_address: '',
                    display_name: accountResult?.account?.label ?? '',
                    follow_vault_id: '',
                    user: null,
                    creator: null,
                    identity_hash: '',
                    identity_id: '',
                    is_contract: false,
                    is_user: true,
                    pending: false,
                    pending_type: null,
                    pending_vault_id: null,
                  } as unknown as IdentityPresenter,
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
              {/* <PositionCardLastUpdated timestamp={userIdentity.updated_at} /> */}
            </PositionCard> // TODO: Add last updated when we have it available
          ) : null}
          <IdentityStakeCard
            tvl={+formatBalance(assets_sum)}
            holders={accountResult?.account?.atom?.vault?.position_count ?? 0}
            variant={Identity.user} // TODO: Use the atom type to determine this once we have these
            // identityImgSrc={getAtomImage(accountResult?.account)} // TODO: Modify our utils and then re-add this
            identityImgSrc={accountResult?.account?.image ?? ''}
            // identityDisplayName={getAtomLabel(accountResult?.account)}
            identityDisplayName={accountResult?.account?.label ?? ''}
            onBuyClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'identity',
                identity: {
                  // TODO: (ENG-4782) temporary type fix until we lock in final types
                  id: accountResult?.account?.id ?? '',
                  label: accountResult?.account?.label ?? '',
                  image: accountResult?.account?.image ?? '',
                  vault_id: accountResult?.account?.atom_id,
                  assets_sum: '0',
                  user_assets: '0',
                  contract: MULTIVAULT_CONTRACT_ADDRESS,
                  asset_delta: '0',
                  conviction_price: '0',
                  conviction_price_delta: '0',
                  conviction_sum: '0',
                  num_positions: 0,
                  price: '0',
                  price_delta: '0',
                  status: 'active',
                  total_conviction: '0',
                  type: 'user',
                  updated_at: new Date().toISOString(),
                  created_at: new Date().toISOString(),
                  creator_address: '',
                  display_name: accountResult?.account?.label ?? '',
                  follow_vault_id: '',
                  user: null,
                  creator: null,
                  identity_hash: '',
                  identity_id: '',
                  is_contract: false,
                  is_user: true,
                  pending: false,
                  pending_type: null,
                  pending_vault_id: null,
                } as unknown as IdentityPresenter,
                isOpen: true,
              }))
            }
            onViewAllClick={() => navigate(PATHS.PROFILE_DATA_ABOUT)}
          />
        </>
      )}
      <ShareCta
        onShareClick={() =>
          setShareModalActive({
            isOpen: true,
            currentPath: location.pathname,
          })
        }
      />
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
          <StakeModal
            userWallet={userWallet}
            contract={MULTIVAULT_CONTRACT_ADDRESS}
            open={stakeModalActive.isOpen}
            identity={
              accountResult?.account
                ? ({
                    id: accountResult?.account?.id ?? '',
                    label: accountResult?.account?.label ?? '',
                    image: accountResult?.account?.image ?? '',
                    vault_id: accountResult?.account?.atom_id,
                    assets_sum: '0',
                    user_assets: '0',
                    contract: MULTIVAULT_CONTRACT_ADDRESS,
                    asset_delta: '0',
                    conviction_price: '0',
                    conviction_price_delta: '0',
                    conviction_sum: '0',
                    num_positions: 0,
                    price: '0',
                    price_delta: '0',
                    status: 'active',
                    total_conviction: '0',
                    type: 'user',
                    updated_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    creator_address: '',
                    display_name: accountResult?.account?.label ?? '',
                    follow_vault_id: '',
                    user: null,
                    creator: null,
                    identity_hash: '',
                    identity_id: '',
                    is_contract: false,
                    is_user: true,
                    pending: false,
                    pending_type: null,
                    pending_vault_id: null,
                  } as unknown as IdentityPresenter)
                : undefined
            } // TODO: (ENG-4782) temporary type fix until we lock in final types
            vaultId={stakeModalActive.vaultId}
            vaultDetailsProp={vaultDetails}
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
            identityLabel={accountResult?.account?.label ?? ''}
            identityAvatar={accountResult?.account?.image ?? ''}
            identityVaultId={accountResult?.account?.atom_id}
            onClose={() => {
              setFollowModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
              }))
            }}
          />
          <TagsModal
            identity={
              accountResult?.account
                ? ({
                    id: accountResult?.account?.id ?? '',
                    label: accountResult?.account?.label ?? '',
                    image: accountResult?.account?.image ?? '',
                    vault_id: accountResult?.account?.atom_id,
                    assets_sum: '0',
                    user_assets: '0',
                    contract: MULTIVAULT_CONTRACT_ADDRESS,
                    asset_delta: '0',
                    conviction_price: '0',
                    conviction_price_delta: '0',
                    conviction_sum: '0',
                    num_positions: 0,
                    price: '0',
                    price_delta: '0',
                    status: 'active',
                    total_conviction: '0',
                    type: 'user',
                    updated_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    creator_address: '',
                    display_name: accountResult?.account?.label ?? '',
                    follow_vault_id: '',
                    user: null,
                    creator: null,
                    identity_hash: '',
                    identity_id: '',
                    is_contract: false,
                    is_user: true,
                    pending: false,
                    pending_type: null,
                    pending_vault_id: null,
                  } as unknown as IdentityPresenter)
                : undefined
            } // TODO: (ENG-4782) temporary type fix until we lock in final types
            tagClaims={accountTagsResult?.triples ?? []} // TODO: (ENG-4782) temporary type fix until we lock in final types
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
              tagAtom={
                identityToAtom(
                  saveListModalActive.tag ?? selectedTag,
                ) as unknown as GetAtomQuery['atom']
              }
              atom={
                identityToAtom(userIdentity) as unknown as GetAtomQuery['atom']
              }
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
        displayName={accountResult?.account?.label ?? ''}
        imageSrc={accountResult?.account?.image ?? ''}
        isUser={
          accountResult?.account?.type === ('Account' || 'Person' || 'Default')
        }
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />
      <ShareModal
        currentPath={location.pathname}
        open={shareModalActive.isOpen}
        onClose={() =>
          setShareModalActive({
            ...shareModalActive,
            isOpen: false,
          })
        }
      />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/layout" />
}
