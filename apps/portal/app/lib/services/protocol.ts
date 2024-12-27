interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

const GetFeeTransfersDocument = {
  query: `
query GetFeeTransfers($address: String!, $cutoff_timestamp: bigint) {
before_cutoff: fee_transfers_aggregate(
  where: { block_timestamp: { _lte: $cutoff_timestamp }, sender_id: { _eq: $address } }
) {
  aggregate {
    sum {
      amount
    }
  }
}

after_cutoff: fee_transfers_aggregate(
  where: { block_timestamp: { _gt: $cutoff_timestamp }, sender_id: { _eq: $address } }
) {
  aggregate {
    sum {
      amount
    }
  }
}
}
  `,
} as const

interface GetFeeTransfersQuery {
  before_cutoff: {
    aggregate: {
      sum: {
        amount: string
      }
    }
  }
  after_cutoff: {
    aggregate: {
      sum: {
        amount: string
      }
    }
  }
}

interface GetFeeTransfersQueryVariables {
  address: string
  cutoff_timestamp: number
}

async function fetchGraphQL<T, V>(
  document: { query: string },
  variables: V,
): Promise<GraphQLResponse<T>> {
  const endpoint = process.env.I7N_GRAPHQL_ENDPOINT
  if (!endpoint) {
    throw new Error('I7N_GRAPHQL_ENDPOINT not configured')
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

export async function fetchProtocolFees(address: string) {
  const cutoffTimestamp = 1733356800

  const feeData = await fetchGraphQL<
    GetFeeTransfersQuery,
    GetFeeTransfersQueryVariables
  >(GetFeeTransfersDocument, {
    address,
    cutoff_timestamp: cutoffTimestamp,
  })

  const beforeCutoffAmount =
    feeData?.data?.before_cutoff?.aggregate?.sum?.amount ?? '0'
  const afterCutoffAmount =
    feeData?.data?.after_cutoff?.aggregate?.sum?.amount ?? '0'

  const beforeCutoffPoints =
    (BigInt(beforeCutoffAmount) * BigInt(10000000)) / BigInt(1e18)
  const afterCutoffPoints =
    (BigInt(afterCutoffAmount) * BigInt(1000000)) / BigInt(1e18)
  const totalPoints = beforeCutoffPoints + afterCutoffPoints

  return {
    beforeCutoffAmount,
    afterCutoffAmount,
    beforeCutoffPoints: beforeCutoffPoints.toString(),
    afterCutoffPoints: afterCutoffPoints.toString(),
    totalPoints: totalPoints.toString(),
  }
}
