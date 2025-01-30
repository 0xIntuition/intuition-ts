import { Suspense, useEffect, useState } from 'react'

import {
  Claim,
  ErrorStateCard,
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
import { TagsList } from '@components/list/tags'
import { ListTabIdentityDisplay } from '@components/lists/list-tab-identity-display'
import RemixLink from '@components/remix-link'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_CLAIM_ERROR, NO_PARAM_ID_ERROR } from 'app/consts'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const [predicateId, objectId] = id.split('-')
  invariant(predicateId, 'Predicate ID not found in composite ID')
  invariant(objectId, 'Object ID not found in composite ID')

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const paramWallet = searchParams.get('user')

  const queryClient = new QueryClient()

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
          _eq: additionalQueryAddress,
        },
      },
    },
  }

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
    let additionalAccountResult: GetAccountQuery | null = null

    try {
      additionalAccountResult = await fetcher<
        GetAccountQuery,
        GetAccountQueryVariables
      >(GetAccountDocument, { address: additionalQueryAddress ?? '' })()

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
        queryAddress: additionalQueryAddress,
      })
      throw error
    }
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
      queryKey: ['get-additional-user-list-details', { additionalUserWhere }],
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

  return json({
    dehydratedState: dehydrate(queryClient),
    additionalQueryAddress,
    initialParams: {
      id,
      objectId,
      predicateId,
      paramWallet,
      globalWhere,
      userWhere,
    },
  })
}

export default function ReadOnlyListOverview() {
  const { additionalQueryAddress, initialParams } =
    useLoaderData<typeof loader>()

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
          userWhere: initialParams.userWhere,
          tagPredicateId: parseInt(initialParams.predicateId),
        }
      : undefined,
    {
      queryKey: [
        'get-additional-user-list-details',
        {
          userWhere: initialParams.userWhere,
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
    }>('routes/readonly+/list+/$id') ?? {}
  invariant(objectResult, NO_CLAIM_ERROR)

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
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="list/$id/index" />
}
