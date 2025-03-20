import { Suspense, useEffect, useState } from 'react'

import { Text } from '@0xintuition/1ui'
import { ClaimSortColumn } from '@0xintuition/api'
import {
  fetcher,
  GetTriplesWithPositionsDocument,
  GetTriplesWithPositionsQuery,
  GetTriplesWithPositionsQueryVariables,
  useGetTriplesWithPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ListClaimsListNew as ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import { SortOption } from '@components/sort-select'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getSpecialPredicate } from '@lib/utils/app'
import { invariant } from '@lib/utils/misc'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Await, useSearchParams } from '@remix-run/react' // add useSubmit back in once we add submit again
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_WALLET_ERROR } from 'app/consts'
import { Triple } from 'app/types/triple'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await getUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const queryAddress = userWallet.toLowerCase()

  const queryClient = new QueryClient()

  const savedListsWhere = {
    account: {
      id: {
        _eq: queryAddress,
      },
    },
    vault: {
      atom_id: {
        _is_null: true,
      },
    },
    _or: [
      {
        predicate_id: {
          _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      },
    ],
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-saved-lists', { savedListsWhere }],
    queryFn: () =>
      fetcher<
        GetTriplesWithPositionsQuery,
        GetTriplesWithPositionsQueryVariables
      >(GetTriplesWithPositionsDocument, {
        where: savedListsWhere,
        limit: 10,
        offset: 0,
        orderBy: [{ block_number: 'desc' }],
        address: queryAddress,
      }),
  })

  return {
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      savedListsWhere,
      queryAddress,
    },
  }
}

export default function ProfileLists() {
  const { initialParams } = useLiveLoader<typeof loader>(['create', 'attest'])
  const [searchParams] = useSearchParams()
  // const submit = useSubmit()
  const [accumulatedClaims, setAccumulatedClaims] = useState<Triple[]>([])

  const currentPage = Number(searchParams.get('page') || '1')

  useEffect(() => {
    if (currentPage === 1) {
      setAccumulatedClaims([])
    }
  }, [currentPage])

  const {
    data: savedListsResults,
    // isLoading: isLoadingSavedLists, // add these back in once handling loading and error states again
    // isError: isErrorSavedLists,
    // error: errorSavedLists,
  } = useGetTriplesWithPositionsQuery(
    {
      where: initialParams.savedListsWhere,
      limit: 10,
      offset: 0,
      orderBy: [{ block_number: 'desc' }],
      address: initialParams.queryAddress,
    },
    {
      queryKey: [
        'get-saved-lists',
        {
          where: initialParams.savedListsWhere,
          limit: 10,
          offset: 0,
          orderBy: [{ blockNumber: 'desc' }],
          address: initialParams.queryAddress,
        },
      ],
    },
  )

  // TODO: Implement load more once app loads
  // const handleLoadMore = (
  //   resolvedSavedListClaims: Awaited<typeof savedListsResults>,
  // ) => {
  //   const loadMoreFunction = loadMore({
  //     currentPage,
  //     pagination: resolvedSavedListClaims.pagination,
  //     sortBy,
  //     direction,
  //     submit,
  //   })

  //   loadMoreFunction()
  // }

  const sortOptions: SortOption<ClaimSortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          My Lists
        </Text>
      </div>
      <Suspense fallback={<ListClaimsSkeletonLayout totalItems={6} />}>
        <Await resolve={savedListsResults}>
          {(resolvedSavedLists) => {
            setAccumulatedClaims((prev) => {
              if (currentPage === 1) {
                return (resolvedSavedLists?.triples as Triple[]) ?? []
              }
              return [
                ...prev,
                ...((resolvedSavedLists?.triples as Triple[]) ?? []),
              ]
            })
            const transformedClaims = accumulatedClaims.map((triple) => ({
              __typename: 'predicate_objects' as const,
              id: String(triple.id),
              claim_count: triple.vault?.position_count ?? 0,
              triple_count: triple.vault?.position_count ?? 0,
              object: triple.object,
            }))
            return (
              <ListClaimsList
                listClaims={transformedClaims}
                enableSort={true}
                enableSearch={true}
                sortOptions={sortOptions}
                sourceUserAddress={initialParams.queryAddress}
              />
            )
          }}
        </Await>
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/lists" />
}
