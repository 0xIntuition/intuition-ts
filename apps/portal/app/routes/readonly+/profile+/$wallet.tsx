import {
  Banner,
  BannerVariant,
  ProfileCard,
  Tags,
  TagsButton,
  TagsContent,
  TagWithValue,
} from '@0xintuition/1ui'
import {
  IdentityPresenter,
  UserPresenter,
  UsersService,
} from '@0xintuition/api'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
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
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import ReadOnlyBanner from '@components/read-only-banner'
import { SegmentedNav } from '@components/segmented-nav'
import TagsModal from '@components/tags/tags-modal'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { getIdentityOrPending } from '@lib/services/identities'
import { getPurchaseIntentsByAddress } from '@lib/services/phosphor'
import { imageModalAtom, tagsModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { calculatePointsFromFees, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { getRelicCount } from '@server/relics'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  PATHS,
  readOnlyUserIdentityRouteOptions,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { useAtom } from 'jotai'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const wallet = params.wallet
  invariant(wallet, 'Wallet is undefined in params')

  const queryAddress = wallet.toLowerCase()

  const queryClient = new QueryClient()

  // TODO: Remove this relic hold/mint count and points calculation when it is stored in BE.
  const relicHoldCount = await getRelicCount(wallet as `0x${string}`)

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
    userWallet: wallet,
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

export default function ReadOnlyProfile() {
  const {
    userWallet,
    userTotals,
    relicMintCount,
    relicHoldCount,
    initialParams,
  } = useLoaderData<typeof loader>()

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

  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)

  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)

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
      />

      {!isPending && (
        <>
          <Tags>
            {accountTagsResult && accountTagsResult.triples.length > 0 ? (
              <TagsContent
                numberOfTags={accountTagsResult?.triples.length ?? 0}
              >
                {accountTagsResult?.triples
                  .slice(0, 5)
                  .map((tag) => (
                    <TagWithValue
                      key={tag.id}
                      label={tag.object?.label ?? ''}
                      value={tag.vault?.allPositions?.aggregate?.count ?? 0}
                    />
                  ))}
              </TagsContent>
            ) : null}
            <TagsButton
              onClick={() => {
                setTagsModalActive({
                  isOpen: true,
                  mode: 'view',
                  readOnly: true,
                })
              }}
            />
          </Tags>
        </>
      )}
      <ReadOnlyBanner
        variant={BannerVariant.warning}
        to={`${PATHS.PROFILE}/${userWallet}`}
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
        <SegmentedNav options={readOnlyUserIdentityRouteOptions} />
      </div>
      <Outlet />
    </>
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      {!isPending && (
        <>
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
            readOnly={tagsModalActive.readOnly}
            onClose={() => {
              setTagsModalActive({
                ...tagsModalActive,
                isOpen: false,
              })
            }}
          />
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
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/$wallet" />
}
