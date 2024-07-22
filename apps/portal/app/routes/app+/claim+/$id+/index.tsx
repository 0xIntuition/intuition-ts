import { useEffect, useState } from 'react'

import { Tabs, TabsList, TabsTrigger, Text } from '@0xintuition/1ui'
import {
  ClaimPositionsService,
  ClaimsService,
  PositionPresenter,
  PositionSortColumn,
  VaultType,
} from '@0xintuition/api'

import { PositionsOnClaim } from '@components/list/positions-on-claim'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { getStandardPageParams } from '@lib/utils/loader'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const id = params.id

  if (!id) {
    throw new Error('Claim ID is undefined.')
  }

  const claim = await fetchWrapper({
    method: ClaimsService.getClaimById,
    args: { id },
  })

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    defaultSortByValue: PositionSortColumn.CREATED_AT,
  })
  const creator = searchParams.get('search')
  const positionDirection =
    (searchParams.get('positionDirection') as VaultType) || null

  const positions = await fetchWrapper({
    method: ClaimPositionsService.getClaimPositions,
    args: {
      id,
      page,
      limit,
      sortBy: sortBy as PositionSortColumn,
      direction,
      creator,
      positionDirection,
    },
  })

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  return json({
    claim,
    positions: positions?.data as PositionPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: positions?.total ?? 0,
      totalPages,
    },
  })
}

export default function ClaimOverview() {
  const { claim, positions, pagination } = useLiveLoader<typeof loader>([
    'attest',
    'create',
  ])
  const [searchParams, setSearchParams] = useSearchParams()
  const [positionDirection, setPositionDirection] = useState<VaultType | null>(
    null,
  )

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...(positionDirection && { positionDirection }),
      page: '1',
    })
  }, [positionDirection])

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
        <TabsList>
          <TabsTrigger
            value="all"
            label="All"
            totalCount={claim?.num_positions}
            onClick={(e) => {
              e.preventDefault()
              const newParams = new URLSearchParams(searchParams)
              newParams.delete('positionDirection')
              newParams.set('page', '1')
              setSearchParams(newParams)
            }}
          />
          <TabsTrigger
            value="for"
            label="For"
            totalCount={claim?.for_num_positions}
            onClick={(e) => {
              e.preventDefault()
              setPositionDirection('for')
            }}
          />
          <TabsTrigger
            value="against"
            label="Against"
            totalCount={claim?.against_num_positions}
            onClick={(e) => {
              e.preventDefault()
              setPositionDirection('against')
            }}
          />
        </TabsList>
      </Tabs>
      <PositionsOnClaim
        positions={positions}
        pagination={pagination as PaginationType}
      />
    </div>
  )
}
