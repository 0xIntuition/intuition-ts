import { redirect } from '@remix-run/node'

import type { DiscordUser } from '../types/auth'
import { getSession } from './session'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI) {
  throw new Error('Missing Discord environment variables')
}

interface DiscordTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

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

interface DiscordGuildMember {
  roles: string[]
  nick: string | null
  avatar: string | null
  premium_since: string | null
  joined_at: string
  pending: boolean
  communication_disabled_until: string | null
}

interface DiscordAPIUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  verified?: boolean
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
  console.log('Fetching Discord user info...')
  const userResponse = await fetch(`${DISCORD_ENDPOINT}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!userResponse.ok) {
    const errorData = await userResponse.json().catch(() => ({}))
    console.error('Failed to get Discord user:', {
      status: userResponse.status,
      statusText: userResponse.statusText,
      error: errorData,
    })
    throw new Error('Failed to get Discord user')
  }

  const user: DiscordAPIUser = await userResponse.json()
  console.log('Got Discord user:', { id: user.id, username: user.username })

  // Then get the guild member info (including roles)
  const guildId = process.env.DISCORD_GUILD_ID
  if (!guildId) {
    throw new Error('Missing DISCORD_GUILD_ID environment variable')
  }

  console.log('Fetching guild member info...', { guildId })
  const memberResponse = await fetch(
    `${DISCORD_ENDPOINT}/users/@me/guilds/${guildId}/member`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )

  if (!memberResponse.ok) {
    const errorData = await memberResponse.json().catch(() => ({}))
    console.error('Failed to get guild member:', {
      status: memberResponse.status,
      statusText: memberResponse.statusText,
      error: errorData,
      guildId,
    })
    throw new Error('Failed to get Discord guild member')
  }

  const member: DiscordGuildMember = await memberResponse.json()
  console.log('Got guild member:', { roles: member.roles })

  // Get guild roles
  console.log('Fetching guild roles...', {
    guildId,
    botTokenPrefix: process.env.DISCORD_BOT_TOKEN?.slice(0, 10),
  })

  const rolesResponse = await fetch(
    `${DISCORD_ENDPOINT}/guilds/${guildId}/roles`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    },
  )

  if (!rolesResponse.ok) {
    const errorData = await rolesResponse.json().catch(() => ({}))
    console.error('Failed to fetch roles:', {
      status: rolesResponse.status,
      statusText: rolesResponse.statusText,
      error: errorData,
      guildId,
      botTokenLength: process.env.DISCORD_BOT_TOKEN?.length,
      headers: rolesResponse.headers,
    })
    throw new Error(
      `Failed to get Discord guild roles: ${rolesResponse.status} ${rolesResponse.statusText}`,
    )
  }

  const roles: DiscordAPIRole[] = await rolesResponse.json()
  console.log('Successfully fetched roles:', {
    guildId,
    roleCount: roles.length,
    roles: roles.map((r) => ({ id: r.id, name: r.name })),
  })
  console.log('Member roles:', member.roles)

  // Map role IDs to role objects
  const userRoles = roles
    .filter((role) => member.roles.includes(role.id))
    .sort((a, b) => b.position - a.position) // Sort by position (highest first)
    .map((role) => {
      const mappedRole = {
        id: role.id,
        name: role.name,
        color: role.color
          ? `#${role.color.toString(16).padStart(6, '0')}`
          : null,
        position: role.position,
        icon: role.icon,
        unicodeEmoji: role.unicode_emoji,
      }
      console.log('Mapped role:', mappedRole)
      return mappedRole
    })

  console.log('Final user roles:', userRoles)

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
