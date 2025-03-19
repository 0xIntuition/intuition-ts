import { pointsClient } from '@lib/graphql/client'
import logger from '@lib/utils/logger'
import { gql } from 'graphql-request'
import type { LoaderFunctionArgs } from '@remix-run/node'

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
  total_points: number
  type?: string
}

interface GetEpochsResponse {
  epochs: Epoch[]
}

const GetEpochsWithTypeQuery = gql`
  query GetEpochsWithType($type: String!) {
    epochs(
      order_by: { start_date: desc }
      where: {
        type: { _eq: $type }
      }
    ) {
      id
      name
      description
      start_date
      end_date
      is_active
      created_at
      updated_at
      total_points_available
      total_points
      type
    }
  }
`

const GetEpochsWithoutTypeQuery = gql`
  query GetEpochsWithoutType {
    epochs(
      order_by: { start_date: desc }
      where: { type: { _is_null: true } }
    ) {
      id
      name
      description
      start_date
      end_date
      is_active
      created_at
      updated_at
      total_points_available
      type
    }
  }
`

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    logger('Fetching epochs')

    // Get type from URL search params
    const url = new URL(request.url)
    const type = url.searchParams.get('type')

    let data: GetEpochsResponse
    if (type) {
      // Use the query with type filter
      data = await pointsClient.request<GetEpochsResponse, { type: string }>(
        GetEpochsWithTypeQuery,
        { type }
      )
    } else {
      // Use the query without type filter (NULL type epochs)
      data = await pointsClient.request<GetEpochsResponse>(
        GetEpochsWithoutTypeQuery
      )
    }

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
