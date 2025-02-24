import { redirect, type LoaderFunctionArgs } from '@remix-run/node'

import { getDiscordTokens, getDiscordUser } from '../.server/discord'
import { createSession, getSession } from '../.server/session'

export async function loader({ request }: LoaderFunctionArgs) {
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
    // Redirect back to login instead of throwing
    return redirect('/login')
  }

  try {
    // Get current session first to preserve any existing data
    const currentSession = await getSession(request)
    console.log('Current session data:', {
      hasWalletAuth: Boolean(currentSession.walletAuth),
      walletAddress: currentSession.walletAuth?.address,
      hasDiscordUser: Boolean(currentSession.discordUser),
      host: request.headers.get('host'),
    })

    // Get Discord tokens with error handling
    let access_token: string
    try {
      const tokens = await getDiscordTokens(code)
      access_token = tokens.access_token
      console.log('Successfully got Discord access token')
    } catch (error) {
      console.error('Failed to get Discord tokens:', error)
      return redirect('/login')
    }

    // Get Discord user with error handling
    let discordUser
    try {
      discordUser = await getDiscordUser(access_token)
      console.log('Successfully got Discord user:', {
        id: discordUser.id,
        username: discordUser.username,
        rolesCount: discordUser.roles?.length,
      })
    } catch (error) {
      console.error('Failed to get Discord user:', error)
      return redirect('/login')
    }

    console.log('Preserving wallet auth:', currentSession.walletAuth)

    // Create new session preserving existing wallet auth
    try {
      return createSession(
        {
          discordUser,
          walletAuth: currentSession.walletAuth, // Preserve existing wallet auth
        },
        '/login',
      )
    } catch (error) {
      console.error('Failed to create session:', error)
      // If session creation fails, try to preserve at least the wallet auth
      return createSession(
        {
          discordUser: null,
          walletAuth: currentSession.walletAuth,
        },
        '/login',
      )
    }
  } catch (error) {
    // Log the full error details
    console.error('Unhandled Discord callback error:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : String(error),
    })

    // Always try to redirect back to login instead of showing an error
    try {
      const currentSession = await getSession(request)
      return createSession(
        {
          discordUser: null,
          walletAuth: currentSession.walletAuth, // Keep wallet auth even on error
        },
        '/login',
      )
    } catch (sessionError) {
      console.error('Failed to handle error gracefully:', sessionError)
      // Last resort - just redirect without session data
      return redirect('/login')
    }
  }
}
