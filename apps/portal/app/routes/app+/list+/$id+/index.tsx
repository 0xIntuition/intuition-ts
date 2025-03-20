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
import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  invariant,
} from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
  useSubmit,
} from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_CLAIM_ERROR,
  NO_PARAM_ID_ERROR,
} from 'app/consts'
import { Atom } from 'app/types/atom'
import { PaginationType } from 'app/types/pagination'
import { Triple } from 'app/types/triple'
import { useAtom, useSetAtom } from 'jotai'
import { zeroAddress } from 'viem'

// Default pagination values
const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1

// Function to map sort parameters from URL to GraphQL order_by object
// Using the exact same implementation as in claims.tsx
function mapSortToOrderBy(sortBy: string, direction: string) {
  // Default to block_timestamp if not provided
  if (!sortBy) {
    return {
      block_timestamp: direction.toLowerCase() as 'asc' | 'desc',
    }
  }

  // Handle nested fields like 'vault.total_shares'
  if (sortBy.includes('.')) {
    const [parent, field] = sortBy.split('.')
    return {
      [parent]: {
        [field]: direction.toLowerCase() as 'asc' | 'desc',
      },
    }
  }

  // Handle simple fields
  return {
    [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const [predicateId, objectId] = id.split('-')
  invariant(predicateId, 'Predicate ID not found in composite ID')
  invariant(objectId, 'Object ID not found in composite ID')

  const wallet = await getUserWallet(request)

  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const paramWallet = searchParams.get('user')

  // Get pagination, sort and search parameters
  const { page, limit, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: '',
    defaultPageValue: DEFAULT_PAGE,
    defaultLimitValue: DEFAULT_PAGE_SIZE,
  })

  const sortBy = searchParams.get('sortBy') || 'block_timestamp'

  // Prepare orderBy object for GraphQL query based on sort parameters
  const orderBy = mapSortToOrderBy(sortBy || 'block_timestamp', direction)

  const queryAddress = wallet?.toLowerCase() ?? zeroAddress
  const additionalQueryAddress = paramWallet?.toLowerCase() ?? ''

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

  // Only add additional user where if paramWallet exists
  let additionalUserWhere = null
  if (paramWallet) {
    additionalUserWhere = {
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

  if (additionalQueryAddress) {
    try {
      additionalAccountResult = await fetcher<
        GetAccountQuery,
        GetAccountQueryVariables
      >(GetAccountDocument, { address: additionalQueryAddress })()

      if (!additionalAccountResult) {
        throw new Error('No account data found for address')
      }

      if (!additionalAccountResult.account?.atom_id) {
        throw new Error('No atom ID found for account')
      }

      await queryClient.prefetchQuery({
        queryKey: [
          'get-additional-account',
          { address: additionalQueryAddress },
        ],
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

  try {
    const listDetailsResult = await fetcher<
      GetListDetailsWithUserQuery,
      GetListDetailsWithUserQueryVariables
    >(GetListDetailsWithUserDocument, {
      globalWhere,
      userWhere,
      tagPredicateId: parseInt(predicateId),
      address: queryAddress,
      limit,
      offset: (page - 1) * limit,
      orderBy: [orderBy],
    })()

    await queryClient.prefetchQuery({
      queryKey: [
        'get-list-details',
        {
          id,
          tagPredicateId: parseInt(predicateId),
          limit,
          offset: (page - 1) * limit,
          sortBy: sortBy || 'block_timestamp',
          direction,
        },
      ],
      queryFn: () => listDetailsResult,
    })

    // Get total count for pagination
    const totalGlobalCount =
      listDetailsResult?.globalTriplesAggregate?.aggregate?.count ?? 0
    const totalUserCount =
      listDetailsResult?.userTriplesAggregate?.aggregate?.count ?? 0

    const globalPagination = {
      currentPage: page,
      limit,
      totalEntries: totalGlobalCount,
      totalPages: calculateTotalPages(totalGlobalCount, limit),
    } as PaginationType

    const userPagination = {
      currentPage: page,
      limit,
      totalEntries: totalUserCount,
      totalPages: calculateTotalPages(totalUserCount, limit),
    } as PaginationType

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
        sortBy: sortBy || 'block_timestamp',
        direction: direction || 'desc',
      },
      globalPagination,
      userPagination,
    })
  } catch (error) {
    logger('Error fetching list details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    })
    throw error
  }
}

export default function ListOverview() {
  const {
    queryAddress,
    additionalQueryAddress,
    initialParams,
    globalPagination,
    userPagination,
  } = useLoaderData<typeof loader>()
  const submit = useSubmit()

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

  // Apply orderBy to query
  const orderBy = mapSortToOrderBy(
    initialParams.sortBy || 'block_timestamp',
    initialParams.direction || 'desc',
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
      address: queryAddress,
      limit: globalPagination.limit,
      offset: (globalPagination.currentPage - 1) * globalPagination.limit,
      orderBy: [orderBy],
    },
    {
      queryKey: [
        'get-list-details',
        {
          id: initialParams.id,
          tagPredicateId: parseInt(initialParams.predicateId),
          limit: globalPagination.limit,
          offset: (globalPagination.currentPage - 1) * globalPagination.limit,
          sortBy: initialParams.sortBy,
          direction: initialParams.direction,
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
          address: additionalQueryAddress,
          limit: globalPagination.limit,
          offset: (globalPagination.currentPage - 1) * globalPagination.limit,
          orderBy: [orderBy],
        }
      : undefined,
    {
      queryKey: [
        'get-additional-user-list-details',
        {
          additionalUserWhere: initialParams.additionalUserWhere,
          tagPredicateId: parseInt(initialParams.predicateId),
          limit: globalPagination.limit,
          offset: (globalPagination.currentPage - 1) * globalPagination.limit,
          sortBy: initialParams.sortBy,
          direction: initialParams.direction,
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

  // Handle pagination events
  const handlePageChange = (page: number) => {
    const formData = new FormData()
    formData.append('page', page.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleLimitChange = (limit: number) => {
    const formData = new FormData()
    formData.append('limit', limit.toString())
    submit(formData, { method: 'get', replace: true })
  }

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
                  predicateResult?.atom as unknown as Atom,
                ),
                imgSrc: getAtomImageGQL(
                  predicateResult?.atom as unknown as Atom,
                ),
                id:
                  predicateResult?.atom?.type === 'Account' ||
                  predicateResult?.atom?.type === 'Default'
                    ? predicateResult?.atom?.wallet_id
                    : predicateResult?.atom?.id,
                description: getAtomDescriptionGQL(
                  predicateResult?.atom as unknown as Atom,
                ),
                ipfsLink:
                  getAtomIpfsLinkGQL(
                    predicateResult?.atom as unknown as Atom,
                  ) || '',
                link:
                  getAtomLinkGQL(predicateResult?.atom as unknown as Atom) ||
                  '',
                linkComponent: RemixLink,
              }}
              object={{
                variant:
                  objectResult.atom?.type === 'Account' ? 'user' : 'non-user',
                label: getAtomLabelGQL(objectResult.atom as unknown as Atom),
                imgSrc: getAtomImageGQL(objectResult.atom as unknown as Atom),
                id:
                  objectResult.atom?.type === 'Account' ||
                  objectResult.atom?.type === 'Default'
                    ? objectResult.atom?.wallet_id
                    : objectResult.atom?.id,
                description: getAtomDescriptionGQL(
                  objectResult.atom as unknown as Atom,
                ),
                ipfsLink:
                  getAtomIpfsLinkGQL(objectResult.atom as unknown as Atom) ||
                  '',
                link:
                  getAtomLinkGQL(objectResult.atom as unknown as Atom) || '',
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
                    triples={
                      listDetailsData.globalTriples as unknown as Triple[]
                    }
                    pagination={globalPagination}
                    enableSearch={true}
                    enableSort={true}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
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
                    triples={listDetailsData.userTriples as unknown as Triple[]}
                    pagination={userPagination}
                    enableSearch={true}
                    enableSort={true}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
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
                      triples={
                        additionalUserData.userTriples as unknown as Triple[]
                      }
                      pagination={globalPagination}
                      enableSearch={true}
                      enableSort={true}
                      onPageChange={handlePageChange}
                      onLimitChange={handleLimitChange}
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
        atom={saveListModalActive.identity as unknown as Atom}
        tagAtom={objectResult?.atom as unknown as Atom}
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
