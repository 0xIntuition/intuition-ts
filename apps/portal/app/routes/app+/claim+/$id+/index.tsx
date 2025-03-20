import { URL } from 'url'
import { Suspense, useEffect, useState } from 'react'

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
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  invariant,
} from '@lib/utils/misc'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigation, useSearchParams } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NO_PARAM_ID_ERROR, NO_WALLET_ERROR } from 'app/consts'
import { Atom } from 'app/types'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  if (!id) {
    throw new Error('Claim ID not found in the URL.')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [
      'get-triple',
      {
        id: params.id,
        positionDirection: searchParams.get('positionDirection'),
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
    },
  }
}

export default function ClaimOverview() {
  const { initialParams } = useLoaderData<typeof loader>()

  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const positionDirection = searchParams.get('positionDirection')

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
        },
      ],
    },
  )

  logger('tripleData', tripleData)

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
            label: getAtomLabelGQL(tripleData?.triple?.subject as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.subject as Atom),
            id: tripleData?.triple?.subject?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.subject as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.subject as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.subject as Atom),
            linkComponent: RemixLink,
          }}
          predicate={{
            variant:
              tripleData?.triple?.predicate?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.predicate as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.predicate as Atom),
            id: tripleData?.triple?.predicate?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.predicate as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.predicate as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.predicate as Atom),
            linkComponent: RemixLink,
          }}
          object={{
            variant:
              tripleData?.triple?.object?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.object as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.object as Atom),
            id: tripleData?.triple?.object?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.object as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.object as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.object as Atom),
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
            vaultPositions={tripleData?.triple?.vault?.positions ?? []}
            counterVaultPositions={
              tripleData?.triple?.counter_vault?.positions ?? []
            }
            pagination={{
              aggregate: {
                count:
                  (tripleData?.triple?.vault?.allPositions?.aggregate?.count ??
                    0) +
                  (tripleData?.triple?.counter_vault?.allPositions?.aggregate
                    ?.count ?? 0),
              },
            }}
            positionDirection={positionDirection ?? undefined}
          />
        )}
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="claim/$id/index" />
}
