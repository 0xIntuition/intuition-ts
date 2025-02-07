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
  total_points_available: number
}

interface GetEpochsResponse {
  epochs: Epoch[]
}

const GetEpochsQuery = gql`
  query GetEpochs {
    epochs(order_by: { start_date: desc }) {
      id
      name
      description
      start_date
      end_date
      is_active
      created_at
      updated_at
      total_points_available
    }
  }
`

export async function loader() {
  try {
    logger('Fetching epochs')

    const data = await pointsClient.request<GetEpochsResponse>(GetEpochsQuery)
    logger('Epochs response:', data)

    return new Response(JSON.stringify({ epochs: data.epochs }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    logger('Error fetching epochs:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch epochs',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
