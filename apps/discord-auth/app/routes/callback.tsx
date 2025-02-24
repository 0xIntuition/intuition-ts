import { type LoaderFunctionArgs } from '@remix-run/node'

import { getDiscordTokens, getDiscordUser } from '../.server/discord'
import { createSession, getSession } from '../.server/session'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    throw new Error('No code provided')
  }

  try {
    // Get current session first to preserve any existing data
    const currentSession = await getSession(request)
    console.log('Current session data:', {
      hasWalletAuth: Boolean(currentSession.walletAuth),
      hasDiscordUser: Boolean(currentSession.discordUser),
    })

    const { access_token } = await getDiscordTokens(code)
    const discordUser = await getDiscordUser(access_token)

    console.log('Callback received Discord user:', discordUser)
    console.log('Discord user roles:', discordUser.roles)
    console.log('Preserving wallet auth:', currentSession.walletAuth)

    // Create new session preserving existing wallet auth
    return createSession(
      {
        discordUser,
        walletAuth: currentSession.walletAuth, // Preserve existing wallet auth
      },
      '/login',
    )
  } catch (error) {
    console.error('Discord auth error:', error)

    // On error, try to preserve the current session
    const currentSession = await getSession(request)
    return createSession(
      {
        discordUser: null,
        walletAuth: currentSession.walletAuth, // Keep wallet auth even on error
      },
      '/login',
    )
  }
}
