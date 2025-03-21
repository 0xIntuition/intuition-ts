import { URL } from 'url'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'

import {
  Claim,
  Identity,
  Tabs,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetTripleDocument,
  GetTripleQuery,
  GetTripleQueryVariables,
  useGetTripleQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { PositionsOnClaimNew } from '@components/list/positions-on-claim'
import RemixLink from '@components/remix-link'
import { PaginatedListSkeleton, TabsSkeleton } from '@components/skeleton'
import logger from '@lib/utils/logger'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  invariant,
} from '@lib/utils/misc'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigation, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NO_PARAM_ID_ERROR } from 'app/consts'
import { Atom } from 'app/types'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  if (!id) {
    throw new Error('Claim ID not found in the URL.')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const positionDirection = searchParams.get('positionDirection')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [
      'get-triple',
      {
        id: params.id,
        positionDirection,
        page,
        limit,
      },
    ],
    queryFn: () =>
      fetcher<GetTripleQuery, GetTripleQueryVariables>(GetTripleDocument, {
        tripleId: id,
      })(),
  })

  return {
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      id,
      page,
      limit,
    },
  }
}

export default function ClaimOverview() {
  const { initialParams } = useLoaderData<typeof loader>()

  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const positionDirection = searchParams.get('positionDirection')
  const page = parseInt(
    searchParams.get('page') || initialParams.page.toString(),
    10,
  )
  const limit = parseInt(
    searchParams.get('limit') || initialParams.limit.toString(),
    10,
  )

  const { state } = useNavigation()

  function handleTabChange(value: string | null) {
    const newParams = new URLSearchParams(searchParams)
    if (value === null) {
      newParams.delete('positionDirection')
    } else {
      newParams.set('positionDirection', value)
    }
    newParams.delete('positionsSearch')
    newParams.set('page', '1')

    setSearchParams(newParams, {
      replace: true,
      preventScrollReset: true,
    })
    setIsNavigating(true)
  }

  useEffect(() => {
    if (state === 'idle') {
      setIsNavigating(false)
    }
  }, [state])

  const { data: tripleData, isLoading } = useGetTripleQuery(
    {
      tripleId: initialParams.id,
    },
    {
      queryKey: [
        'get-triple',
        {
          id: initialParams.id,
          positionDirection,
          page,
          limit,
        },
      ],
    },
  )

  logger('tripleData', tripleData)

  // TODO: Request backend to return all positions on the claim in a single object. This currently does client-side pagination for the "all" tab
  // Handle client-side pagination for the "all" tab
  const combinedPositions = useMemo(() => {
    if (!tripleData) {
      return { positions: [], totalCount: 0 }
    }

    // Get all for and against positions
    const forPositions = (tripleData.triple?.vault?.positions || []).map(
      (p) => ({ ...p, direction: 'for' as const }),
    )
    const againstPositions = (
      tripleData.triple?.counter_vault?.positions || []
    ).map((p) => ({ ...p, direction: 'against' as const }))

    const allPositions = [...forPositions, ...againstPositions]

    // Get total counts
    const forCount =
      tripleData.triple?.vault?.allPositions?.aggregate?.count || 0
    const againstCount =
      tripleData.triple?.counter_vault?.allPositions?.aggregate?.count || 0
    const totalCount = forCount + againstCount

    // If in "all" mode, we need to handle pagination ourselves
    if (positionDirection === null) {
      // Calculate the slice for the current page
      const start = (page - 1) * limit
      const end = start + limit

      // Sort all positions - you may want to customize this sorting
      // For now, we'll just order them with "for" positions first, then "against"
      const paginatedPositions = allPositions.slice(start, end)

      return { positions: paginatedPositions, totalCount }
    }

    // For "for" or "against" tabs, we return all the positions we have
    return { positions: allPositions, totalCount }
  }, [tripleData, positionDirection, page, limit])

  // Handle pagination page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('page', newPage.toString())
      setSearchParams(newParams, { replace: true, preventScrollReset: true })
      setIsNavigating(true)
    },
    [searchParams, setSearchParams],
  )

  // Handle limit change
  const handleLimitChange = useCallback(
    (newLimit: number) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('limit', newLimit.toString())
      newParams.set('page', '1') // Reset to page 1 when changing limit
      setSearchParams(newParams, { replace: true, preventScrollReset: true })
      setIsNavigating(true)
    },
    [searchParams, setSearchParams],
  )

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex-row hidden md:flex">
        <Claim
          size="xl"
          maxIdentityLength={60}
          subject={{
            variant:
              tripleData?.triple?.subject?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabel(tripleData?.triple?.subject as Atom),
            imgSrc: getAtomImage(tripleData?.triple?.subject as Atom),
            id: tripleData?.triple?.subject?.id,
            description: getAtomDescription(
              tripleData?.triple?.subject as Atom,
            ),
            ipfsLink: getAtomIpfsLink(tripleData?.triple?.subject as Atom),
            link: getAtomLink(tripleData?.triple?.subject as Atom),
            linkComponent: RemixLink,
          }}
          predicate={{
            variant:
              tripleData?.triple?.predicate?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabel(tripleData?.triple?.predicate as Atom),
            imgSrc: getAtomImage(tripleData?.triple?.predicate as Atom),
            id: tripleData?.triple?.predicate?.id,
            description: getAtomDescription(
              tripleData?.triple?.predicate as Atom,
            ),
            ipfsLink: getAtomIpfsLink(tripleData?.triple?.predicate as Atom),
            link: getAtomLink(tripleData?.triple?.predicate as Atom),
            linkComponent: RemixLink,
          }}
          object={{
            variant:
              tripleData?.triple?.object?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabel(tripleData?.triple?.object as Atom),
            imgSrc: getAtomImage(tripleData?.triple?.object as Atom),
            id: tripleData?.triple?.object?.id,
            description: getAtomDescription(tripleData?.triple?.object as Atom),
            ipfsLink: getAtomIpfsLink(tripleData?.triple?.object as Atom),
            link: getAtomLink(tripleData?.triple?.object as Atom),
            linkComponent: RemixLink,
          }}
        />
      </div>
      <div className="self-stretch justify-between items-center inline-flex mt-6">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          Positions on this Claim
        </Text>
      </div>
      <Tabs defaultValue="all">
        <Suspense fallback={<TabsSkeleton numOfTabs={3} />}>
          {isLoading ? (
            <TabsSkeleton numOfTabs={3} />
          ) : (
            <TabsList>
              <TabsTrigger
                value="all"
                label="All"
                totalCount={
                  (tripleData?.triple?.vault?.allPositions?.aggregate?.count ??
                    0) +
                  (tripleData?.triple?.counter_vault?.allPositions?.aggregate
                    ?.count ?? 0)
                }
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange(null)
                }}
              />
              <TabsTrigger
                value="for"
                label="For"
                totalCount={
                  tripleData?.triple?.vault?.allPositions?.aggregate?.count ?? 0
                }
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('for')
                }}
              />
              <TabsTrigger
                value="against"
                label="Against"
                totalCount={
                  tripleData?.triple?.counter_vault?.allPositions?.aggregate
                    ?.count ?? 0
                }
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('against')
                }}
              />
            </TabsList>
          )}
        </Suspense>
      </Tabs>
      <Suspense fallback={<PaginatedListSkeleton />}>
        {isNavigating ? (
          <PaginatedListSkeleton />
        ) : (
          <PositionsOnClaimNew
            vaultPositions={
              positionDirection === null
                ? combinedPositions.positions.filter(
                    (p) => p.direction === 'for',
                  )
                : tripleData?.triple?.vault?.positions ?? []
            }
            counterVaultPositions={
              positionDirection === null
                ? combinedPositions.positions.filter(
                    (p) => p.direction === 'against',
                  )
                : tripleData?.triple?.counter_vault?.positions ?? []
            }
            pagination={{
              currentPage: page,
              limit,
              totalEntries: combinedPositions.totalCount,
              totalPages: Math.ceil(combinedPositions.totalCount / limit),
            }}
            positionDirection={positionDirection ?? undefined}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        )}
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="claim/$id/index" />
}
