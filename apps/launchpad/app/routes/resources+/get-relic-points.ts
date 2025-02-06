import { pointsClient } from '@lib/graphql/client'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { gql } from 'graphql-request'

interface RelicPoints {
  totalPoints: number
  genesisPoints: number
  snapshot1Points: number
  snapshot2Points: number
}

interface GetRelicPointsResponse {
  relic_points: Array<{
    total_relic_points: number
    genesis_minter_points: number
    snapshot_1_holder_points: number
    snapshot_2_holder_points: number
  }>
}

const GetRelicPointsQuery = gql`
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

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const address = url.searchParams.get('address')

  if (!address) {
    return new Response(JSON.stringify({ points: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await pointsClient.request<GetRelicPointsResponse>(
      GetRelicPointsQuery,
      { address },
    )

    const points = data?.relic_points[0] ?? {
      genesis_minter_points: 0,
      snapshot_1_holder_points: 0,
      snapshot_2_holder_points: 0,
      total_relic_points: 0,
    }

    const result: RelicPoints = {
      totalPoints: points.total_relic_points,
      genesisPoints: points.genesis_minter_points,
      snapshot1Points: points.snapshot_1_holder_points,
      snapshot2Points: points.snapshot_2_holder_points,
    }

    return new Response(JSON.stringify({ points: result }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch relic points',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
