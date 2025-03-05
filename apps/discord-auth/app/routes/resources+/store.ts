import { json, type ActionFunctionArgs } from '@remix-run/node'
import { gql, GraphQLClient } from 'graphql-request'

import { ROLE_POINTS } from '../../.server/discord.ts'
import { createSession, getSession } from '../../.server/session.ts'

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
    points: number
  }
}

const UpsertDiscordUserMutation = gql`
  mutation UpsertDiscordUser(
    $discordId: String!
    $username: String!
    $roles: jsonb!
    $walletAddress: String!
    $points: Int!
  ) {
    # Try discord_id conflict first
    insert_discord_users_one(
      object: {
        discord_id: $discordId
        username: $username
        roles: $roles
        wallet_address: $walletAddress
        points: $points
      }
      on_conflict: {
        constraint: discord_users_discord_id_key
        update_columns: [username, roles, wallet_address, points]
      }
    ) {
      id
      discord_id
      wallet_address
      points
    }
  }
`

// Add a new mutation for wallet address conflict
const UpdateByWalletMutation = gql`
  mutation UpdateByWallet(
    $discordId: String!
    $username: String!
    $roles: jsonb!
    $walletAddress: String!
    $points: Int!
  ) {
    # Try wallet_address conflict
    insert_discord_users_one(
      object: {
        discord_id: $discordId
        username: $username
        roles: $roles
        wallet_address: $walletAddress
        points: $points
      }
      on_conflict: {
        constraint: discord_users_wallet_address_key
        update_columns: [discord_id, username, roles, points]
      }
    ) {
      id
      discord_id
      wallet_address
      points
    }
  }
`

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request)
  const discordUser = session.discordUser

  if (!discordUser) {
    return json({ error: 'No Discord user in session' }, { status: 400 })
  }

  // Parse JSON data from request body
  const body = await request.json()
  console.log('Request body:', body)

  const walletAddress = body.walletAddress

  if (!walletAddress) {
    return json({ error: 'No wallet address provided' }, { status: 400 })
  }

  // Calculate points from roles using ROLE_POINTS mapping
  const points = discordUser.roleIds.reduce((total, roleId) => {
    const rolePoints = ROLE_POINTS[roleId] || 0
    console.log(`Role ${roleId} points: ${rolePoints}`)
    return total + rolePoints
  }, 0)

  console.log('Calculated points from roles:', points)
  console.log(
    'Role points breakdown:',
    discordUser.roleIds.map((roleId) => ({
      roleId,
      points: ROLE_POINTS[roleId] || 0,
    })),
  )

  const variables = {
    discordId: discordUser.id,
    username: discordUser.username,
    roles: discordUser.roleIds,
    walletAddress,
    points,
  }

  console.log('Mutation variables:', variables)
  console.log('Points being stored:', variables.points)

  try {
    // Try discord_id conflict first
    try {
      const result = await client.request<UpsertDiscordUserResponse>(
        UpsertDiscordUserMutation,
        variables,
      )
      console.log('Hasura response (discord_id):', result)
    } catch (error) {
      // If it fails due to wallet_address conflict, try the wallet update
      console.log('Trying wallet address conflict resolution...')
      const result = await client.request<UpsertDiscordUserResponse>(
        UpdateByWalletMutation,
        variables,
      )
      console.log('Hasura response (wallet_address):', result)
    }

    // Update session with wallet info and redirect to login
    return createSession(
      {
        discordUser: {
          ...discordUser,
          totalPoints: points,
        },
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
