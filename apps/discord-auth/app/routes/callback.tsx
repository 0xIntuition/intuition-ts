import { redirect, type LoaderFunctionArgs } from '@remix-run/node'

import { getDiscordTokens, getDiscordUser } from '../.server/discord'
import { createSession, getSession } from '../.server/session'
import type { DiscordUser, SessionDiscordUser } from '../types/discord'

function getMemoryUsage() {
  const used = process.memoryUsage()
  return {
    rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
    external: `${Math.round(used.external / 1024 / 1024)}MB`,
  }
}

function minimizeDiscordUser(user: DiscordUser): SessionDiscordUser {
  const minimalUser = {
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    roleIds: user.roles.map((role) => role.id),
  }

  // Log sizes for comparison
  console.log('Size comparison:', {
    fullUserSize: JSON.stringify(user).length,
    minimalUserSize: JSON.stringify(minimalUser).length,
    reduction: `${Math.round((1 - JSON.stringify(minimalUser).length / JSON.stringify(user).length) * 100)}%`,
  })

  return minimalUser
}

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('Memory usage at start:', getMemoryUsage())

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const userAgent = request.headers.get('User-Agent') || ''

  console.log('Discord callback URL:', url.toString())
  console.log('Request cookies:', request.headers.get('Cookie'))
  console.log('User Agent:', userAgent)

  // Block known bots that might consume the auth code
  if (
    userAgent.includes('bot') ||
    userAgent.includes('Bot') ||
    userAgent.includes('Slack')
  ) {
    console.log('Blocked bot access:', userAgent)
    return new Response('Not allowed', { status: 403 })
  }

  if (!code) {
    console.error('No code provided in Discord callback')
    return redirect('/login')
  }

  try {
    const currentSession = await getSession(request)
    console.log('Memory after getting session:', getMemoryUsage())

    let access_token: string
    try {
      const tokens = await getDiscordTokens(code)
      access_token = tokens.access_token
      console.log('Successfully got Discord access token')
      console.log('Memory after getting tokens:', getMemoryUsage())
    } catch (error) {
      console.error('Failed to get Discord tokens:', error)
      return redirect('/login')
    }

    let discordUser
    try {
      const fullUser = await getDiscordUser(access_token)
      console.log('Memory after getting full user:', getMemoryUsage())

      // Only store minimal auth data in session
      discordUser = minimizeDiscordUser(fullUser)
      console.log('Memory after minimizing user:', getMemoryUsage())
    } catch (error) {
      console.error('Failed to get Discord user:', error)
      return redirect('/login')
    }

    console.log('Preserving wallet auth:', currentSession.walletAuth)
    console.log(
      'Session size estimate:',
      JSON.stringify(discordUser).length,
      'bytes',
    )

    try {
      const response = await createSession(
        {
          discordUser,
          walletAuth: currentSession.walletAuth,
        },
        '/login',
      )

      // Log final cookie size
      const setCookie = response.headers.get('Set-Cookie')
      console.log('Final cookie details:', {
        size: setCookie?.length || 0,
        memorySummary: getMemoryUsage(),
      })

      return response
    } catch (error) {
      console.error('Failed to create session:', error)
      return createSession(
        {
          discordUser: null,
          walletAuth: currentSession.walletAuth,
        },
        '/login',
      )
    }
  } catch (error) {
    console.error('Unhandled Discord callback error:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : String(error),
    })

    try {
      const currentSession = await getSession(request)
      return createSession(
        {
          discordUser: null,
          walletAuth: currentSession.walletAuth,
        },
        '/login',
      )
    } catch (sessionError) {
      console.error('Failed to handle error gracefully:', sessionError)
      return redirect('/login')
    }
  }
}
