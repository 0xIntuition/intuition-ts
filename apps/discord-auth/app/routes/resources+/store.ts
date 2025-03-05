import { json, type ActionFunctionArgs } from '@remix-run/node'

import { ROLE_POINTS } from '../../.server/discord.ts'
import { createSession, getSession } from '../../.server/session.ts'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request)
  const discordUser = session.discordUser

  if (!discordUser) {
    return json({ error: 'No Discord user in session' }, { status: 400 })
  }

  // Parse JSON data from request body
  const body = await request.json()

  const walletAddress = body.walletAddress.toLowerCase()

  if (!walletAddress) {
    return json({ error: 'No wallet address provided' }, { status: 400 })
  }

  // Calculate points from roles using ROLE_POINTS mapping
  const points = discordUser.roleIds.reduce((total, roleId) => {
    const rolePoints = ROLE_POINTS[roleId] || 0
    return total + rolePoints
  }, 0)

  try {
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
