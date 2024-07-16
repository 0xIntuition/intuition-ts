import { useEffect, useState } from 'react'

import { Tabs, TabsList, TabsTrigger, Text } from '@0xintuition/1ui'

import { PositionsOnClaim } from '@components/list/positions-on-claim'
import { useRouteLoaderData, useSearchParams } from '@remix-run/react'

import { ClaimLoaderData } from '../$id'

export default function ClaimOverview() {
  const { claim, positions, pagination } =
    useRouteLoaderData<ClaimLoaderData>('routes/app+/claim+/$id') ?? {}

  const [searchParams, setSearchParams] = useSearchParams()
  const [positionDirection, setPositionDirection] = useState<string>('all')

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      positionDirection,
      page: '1',
    })
  }, [positionDirection])

  if (!claim || !positions || !pagination) {
    return null
  }

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
