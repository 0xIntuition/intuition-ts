import { redirect, type LoaderFunctionArgs } from '@remix-run/node'

import { getDiscordTokens, getDiscordUser } from '../.server/discord'
import { createSession, getSession } from '../.server/session'
import type { DiscordUser, SessionDiscordUser } from '../types/discord'

function getMemoryUsage() {
  if (global.gc) {
    global.gc()
  }
  const used = process.memoryUsage()
  return {
    rss: Math.round(used.rss / 1024 / 1024),
    heapTotal: Math.round(used.heapTotal / 1024 / 1024),
    heapUsed: Math.round(used.heapUsed / 1024 / 1024),
    external: Math.round(used.external / 1024 / 1024),
  }
}

function minimizeDiscordUser(user: DiscordUser): SessionDiscordUser {
  return {
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    roleIds: user.roles.map((role) => role.id),
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const initialMemory = getMemoryUsage()
  console.log('Memory usage at start:', initialMemory)

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
    console.log('Memory after getting session:', {
      ...getMemoryUsage(),
      rssDiff: `${Math.round((process.memoryUsage().rss - initialMemory.rss * 1024 * 1024) / 1024)}KB`,
    })

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
      console.log('Final memory usage:', {
        ...getMemoryUsage(),
        rssDiff: `${Math.round((process.memoryUsage().rss - initialMemory.rss * 1024 * 1024) / 1024)}KB`,
      })

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
