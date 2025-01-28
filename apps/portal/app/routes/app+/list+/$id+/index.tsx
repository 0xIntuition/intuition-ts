import { Suspense, useEffect, useState } from 'react'

import {
  Button,
  ButtonVariant,
  Claim,
  ErrorStateCard,
  Icon,
  IconName,
  ListHeaderCard,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'
import { IdentityPresenter, Status } from '@0xintuition/api'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetListDetailsWithUserDocument,
  GetListDetailsWithUserQuery,
  GetListDetailsWithUserQueryVariables,
  useGetAccountQuery,
  useGetAtomQuery,
  useGetListDetailsWithUserQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { InfoPopover } from '@components/info-popover'
import { TagsList } from '@components/list/tags'
import { ListTabIdentityDisplay } from '@components/lists/list-tab-identity-display'
import RemixLink from '@components/remix-link'
import { RevalidateButton } from '@components/revalidate-button'
import SaveListModal from '@components/save-list/save-list-modal'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { addIdentitiesListModalAtom, saveListModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  identityToAtom,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_CLAIM_ERROR,
  NO_PARAM_ID_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'
import { useAtom, useSetAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const [predicateId, objectId] = id.split('-')
  invariant(predicateId, 'Predicate ID not found in composite ID')
  invariant(objectId, 'Object ID not found in composite ID')

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const paramWallet = searchParams.get('user')

  const queryAddress = wallet.toLowerCase()
  const additionalQueryAddress = paramWallet ? paramWallet.toLowerCase() : ''

  const globalWhere = {
    predicate_id: { _eq: parseInt(predicateId) },
    object_id: { _eq: parseInt(objectId) },
  }

  const userWhere = {
    predicate_id: { _eq: parseInt(predicateId) },
    object_id: { _eq: parseInt(objectId) },
    vault: {
      positions: {
        account_id: {
          _eq: queryAddress,
        },
      },
    },
  }

  const additionalUserWhere = {
    predicate_id: { _eq: parseInt(predicateId) },
    object_id: { _eq: parseInt(objectId) },
    vault: {
      positions: {
        account_id: {
          _eq: additionalQueryAddress,
        },
      },
    },
  }

  let accountResult: GetAccountQuery | null = null

  try {
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
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      queryAddress,
    })
    throw error
  }

  let additionalAccountResult: GetAccountQuery | null = null

  try {
    additionalAccountResult = await fetcher<
      GetAccountQuery,
      GetAccountQueryVariables
    >(GetAccountDocument, { address: queryAddress })()

    if (!additionalAccountResult) {
      throw new Error('No account data found for address')
    }

    if (!additionalAccountResult.account?.atom_id) {
      throw new Error('No atom ID found for account')
    }

    await queryClient.prefetchQuery({
      queryKey: ['get-additional-account', { address: additionalQueryAddress }],
      queryFn: () => additionalAccountResult,
    })
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      queryAddress,
    })
    throw error
  }

  const predicateResult = await fetcher<GetAtomQuery, GetAtomQueryVariables>(
    GetAtomDocument,
    {
      id: predicateId,
    },
  )()

  await queryClient.prefetchQuery({
    queryKey: ['get-predicate', { id: predicateId }],
    queryFn: () => predicateResult,
  })

  await queryClient.prefetchQuery({
    queryKey: [
      'get-list-details',
      { id, tagPredicateId: parseInt(predicateId) },
    ],
    queryFn: () =>
      fetcher<
        GetListDetailsWithUserQuery,
        GetListDetailsWithUserQueryVariables
      >(GetListDetailsWithUserDocument, {
        globalWhere,
        userWhere,
        tagPredicateId: parseInt(predicateId),
      })(),
  })

  if (paramWallet) {
    const additionalUserWhere = {
      predicate_id: {
        _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
      },
      object_id: { _eq: id },
      vault: {
        positions: {
          account_id: { _eq: paramWallet.toLowerCase() },
        },
      },
    }

    await queryClient.prefetchQuery({
      queryKey: [
        'get-additional-user-list-details',
        { additionalUserWhere, tagPredicateId: parseInt(predicateId) },
      ],
      queryFn: () =>
        fetcher<
          GetListDetailsWithUserQuery,
          GetListDetailsWithUserQueryVariables
        >(GetListDetailsWithUserDocument, {
          userWhere: additionalUserWhere,
          tagPredicateId: parseInt(predicateId),
        })(),
    })
  }

  return json({
    dehydratedState: dehydrate(queryClient),
    queryAddress,
    additionalQueryAddress,
    initialParams: {
      id,
      predicateId,
      objectId,
      paramWallet,
      globalWhere,
      userWhere,
      additionalUserWhere,
    },
  })
}

export default function ListOverview() {
  const { queryAddress, additionalQueryAddress, initialParams } =
    useLoaderData<typeof loader>()

  const { data: accountResult } = useGetAccountQuery(
    {
      address: queryAddress,
    },
    {
      queryKey: ['get-account', { address: queryAddress }],
    },
  )

  const { data: additionalAccountResult } = useGetAccountQuery(
    {
      address: additionalQueryAddress ?? '',
    },
    {
      queryKey: ['get-additional-account', { address: additionalQueryAddress }],
      enabled: !!additionalQueryAddress,
    },
  )

  const {
    data: listDetailsData,
    isLoading: isLoadingTriples,
    isError: isErrorTriples,
    error: errorTriples,
  } = useGetListDetailsWithUserQuery(
    {
      globalWhere: initialParams.globalWhere,
      userWhere: initialParams.userWhere,
      tagPredicateId: parseInt(initialParams.predicateId),
    },
    {
      queryKey: [
        'get-list-details',
        {
          id: initialParams.id,
          tagPredicateId: parseInt(initialParams.predicateId),
        },
      ],
    },
  )

  const {
    data: additionalUserData,
    isLoading: isLoadingAdditionalTriples,
    isError: isErrorAdditionalTriples,
    error: errorAdditionalTriples,
  } = useGetListDetailsWithUserQuery(
    additionalQueryAddress
      ? {
          userWhere: initialParams.additionalUserWhere,
          tagPredicateId: parseInt(initialParams.predicateId),
        }
      : undefined,
    {
      queryKey: [
        'get-additional-user-list-details',
        {
          additionalUserWhere: initialParams.additionalUserWhere,
          tagPredicateId: parseInt(initialParams.predicateId),
        },
      ],
      enabled: !!additionalQueryAddress,
    },
  )

  const { data: predicateResult } = useGetAtomQuery(
    {
      id: initialParams.predicateId,
    },
    {
      queryKey: ['get-predicate', { id: initialParams.predicateId }],
    },
  )

  const { objectResult } =
    useRouteLoaderData<{
      objectResult: GetAtomQuery
    }>('routes/app+/list+/$id') ?? {}
  invariant(objectResult, NO_CLAIM_ERROR)

  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  const setAddIdentitiesListModalActive = useSetAtom(addIdentitiesListModalAtom)

  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const userWalletAddress = searchParams.get('user')

  const { state } = useNavigation()
  const defaultTab = searchParams.get('tab') || 'global'

  function handleTabChange(value: 'global' | 'you' | string) {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('tab', value)
    newParams.delete('search')
    newParams.set('page', '1')
    setSearchParams(newParams)
    setIsNavigating(true)
  }

  useEffect(() => {
    if (state === 'idle') {
      setIsNavigating(false)
    }
  }, [state])

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-row w-full justify-around md:justify-end gap-4">
        <Button
          variant="primary"
          onClick={() => {
            setAddIdentitiesListModalActive({
              isOpen: true,
              id: objectResult.atom?.vault_id ?? null,
            })
          }}
        >
          <Icon name="plus-small" />
          Add to list
        </Button>
        <InfoPopover
          title="Save List"
          content="To add a List to &lsquo;your lists&rsquo;, you&lsquo;ll need to use the List! Save the List to your profile by staking on an entry in the List, or tagging something new with the List&lsquo;s Identity. For example - tagging [MetaMask] with [Wallet] will add the [Wallet] List to your Profile, for easy discoverability later!"
          icon={IconName.bookmark}
          trigger={
            <Button variant={ButtonVariant.primary}>
              <Icon name={IconName.bookmark} />
              Save list
            </Button>
          }
          side="bottom"
          align="end"
        />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <Suspense fallback={<DataHeaderSkeleton />}>
          <ListHeaderCard
            label="Identities"
            value={
              listDetailsData?.globalTriplesAggregate.aggregate?.count ?? 0
            }
          >
            <Claim
              size="md"
              subject={{
                variant: 'non-user',
                label: '?',
                imgSrc: null,
                shouldHover: false,
              }}
              predicate={{
                variant: 'non-user',
                label: getAtomLabelGQL(
                  predicateResult?.atom as GetAtomQuery['atom'],
                ),
                imgSrc: getAtomImageGQL(
                  predicateResult?.atom as GetAtomQuery['atom'],
                ),
                id:
                  predicateResult?.atom?.type === 'Account' ||
                  predicateResult?.atom?.type === 'Default'
                    ? predicateResult?.atom?.wallet_id
                    : predicateResult?.atom?.id,
                description: getAtomDescriptionGQL(
                  predicateResult?.atom as GetAtomQuery['atom'],
                ),
                ipfsLink: getAtomIpfsLinkGQL(
                  predicateResult?.atom as GetAtomQuery['atom'],
                ),
                link: getAtomLinkGQL(
                  predicateResult?.atom as GetAtomQuery['atom'],
                ),
                linkComponent: RemixLink,
              }}
              object={{
                variant:
                  objectResult.atom?.type === 'Account' ||
                  objectResult.atom?.type === 'Default'
                    ? 'user'
                    : 'non-user',
                label: getAtomLabelGQL(
                  objectResult.atom as GetAtomQuery['atom'],
                ),
                imgSrc: getAtomImageGQL(
                  objectResult.atom as GetAtomQuery['atom'],
                ),
                id:
                  objectResult.atom?.type === 'Account' ||
                  objectResult.atom?.type === 'Default'
                    ? objectResult.atom?.wallet_id
                    : objectResult.atom?.id,
                description: getAtomDescriptionGQL(
                  objectResult.atom as GetAtomQuery['atom'],
                ),
                ipfsLink: getAtomIpfsLinkGQL(
                  objectResult.atom as GetAtomQuery['atom'],
                ),
                link: getAtomLinkGQL(objectResult.atom as GetAtomQuery['atom']),
                linkComponent: RemixLink,
              }}
            />
          </ListHeaderCard>
        </Suspense>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="flex flex-row">
            <Suspense
              fallback={<Skeleton className="w-44 h-10 rounded mr-2" />}
            >
              {isLoadingTriples ? (
                <Skeleton className="w-44 h-10 rounded mr-2" />
              ) : (
                <TabsTrigger
                  value="global"
                  label="Global"
                  totalCount={
                    listDetailsData?.globalTriplesAggregate.aggregate?.count ??
                    0
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('global')
                  }}
                />
              )}
            </Suspense>
            <Suspense fallback={<Skeleton className="w-44 h-10 rounded" />}>
              {isLoadingTriples ? (
                <Skeleton className="w-44 h-10 rounded" />
              ) : (
                <TabsTrigger
                  value="you"
                  label={
                    <ListTabIdentityDisplay
                      imgSrc={accountResult?.account?.image}
                    >
                      You
                    </ListTabIdentityDisplay>
                  }
                  totalCount={
                    listDetailsData?.userTriplesAggregate.aggregate?.count ?? 0
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('you')
                  }}
                />
              )}
            </Suspense>
            {userWalletAddress && (
              <Suspense fallback={<Skeleton className="w-44 h-10 rounded" />}>
                {isLoadingAdditionalTriples ? (
                  <Skeleton className="w-44 h-10 rounded" />
                ) : (
                  <TabsTrigger
                    className="text-left"
                    value="additional"
                    totalCount={
                      additionalUserData?.userTriplesAggregate.aggregate
                        ?.count ?? 0
                    }
                    label={
                      <ListTabIdentityDisplay
                        imgSrc={additionalAccountResult?.account?.image}
                      >
                        {additionalAccountResult?.account?.label ??
                          'Additional'}
                      </ListTabIdentityDisplay>
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('additional')
                    }}
                  />
                )}
              </Suspense>
            )}
          </TabsList>
          <TabsContent value="global" className="mt-6">
            <Suspense fallback={<PaginatedListSkeleton />}>
              {isLoadingTriples ? (
                <PaginatedListSkeleton />
              ) : isErrorTriples ? (
                <ErrorStateCard
                  title="Failed to load global list"
                  message={
                    (errorTriples as Error)?.message ??
                    'An unexpected error occurred'
                  }
                >
                  <RevalidateButton />
                </ErrorStateCard>
              ) : listDetailsData?.globalTriples ? (
                isNavigating ? (
                  <PaginatedListSkeleton />
                ) : (
                  <TagsList
                    triples={listDetailsData.globalTriples}
                    enableSearch={true}
                    enableSort={true}
                  />
                )
              ) : null}
            </Suspense>
          </TabsContent>
          <TabsContent value="you">
            <Suspense fallback={<PaginatedListSkeleton />}>
              {isLoadingTriples ? (
                <PaginatedListSkeleton />
              ) : isErrorTriples ? (
                <ErrorStateCard
                  title="Failed to load your list"
                  message={
                    (errorTriples as Error)?.message ??
                    'An unexpected error occurred'
                  }
                >
                  <RevalidateButton />
                </ErrorStateCard>
              ) : listDetailsData?.userTriples ? (
                isNavigating ? (
                  <PaginatedListSkeleton />
                ) : (
                  <TagsList
                    triples={listDetailsData.userTriples}
                    enableSearch={true}
                    enableSort={true}
                  />
                )
              ) : null}
            </Suspense>
          </TabsContent>
          {userWalletAddress && (
            <TabsContent value="additional">
              <Suspense fallback={<PaginatedListSkeleton />}>
                {isLoadingAdditionalTriples ? (
                  <PaginatedListSkeleton />
                ) : isErrorAdditionalTriples ? (
                  <ErrorStateCard
                    title="Failed to load additional list"
                    message={
                      (errorAdditionalTriples as Error)?.message ??
                      'An unexpected error occurred'
                    }
                  >
                    <RevalidateButton />
                  </ErrorStateCard>
                ) : additionalUserData?.userTriples ? (
                  isNavigating ? (
                    <PaginatedListSkeleton />
                  ) : (
                    <TagsList
                      triples={additionalUserData.userTriples}
                      enableSearch={true}
                      enableSort={true}
                    />
                  )
                ) : null}
              </Suspense>
            </TabsContent>
          )}
        </Tabs>
      </div>
      <SaveListModal
        contract={MULTIVAULT_CONTRACT_ADDRESS}
        atom={
          identityToAtom(
            (saveListModalActive.identity ?? {
              asset_delta: '',
              assets_sum: '',
              contract: '',
              conviction_price: '',
              conviction_price_delta: '',
              conviction_sum: '',
              created_at: '',
              creator_address: '',
              display_name: '',
              follow_vault_id: '',
              id: '',
              identity_hash: '',
              identity_id: '',
              is_contract: false,
              is_user: false,
              num_positions: 0,
              predicate: false,
              status: 'active' as Status,
              updated_at: '',
              vault_id: '',
            }) as IdentityPresenter,
          ) as GetAtomQuery['atom']
        }
        tagAtom={objectResult?.atom as GetAtomQuery['atom']}
        userWallet={queryAddress}
        open={saveListModalActive.isOpen}
        onClose={() =>
          setSaveListModalActive({
            ...saveListModalActive,
            isOpen: false,
          })
        }
      />
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="list/$id/index" />
}
