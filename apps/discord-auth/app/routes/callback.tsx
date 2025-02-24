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
    const { access_token } = await getDiscordTokens(code)
    const discordUser = await getDiscordUser(access_token)

    // Get current session to preserve wallet info
    const session = await getSession(request)

    console.log('Callback received Discord user:', discordUser)
    console.log('Discord user roles:', discordUser.roles)
    console.log('Preserving wallet auth:', session.walletAuth)

    // Create session preserving wallet info
    return createSession(
      {
        discordUser,
        walletAuth: session.walletAuth, // Preserve existing wallet auth
      },
      '/login',
    )
  } catch (error) {
    console.error('Discord auth error:', error)
    throw new Error('Failed to authenticate with Discord')
  }
}
