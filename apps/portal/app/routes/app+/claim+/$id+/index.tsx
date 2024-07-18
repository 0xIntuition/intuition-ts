import { useEffect, useState } from 'react'

import { Tabs, TabsList, TabsTrigger, Text } from '@0xintuition/1ui'
import {
  PositionPresenter,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { PositionsOnClaim } from '@components/list/positions-on-claim'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { fetchClaim, fetchPositionsOnClaim } from '@lib/utils/fetches'
import { calculateTotalPages } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { setupApiWithWallet } from '@server/auth'

export async function loader({ request, params }: LoaderFunctionArgs) {
  await setupApiWithWallet(request)

  const id = params.id

  if (!id) {
    throw new Error('Claim ID is undefined.')
  }

  const claim = await fetchClaim(id)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const search = searchParams.get('search')
  const sortBy: PositionSortColumn =
    (searchParams.get('sortBy') as PositionSortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const positionDirection: string =
    searchParams.get('positionDirection') ?? 'all'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const positions = await fetchPositionsOnClaim(
    positionDirection === 'for'
      ? claim?.vault_id ?? id
      : positionDirection === 'against'
        ? claim?.counter_vault_id ?? id
        : id,
    page,
    Number(limit),
    sortBy as PositionSortColumn,
    direction as SortDirection,
    search,
  )

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
  const [positionDirection, setPositionDirection] = useState<string>('all')

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      positionDirection,
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
      <Tabs defaultValue="">
        <TabsList>
          <TabsTrigger
            value=""
            label="All"
            totalCount={claim?.num_positions}
            onClick={(e) => {
              e.preventDefault()
              setPositionDirection('all')
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
      <PositionsOnClaim positions={positions} pagination={pagination} />
    </div>
  )
}
