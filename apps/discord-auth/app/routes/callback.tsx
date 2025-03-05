import { redirect, type LoaderFunctionArgs } from '@remix-run/node'

import { getDiscordTokens, getDiscordUser } from '../.server/discord'
import { createSession, getSession } from '../.server/session'
import type { DiscordUser, SessionDiscordUser } from '../types/discord'

function minimizeDiscordUser(user: DiscordUser): SessionDiscordUser {
  // Ensure roles is always an array
  const roles = user.roles || []

  // Calculate total points from the roles
  const totalPoints = roles.reduce((sum, role) => sum + (role.points || 0), 0)

  const sessionUser = {
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    roleIds: roles.map((role) => role.id),
    totalPoints,
  }

  return sessionUser
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const userAgent = request.headers.get('User-Agent') || ''

  // Block known bots
  if (userAgent.toLowerCase().includes('bot') || userAgent.includes('Slack')) {
    return new Response('Not allowed', { status: 403 })
  }

  if (!code) {
    return redirect('/login')
  }

  try {
    const currentSession = await getSession(request)

    let discordUser: SessionDiscordUser | null = null
    try {
      // Get tokens and extract access token
      const { access_token } = await getDiscordTokens(code)

      // Get user and immediately minimize
      const fullUser = await getDiscordUser(access_token)
      discordUser = minimizeDiscordUser(fullUser)

      if (global.gc) {
        global.gc()
      }
    } catch (error) {
      console.error('Discord auth error:', error)
      return redirect('/login')
    }

    try {
      const response = await createSession(
        {
          discordUser,
          walletAuth: currentSession.walletAuth,
        },
        '/login',
      )

      // Force GC and log final memory
      if (global.gc) {
        global.gc()
      }

      return response
    } catch (error) {
      return createSession(
        { discordUser: null, walletAuth: currentSession.walletAuth },
        '/login',
      )
    }
  } catch (error) {
    console.error('Session error:', error)
    return redirect('/login')
  }
}
