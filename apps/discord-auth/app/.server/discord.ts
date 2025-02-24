import { redirect } from '@remix-run/node'

import type {
  DiscordAPIRole,
  DiscordAPIUser,
  DiscordGuildMember,
  DiscordRole,
  DiscordTokenResponse,
  DiscordUser,
} from '../types/discord'
import { getSession } from './session'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI) {
  throw new Error('Missing Discord environment variables')
}

const DISCORD_ENDPOINT = 'https://discord.com/api/v10'

export function getDiscordAuthURL() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds.members.read',
  })

  return `https://discord.com/oauth2/authorize?${params}`
}

export async function getDiscordTokens(
  code: string,
): Promise<DiscordTokenResponse> {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: DISCORD_REDIRECT_URI,
  })

  const response = await fetch(`${DISCORD_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  if (!response.ok) {
    throw new Error('Failed to get Discord tokens')
  }

  return response.json()
}

export async function getDiscordUser(
  accessToken: string,
): Promise<DiscordUser> {
  // First get the user's basic info
  const userResponse = await fetch(`${DISCORD_ENDPOINT}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!userResponse.ok) {
    const errorData = await userResponse.json().catch(() => ({}))
    throw new Error(
      `Failed to get Discord user: ${errorData.message || userResponse.statusText}`,
    )
  }

  const user: DiscordAPIUser = await userResponse.json()

  // Then get the guild member info (including roles)
  const guildId = process.env.DISCORD_GUILD_ID
  if (!guildId) {
    throw new Error('Missing DISCORD_GUILD_ID environment variable')
  }

  const memberResponse = await fetch(
    `${DISCORD_ENDPOINT}/users/@me/guilds/${guildId}/member`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )

  if (!memberResponse.ok) {
    const errorData = await memberResponse.json().catch(() => ({}))
    throw new Error(
      `Failed to get Discord guild member: ${errorData.message || memberResponse.statusText}`,
    )
  }

  const member: DiscordGuildMember = await memberResponse.json()

  // Get guild roles
  const rolesResponse = await fetch(
    `${DISCORD_ENDPOINT}/guilds/${guildId}/roles`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    },
  )

  if (!rolesResponse.ok) {
    throw new Error(
      `Failed to get Discord guild roles: ${rolesResponse.status} ${rolesResponse.statusText}`,
    )
  }

  const roles: DiscordAPIRole[] = await rolesResponse.json()

  // Map role IDs to role objects
  const userRoles = roles
    .filter((role) => member.roles.includes(role.id))
    .sort((a, b) => b.position - a.position) // Sort by position (highest first)
    .map((role) => ({
      id: role.id,
      name: role.name,
      color: role.color ? `#${role.color.toString(16).padStart(6, '0')}` : null,
      position: role.position,
      icon: role.icon ?? null,
      unicodeEmoji: role.unicode_emoji ?? null,
    }))

  return {
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    roles: userRoles,
  } as DiscordUser
}

export async function requireDiscordUser(request: Request) {
  const url = new URL(request.url)
  const session = await getSession(request)

  if (!session.discordUser) {
    const searchParams = new URLSearchParams([
      ['redirectTo', url.pathname + url.search],
    ])
    throw redirect(`/login?${searchParams}`)
  }

  return session.discordUser
}

export async function fetchGuildRoles(): Promise<DiscordRole[]> {
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

  const roles: DiscordAPIRole[] = await response.json()

  return roles.map(
    (role): DiscordRole => ({
      id: role.id,
      name: role.name,
      color: role.color ? `#${role.color.toString(16).padStart(6, '0')}` : null,
      position: role.position,
      icon: role.icon ?? null,
      unicodeEmoji: role.unicode_emoji ?? null,
    }),
  )
}
