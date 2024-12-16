import { useEffect, useState } from 'react'

import {
  Banner,
  Icon,
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
} from '@0xintuition/api'
import {
  fetcher,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetTagsDocument,
  GetTagsQuery,
  GetTagsQueryVariables,
  useGetAtomQuery,
  useGetTagsQuery,
} from '@0xintuition/graphql'

import { DetailInfoCard } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import SaveListModal from '@components/save-list/save-list-modal'
import ShareCta from '@components/share-cta'
import ShareModal from '@components/share-modal'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getIdentityOrPending } from '@lib/services/identities'
import { getTags } from '@lib/services/tags'
import {
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
  formatBalance,
  identityToAtom,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useNavigate } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')

  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  if (!params.id) {
    return
  }

  const queryClient = new QueryClient()

  const { identity, isPending } = await getIdentityOrPending(request, params.id)

  if (!identity) {
    throw new Response('Not Found', { status: 404 })
  }

  let list: ClaimPresenter | null = null

  try {
    const listResult = await ClaimsService.searchClaims({
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      object: identity.id,
    })

    if (listResult && listResult.data.length > 0) {
      list = listResult.data[0]
    }
  } catch (error) {
    logger('Failed to fetch list:', error)
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const { tagClaims } = await getTags({
    request,
    subjectId: identity.id,
    searchParams,
  })

  let atomResult: GetAtomQuery | null = null

  try {
    logger('Fetching Account Data...')
    atomResult = await fetcher<GetAtomQuery, GetAtomQueryVariables>(
      GetAtomDocument,
      { id: params.id },
    )()

    if (!atomResult) {
      throw new Error('No atom data found for id')
    }

    logger('Atom Result:', atomResult)

    await queryClient.prefetchQuery({
      queryKey: ['get-atom', { id: params.id }],
      queryFn: () => atomResult,
    })

    const atomTagsResult = await fetcher<GetTagsQuery, GetTagsQueryVariables>(
      GetTagsDocument,
      {
        subjectId: params.id,
        predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
      },
    )()

    logger('Atom Tags Result:', atomTagsResult)

    await queryClient.prefetchQuery({
      queryKey: [
        'get-tags',
        {
          subjectId: params.id,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      queryFn: () => atomTagsResult,
    })
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      atomId: params.id,
    })
    throw error
  }

  logger('[$ID] -- END')
  return json({
    identity,
    list,
    isPending,
    userWallet,
    tagClaims,
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      atomId: params.id,
    },
  })
}

export interface IdentityLoaderData {
  identity: IdentityPresenter
  list: ClaimPresenter
  userWallet: string
  tagClaims: ClaimPresenter[]
  initialParams: {
    atomId: string
  }
}

export default function IdentityDetails() {
  const { identity, userWallet, tagClaims, initialParams } =
    useLiveLoader<IdentityLoaderData>(['attest', 'create'])
  const navigate = useNavigate()

  // TODO: Remove this once the `status is added to atoms -- that will be what we check if something is pending. For now setting this to false and removing the legacy isPending check
  const isPending = false

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const [selectedTag, setSelectedTag] = useState<
    IdentityPresenter | null | undefined
  >(null)
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

  const { data: atomResult } = useGetAtomQuery(
    {
      id: initialParams.atomId,
    },
    {
      queryKey: ['get-atom', { id: initialParams.atomId }],
    },
  )

  logger('Atom Result (Client):', atomResult)

  const { data: atomTagsResult } = useGetTagsQuery(
    {
      subjectId: initialParams.atomId,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    {
      queryKey: [
        'get-tags',
        {
          subjectId: initialParams?.atomId,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      enabled: !!initialParams?.atomId,
    },
  )

  logger('Atom Tags Result (Client):', atomTagsResult)

  const { data: vaultDetails } = useGetVaultDetails(
    MULTIVAULT_CONTRACT_ADDRESS,
    initialParams.atomId,
    undefined, // no counterVaultId
    {
      queryKey: [
        'get-vault-details',
        MULTIVAULT_CONTRACT_ADDRESS,
        initialParams.atomId,
      ],
    },
  )

  logger('Vault Details:', vaultDetails)
  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : identity

  const leftPanel = (
    <div className="flex-col justify-start items-start inline-flex gap-6 max-lg:w-full">
      <ProfileCard
        variant={Identity.nonUser}
        // avatarSrc={getAtomImage(identity)} // TODO: Bring back our utils once we're ready!
        avatarSrc={atomResult?.atom?.value?.thing?.image ?? ''}
        name={atomResult?.atom?.value?.thing?.name ?? ''}
        id={atomResult?.atom?.id ?? ''}
        vaultId={atomResult?.atom?.id ?? 0}
        bio={atomResult?.atom?.value?.thing?.description ?? ''}
        ipfsLink={atomResult?.atom?.data ?? ''}
        externalLink={atomResult?.atom?.value?.thing?.url ?? ''}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
          })
        }}
      />

      {!isPending && (
        <>
          <Tags>
            <div className="flex flex-row gap-2 md:flex-col">
              {atomTagsResult && atomTagsResult.triples.length > 0 ? (
                <TagsContent numberOfTags={atomTagsResult.triples?.length ?? 0}>
                  {atomTagsResult.triples.slice(0, 5).map((tag) => (
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
                  identity: {
                    // TODO: (ENG-4782) temporary type fix until we lock in final types
                    id: atomResult?.atom?.id ?? '',
                    label: atomResult?.atom?.value?.thing?.name ?? '',
                    image: atomResult?.atom?.value?.thing?.image ?? '',
                    vault_id: atomResult?.atom?.id,
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
                    display_name: atomResult?.atom?.value?.thing?.name ?? '',
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
              <PositionCardLastUpdated timestamp={identity.updated_at} />
            </PositionCard>
          ) : null}
          <IdentityStakeCard
            tvl={+formatBalance(assets_sum, 18)}
            holders={atomResult?.atom?.vault?.position_count ?? 0}
            variant={Identity.nonUser} // TODO: Use the atom type to determine this once we have these
            // identityImgSrc={getAtomImage(identity)}
            // identityDisplayName={getAtomLabel(identity)}
            identityImgSrc={atomResult?.atom?.value?.thing?.image ?? ''}
            identityDisplayName={atomResult?.atom?.value?.thing?.name ?? ''}
            onBuyClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'identity',
                identity: {
                  // TODO: (ENG-4782) temporary type fix until we lock in final types
                  id: atomResult?.atom?.id ?? '',
                  label: atomResult?.atom?.value?.thing?.name ?? '',
                  image: atomResult?.atom?.value?.thing?.image ?? '',
                  vault_id: atomResult?.atom?.id,
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
                  display_name: atomResult?.atom?.value?.thing?.name ?? '',
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
            onViewAllClick={() =>
              navigate(`${PATHS.IDENTITY}/${identity.vault_id}#positions`)
            }
          />
        </>
      )}
      <DetailInfoCard
        variant={Identity.user}
        username={atomResult?.atom?.creator?.label ?? '?'}
        avatarImgSrc={atomResult?.atom?.creator?.image ?? ''}
        id={atomResult?.atom?.creator?.id ?? ''}
        description={identity.creator?.description ?? ''}
        link={
          atomResult?.atom?.creator?.id
            ? `${PATHS.PROFILE}/${atomResult?.atom?.creator?.id}`
            : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${atomResult?.atom?.creator?.id}`}
        // timestamp={atomResult?.atom?.blockTimestamp ?? new Date().toISOString()} // TODO: Add this once we have it on the atom
        timestamp={new Date().toISOString()}
        className="w-full"
      />
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
    <Outlet />
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      {!isPending && (
        <>
          <StakeModal
            userWallet={userWallet}
            contract={identity.contract}
            open={stakeModalActive.isOpen}
            identity={identity}
            vaultId={stakeModalActive.vaultId}
            vaultDetailsProp={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
                mode: undefined,
              }))
            }}
          />
          <TagsModal
            identity={identity}
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
              contract={identity.contract ?? MULTIVAULT_CONTRACT_ADDRESS}
              tagAtom={
                identityToAtom(
                  saveListModalActive.tag ?? selectedTag,
                ) as unknown as GetAtomQuery['atom']
              }
              atom={identityToAtom(identity) as unknown as GetAtomQuery['atom']}
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
        displayName={atomResult?.atom?.value?.thing?.name ?? ''}
        imageSrc={atomResult?.atom?.value?.thing?.image ?? ''}
        isUser={atomResult?.atom?.type === ('Account' || 'Person' || 'Default')}
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
  return <ErrorPage routeName="identity/$id" />
}
