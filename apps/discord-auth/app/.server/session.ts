import { createCookieSessionStorage, redirect } from '@remix-run/node'

import type { AuthSession, DiscordUser } from '../types/auth'

// Ensure we have a proper session secret in production
if (
  process.env.NODE_ENV === 'production' &&
  (!process.env.SESSION_SECRET ||
    process.env.SESSION_SECRET === 'default-secret')
) {
  throw new Error(
    'SESSION_SECRET must be set in production. Generate one with: openssl rand -base64 32',
  )
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax', // Since we're on the same domain, lax is fine
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET || 'default-secret'],
    secure: process.env.NODE_ENV === 'production', // Secure in production
    // Don't set domain - let the browser use the current domain
  },
})

interface DiscordAPIRole {
  id: string
  name: string
  color: number
  position: number
  permissions: string
  managed: boolean
  mentionable: boolean
  icon?: string | null
  unicode_emoji?: string | null
}

async function fetchGuildRoles(
  roleIds: string[],
): Promise<DiscordUser['roles']> {
  const guildId = process.env.DISCORD_GUILD_ID
  if (!guildId || !process.env.DISCORD_BOT_TOKEN) {
    throw new Error('Missing Discord environment variables')
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}/roles`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Discord roles')
  }

  const allRoles: DiscordAPIRole[] = await response.json()

  return allRoles
    .filter((role) => roleIds.includes(role.id))
    .sort((a, b) => b.position - a.position)
    .map((role) => ({
      id: role.id,
      name: role.name,
      color: role.color ? `#${role.color.toString(16).padStart(6, '0')}` : null,
      position: role.position,
      icon: role.icon,
      unicodeEmoji: role.unicode_emoji,
    }))
}

export async function getSession(request: Request): Promise<AuthSession> {
  console.log('Request headers:', {
    host: request.headers.get('host'),
    origin: request.headers.get('origin'),
    cookie: request.headers.get('Cookie'),
  })

  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const data = {
    discordUser: session.get('discordUser'),
    walletAuth: session.get('walletAuth'),
  }

  console.log('Getting session data:', {
    hasWalletAuth: Boolean(data.walletAuth),
    walletAddress: data.walletAuth?.address,
    hasDiscordUser: Boolean(data.discordUser),
    host: request.headers.get('host'),
  })

  // If we have a discord user with role IDs, fetch the full role information
  if (
    data.discordUser?.roles?.length > 0 &&
    Array.isArray(data.discordUser.roles) &&
    typeof data.discordUser.roles[0] === 'string'
  ) {
    try {
      const fullRoles = await fetchGuildRoles(data.discordUser.roles)
      data.discordUser.roles = fullRoles
    } catch (error) {
      console.error('Failed to fetch role information:', error)
    }
  }

  return data
}

export async function createSession(
  data: AuthSession,
  redirectTo: string,
): Promise<Response> {
  const session = await sessionStorage.getSession()
  session.set('discordUser', data.discordUser)
  session.set('walletAuth', data.walletAuth)

  // No need for domain options since we're on a single domain
  const cookie = await sessionStorage.commitSession(session)
  console.log('Generated Set-Cookie header:', cookie)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': cookie,
    },
  })
}

export async function destroySession(request: Request): Promise<Response> {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}
