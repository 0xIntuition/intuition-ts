import { useQuery } from '@tanstack/react-query'

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

async function fetchGraphQL<T, V>(
  document: { query: string },
  variables: V,
): Promise<GraphQLResponse<T>> {
  const endpoint = process.env.RELIC_GRAPHQL_ENDPOINT
  if (!endpoint) {
    throw new Error('RELIC_GRAPHQL_ENDPOINT not configured')
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

export function useRelicCounts(address: string) {
  const cutoffTimestamp = 1735516799

  const { data: mintCountData } = useQuery({
    queryKey: ['relicMintCount', address, cutoffTimestamp],
    queryFn: () =>
      fetchGraphQL<
        GetMintCountQuery,
        { address: string; cutoff_timestamp: number }
      >(GetMintCountDocument, {
        address,
        cutoff_timestamp: cutoffTimestamp,
      }),
  })

  const { data: holdingsData } = useQuery({
    queryKey: ['relicHoldCount', address],
    queryFn: () =>
      fetchGraphQL<GetRelicHoldingsQuery, { address: string }>(
        GetRelicHoldingsDocument,
        {
          address,
        },
      ),
  })

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
