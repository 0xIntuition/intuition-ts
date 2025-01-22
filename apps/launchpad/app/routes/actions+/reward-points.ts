import { invariant } from '@lib/utils/misc'
import type { ActionFunctionArgs } from '@remix-run/node'
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

interface InsertPointsResponse {
  insert_points_one: {
    account_id: string
  }
}

interface UpdatePointsResponse {
  update_points_by_pk: {
    account_id: string
  }
}

const api_url = process.env.HASURA_POINTS_ENDPOINT
const client = new GraphQLClient(api_url!, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_POINTS_SECRET as string,
  },
})

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

const InsertPointsMutation = gql`
  mutation InsertPoints($object: points_insert_input = {}) {
    insert_points_one(object: $object) {
      account_id
      minigame1
    }
  }
`

const UpdatePointsMutation = gql`
  mutation UpdatePoints(
    $account_id: String = ""
    $points: points_set_input = {}
  ) {
    update_points_by_pk(
      pk_columns: { account_id: $account_id }
      _set: $points
    ) {
      account_id
      minigame1
    }
  }
`

export const getAccountPoints = async (account_id: string) => {
  const data = await client.request<GetAccountPointsResponse>(
    GetAccountPointsQuery,
    {
      account_id,
    },
  )
  return data.points_by_pk
}

export const insertPoints = async (points: Partial<PointsRecord>) => {
  const data = await client.request<InsertPointsResponse>(
    InsertPointsMutation,
    {
      object: points,
    },
  )
  return data.insert_points_one
}

export const updatePoints = async (
  account_id: string,
  points: Partial<PointsRecord>,
) => {
  const data = await client.request<UpdatePointsResponse>(
    UpdatePointsMutation,
    {
      account_id,
      points,
    },
  )
  return data.update_points_by_pk
}

export const upsertPoints = async (
  account_id: string,
  points: Partial<PointsRecord>,
) => {
  const existing = await getAccountPoints(account_id)
  if (existing) {
    return updatePoints(account_id, points)
  }
  return insertPoints({ account_id, ...points })
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.formData()
  const accountId = formData.get('accountId')
  const type = formData.get('type')

  invariant(accountId, 'accountId is required')
  invariant(type, 'type is required')
  invariant(typeof type === 'string', 'type must be a string')

  // Only update minigame1 points, leave other fields untouched
  const pointsAllocation: Partial<PointsRecord> = {
    minigame1: type === 'minigame1' ? 200 : 0,
  }

  try {
    const result = await upsertPoints(accountId.toString(), pointsAllocation)

    return { success: true, data: result }
  } catch (error) {
    if (error instanceof Response) {
      throw error
    }
    return { success: false, error: 'Failed to update points' }
  }
}
