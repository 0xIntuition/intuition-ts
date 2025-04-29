import { pointsClient } from '@lib/graphql/client'
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node'
import { gql } from 'graphql-request'

interface PointsRecord {
  account_id: string
  community: number
  launchpad_quests_points: number
  portal_quests: number
  referral: number
  social: number
  relic_points: number
  total_points: number
}

interface GetAccountPointsResponse {
  epoch_points_by_pk: PointsRecord[]
}

const GetAccountPointsQuery = gql`
  query GetAccountPoints($account_id: String!) {
    epoch_points_by_pk(account_id: $account_id) {
      account_id
      community: total_community
      launchpad_quests_points
      portal_quests
      referral
      social
      relic_points
      total_points
    }
  }
`

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<
  TypedResponse<{ points: PointsRecord | null }>
> {
  const url = new URL(request.url)
  const accountId = url.searchParams.get('accountId')

  if (!accountId) {
    return new Response(JSON.stringify({ points: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await pointsClient.request<GetAccountPointsResponse>(
    GetAccountPointsQuery,
    {
      account_id: accountId,
    },
  )

  return new Response(
    JSON.stringify({ points: data.epoch_points_by_pk ?? null }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
