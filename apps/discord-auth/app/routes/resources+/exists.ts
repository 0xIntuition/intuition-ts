import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { gql, GraphQLClient } from 'graphql-request'

import { getSession } from '../../.server/session'

const api_url = process.env.HASURA_POINTS_ENDPOINT
const client = new GraphQLClient(api_url!, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_POINTS_SECRET as string,
  },
})

interface CheckUserExistsResponse {
  discord_users: {
    id: number
    discord_id: string
    wallet_address: string
    points: number
  }[]
}

const CheckUserExistsQuery = gql`
  query CheckUserExists($walletAddress: String!, $discordId: String!) {
    discord_users(
      where: {
        _or: [
          { wallet_address: { _eq: $walletAddress } }
          { discord_id: { _eq: $discordId } }
        ]
      }
    ) {
      id
      discord_id
      wallet_address
      points
    }
  }
`

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const walletAddress = url.searchParams.get('walletAddress')
  const session = await getSession(request)

  if (!walletAddress) {
    return json({ error: 'Wallet address is required' }, { status: 400 })
  }

  if (!session.discordUser?.id) {
    return json({ error: 'Discord user is required' }, { status: 400 })
  }

  try {
    const result = await client.request<CheckUserExistsResponse>(
      CheckUserExistsQuery,
      {
        walletAddress,
        discordId: session.discordUser.id,
      },
    )

    const existingUser = result.discord_users[0]

    return json({
      exists: result.discord_users.length > 0,
      // Additional context about what exists
      details: existingUser
        ? {
            hasWallet: existingUser.wallet_address === walletAddress,
            hasDiscord: existingUser.discord_id === session.discordUser.id,
          }
        : null,
    })
  } catch (error) {
    console.error('Error checking user existence:', error)
    return json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
