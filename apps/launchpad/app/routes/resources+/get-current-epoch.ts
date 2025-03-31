import { pointsClient } from '@lib/graphql/client'
import logger from '@lib/utils/logger'
import { gql } from 'graphql-request'

interface Epoch {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
  type: string | null
}

interface GetCurrentEpochResponse {
  epochs: Epoch[]
}

const GetCurrentEpochQuery = gql`
  query GetCurrentEpoch {
    epochs(where: { is_active: { _eq: true } }, limit: 1) {
      id
      name
      description
      start_date
      end_date
      is_active
      created_at
      updated_at
      type
    }
  }
`

export async function loader() {
  try {
    const data =
      await pointsClient.request<GetCurrentEpochResponse>(GetCurrentEpochQuery)

    return new Response(JSON.stringify({ epoch: data.epochs[0] ?? null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    logger('Error fetching current epoch:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch current epoch',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
