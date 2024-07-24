import { Suspense, useEffect, useState } from 'react'

import { Tabs, TabsList, TabsTrigger, Text } from '@0xintuition/1ui'
import { ClaimsService, VaultType } from '@0xintuition/api'

import { PositionsOnClaim } from '@components/list/positions-on-claim'
import { PaginatedListSkeleton, TabsSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getPositionsOnClaim } from '@lib/services/positions'
import { NO_PARAM_ID_ERROR, NO_WALLET_ERROR } from '@lib/utils/errors'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useNavigation, useSearchParams } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    positionsData: getPositionsOnClaim({
      claimId: id,
      searchParams,
    }),
    claim: fetchWrapper({
      method: ClaimsService.getClaimById,
      args: { id },
    }),
  })
}

export default function ClaimOverview() {
  const { claim, positionsData } = useLiveLoader<typeof loader>([
    'attest',
    'create',
  ])
  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  const { state } = useNavigation()

  function handleTabChange(value: VaultType | null) {
    const newParams = new URLSearchParams(searchParams)
    if (value === null) {
      newParams.delete('positionDirection')
    } else {
      newParams.set('positionDirection', value)
    }
    newParams.delete('positionsSearch')
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
    <div className="flex-col justify-start items-start flex w-full">
      <div className="self-stretch justify-between items-center inline-flex mb-6">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground w-full"
        >
          Positions on this Claim
        </Text>
      </div>
      <Tabs defaultValue="all">
        <Suspense fallback={<TabsSkeleton numOfTabs={3} />}>
          <Await resolve={claim}>
            {(resolvedClaim) => (
              <TabsList>
                <TabsTrigger
                  value="all"
                  label="All"
                  totalCount={resolvedClaim?.num_positions}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange(null)
                  }}
                />
                <TabsTrigger
                  value="for"
                  label="For"
                  totalCount={resolvedClaim?.for_num_positions}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('for')
                  }}
                />
                <TabsTrigger
                  value="against"
                  label="Against"
                  totalCount={resolvedClaim?.against_num_positions}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('against')
                  }}
                />
              </TabsList>
            )}
          </Await>
        </Suspense>
      </Tabs>
      <Suspense fallback={<PaginatedListSkeleton />}>
        {isNavigating ? (
          <PaginatedListSkeleton />
        ) : (
          <Await resolve={positionsData}>
            {(resolvedPositionsData) => (
              <PositionsOnClaim
                positions={resolvedPositionsData.data}
                pagination={resolvedPositionsData.pagination as PaginationType}
              />
            )}
          </Await>
        )}
      </Suspense>
    </div>
  )
}
