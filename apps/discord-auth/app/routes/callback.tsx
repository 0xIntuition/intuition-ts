import { type LoaderFunctionArgs } from '@remix-run/node'

import { getDiscordTokens, getDiscordUser } from '../.server/discord'
import { createSession } from '../.server/session'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    throw new Error('No code provided')
  }

  try {
    const { access_token } = await getDiscordTokens(code)
    const discordUser = await getDiscordUser(access_token)

    console.log('Callback received Discord user:', discordUser)
    console.log('Discord user roles:', discordUser.roles)

    // Create session with Discord user info and redirect to dashboard
    return createSession(
      {
        discordUser,
        walletAuth: null,
      },
      '/dashboard',
    )
  } catch (error) {
    console.error('Discord auth error:', error)
    throw new Error('Failed to authenticate with Discord')
  }
}
