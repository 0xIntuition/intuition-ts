import { pointsClient } from '@lib/graphql/client'
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node'
import { gql } from 'graphql-request'

export const GetRelicPointsDocument = gql`
  query GetRelicPoints($address: String!) {
    relic_points(where: { address: { _eq: $address } }) {
      address
      genesis_minter_points
      snapshot_1_holder_points
      snapshot_2_holder_points
      total_relic_points
    }
  }
`

export interface GetRelicPointsQuery {
  relic_points: Array<{
    address: string
    genesis_minter_points: number
    snapshot_1_holder_points: number
    snapshot_2_holder_points: number
    total_relic_points: number
  }>
}

export interface GetRelicPointsQueryVariables {
  address: string
}

export interface RelicPoints {
  totalPoints: number
  genesisPoints: number
  snapshot1Points: number
  snapshot2Points: number
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<
  TypedResponse<{ relic_points: RelicPoints | null }>
> {
  const url = new URL(request.url)
  const address = url.searchParams.get('address')

  if (!address) {
    return new Response(JSON.stringify({ relic_points: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await pointsClient.request<
    GetRelicPointsQuery,
    GetRelicPointsQueryVariables
  >(GetRelicPointsDocument, {
    address,
  })

  const points = data?.relic_points[0] ?? {
    genesis_minter_points: 0,
    snapshot_1_holder_points: 0,
    snapshot_2_holder_points: 0,
    total_relic_points: 0,
  }

  const result = {
    totalPoints: points.total_relic_points,
    genesisPoints: points.genesis_minter_points,
    snapshot1Points: points.snapshot_1_holder_points,
    snapshot2Points: points.snapshot_2_holder_points,
  }

  return new Response(JSON.stringify({ relic_points: result }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
