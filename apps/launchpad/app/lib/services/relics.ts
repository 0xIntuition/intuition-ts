interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export const GetRelicPointsDocument = {
  query: `
    query GetRelicPoints($address: String!) {
      relic_points(where: {address: {_ilike: $address}}) {
        address
        genesis_minter_points
        snapshot_1_holder_points
        snapshot_2_holder_points
        total_relic_points
      }
    }
  `,
} as const

async function fetchGraphQL<T, V>(
  document: { query: string },
  variables: V,
): Promise<GraphQLResponse<T>> {
  const endpoint = process.env.HASURA_POINTS_ENDPOINT
  if (!endpoint) {
    throw new Error('HASURA_POINTS_ENDPOINT not configured')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: document.query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`)
  }

  return response.json()
}

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

export async function fetchRelicPoints(address: string): Promise<RelicPoints> {
  console.log('fetchRelicPoints called with address:', address)

  const data = await fetchGraphQL<
    GetRelicPointsQuery,
    GetRelicPointsQueryVariables
  >(GetRelicPointsDocument, {
    address,
  })

  console.log('GraphQL response:', data)
  console.log('Relic points array:', data?.data?.relic_points)

  const points = data?.data?.relic_points[0] ?? {
    genesis_minter_points: 0,
    snapshot_1_holder_points: 0,
    snapshot_2_holder_points: 0,
    total_relic_points: 0,
  }

  console.log('Selected points:', points)

  const result = {
    totalPoints: points.total_relic_points,
    genesisPoints: points.genesis_minter_points,
    snapshot1Points: points.snapshot_1_holder_points,
    snapshot2Points: points.snapshot_2_holder_points,
  }

  console.log('Returning result:', result)
  return result
}

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

const GetMintCountDocument = {
  query: `
    query GetMintCountUntilDate($address: String!, $cutoff_timestamp: Int!) {
      voucherRedeemedEvents(
        where: { redeemer: $address, timestamp_lte: $cutoff_timestamp }
      ) {
        totalCount
      }
    }
  `,
} as const

interface GetMintCountQuery {
  voucherRedeemedEvents: {
    totalCount: number
  }
}

interface GetMintCountQueryVariables {
  address: string
  cutoff_timestamp: number
}

const GetRelicHoldingsDocument = {
  query: `
    query GetRelicHoldings($address: String!) {
      account(address: $address) {
        tokens {
          totalCount
        }
        voucherRedeemedEvents {
          totalCount
        }
      }
    }
  `,
} as const

interface GetRelicHoldingsQuery {
  account: {
    tokens: {
      totalCount: number
    }
    voucherRedeemedEvents: {
      totalCount: number
    }
  }
}

interface GetRelicHoldingsQueryVariables {
  address: string
}

export async function fetchRelicCounts(address: string) {
  const cutoffTimestamp = 1735516799

  const [mintCountData, holdingsData] = await Promise.all([
    fetchGraphQL<GetMintCountQuery, GetMintCountQueryVariables>(
      GetMintCountDocument,
      {
        address,
        cutoff_timestamp: cutoffTimestamp,
      },
    ),
    fetchGraphQL<GetRelicHoldingsQuery, GetRelicHoldingsQueryVariables>(
      GetRelicHoldingsDocument,
      {
        address,
      },
    ),
  ])

  const mintCount = mintCountData?.data?.voucherRedeemedEvents?.totalCount ?? 0
  const holdCount = holdingsData?.data?.account?.tokens?.totalCount ?? 0

  return {
    mintCount,
    holdCount,
    nftMintPoints: mintCount * 2000000,
    nftHoldPoints: holdCount * 250000,
    totalNftPoints: mintCount * 2000000 + holdCount * 250000,
  }
}
