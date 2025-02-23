import { json, type ActionFunctionArgs } from '@remix-run/node'
import { gql, GraphQLClient } from 'graphql-request'

import { createSession, getSession } from '../.server/session.ts'

const api_url = process.env.HASURA_POINTS_ENDPOINT
const client = new GraphQLClient(api_url!, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_POINTS_SECRET as string,
  },
})

interface UpsertDiscordUserResponse {
  insert_discord_users_one: {
    id: number
    discord_id: string
    wallet_address: string
  }
}

const UpsertDiscordUserMutation = gql`
  mutation UpsertDiscordUser(
    $discordId: String!
    $username: String!
    $roles: jsonb!
    $walletAddress: String!
  ) {
    insert_discord_users_one(
      object: {
        discord_id: $discordId
        username: $username
        roles: $roles
        wallet_address: $walletAddress
      }
      on_conflict: {
        constraint: discord_users_discord_id_key
        update_columns: [username, roles, wallet_address]
      }
    ) {
      id
      discord_id
      wallet_address
    }
  }
`

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  const session = await getSession(request)
  if (!session.discordUser) {
    return json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  console.log('Request body:', body)

  const { walletAddress } = body
  if (!walletAddress) {
    return json({ error: 'Wallet address is required' }, { status: 400 })
  }

  console.log('Session discord user:', session.discordUser)

  try {
    const variables = {
      discordId: session.discordUser.id,
      username: session.discordUser.username,
      roles: session.discordUser.roles || [],
      walletAddress,
    }

    console.log('Mutation variables:', variables)

    const result = await client.request<UpsertDiscordUserResponse>(
      UpsertDiscordUserMutation,
      variables,
    )

    console.log('Hasura response:', result)

    // Update session with wallet info and redirect to login
    return createSession(
      {
        discordUser: session.discordUser,
        walletAuth: {
          address: walletAddress,
        },
      },
      '/login',
    )
  } catch (error) {
    console.error('Detailed error:', error)
    return json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
