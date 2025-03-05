import { createCookieSessionStorage, redirect } from '@remix-run/node'

import type { AuthSession } from '../types/auth'
import type { DiscordAPIRole, DiscordRole } from '../types/discord'

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

// Moved to separate export for client-side use
export async function fetchGuildRoles(
  roleIds: string[],
): Promise<DiscordRole[]> {
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
    .map(
      (role): DiscordRole => ({
        id: role.id,
        name: role.name,
        color: role.color
          ? `#${role.color.toString(16).padStart(6, '0')}`
          : null,
        position: role.position,
        icon: role.icon ?? null,
        unicodeEmoji: role.unicode_emoji ?? null,
      }),
    )
}

export async function getSession(request: Request): Promise<AuthSession> {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const authSession = {
    discordUser: session.get('discordUser'),
    walletAuth: session.get('walletAuth'),
  }

  console.log('Session debug - getSession:', {
    hasDiscordUser: Boolean(authSession.discordUser),
    discordUserRoleIds: authSession.discordUser?.roleIds,
    discordUserTotalPoints: authSession.discordUser?.totalPoints,
  })

  return authSession
}

export async function createSession(
  data: AuthSession,
  redirectTo: string,
): Promise<Response> {
  console.log('Session debug - createSession:', {
    hasDiscordUser: Boolean(data.discordUser),
    discordUserRoleIds: data.discordUser?.roleIds,
    discordUserTotalPoints: data.discordUser?.totalPoints,
  })

  const session = await sessionStorage.getSession()
  session.set('discordUser', data.discordUser)
  session.set('walletAuth', data.walletAuth)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
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
