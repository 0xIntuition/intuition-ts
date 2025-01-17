import { error } from 'console'
import process from 'process'

import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node'
import { gql, GraphQLClient } from 'graphql-request'

interface PointsRecord {
  account_id: string
  community: number
  minigame1: number
  portal_quests: number
  referral: number
  social: number
}

interface GetAccountPointsResponse {
  points_by_pk: PointsRecord | null
}

const GetAccountPointsQuery = gql`
  query GetAccountPoints($account_id: String!) {
    points_by_pk(account_id: $account_id) {
      account_id
      community
      minigame1
      portal_quests
      referral
      social
    }
  }
`

if (process.env.HASURA_POINTS_ENDPOINT === undefined) {
  throw error('Endpoint not defined')
}

const client = new GraphQLClient(process.env.HASURA_POINTS_ENDPOINT)

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

  const data = await client.request<GetAccountPointsResponse>(
    GetAccountPointsQuery,
    {
      account_id: accountId,
    },
  )

  return new Response(JSON.stringify({ points: data.points_by_pk }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
