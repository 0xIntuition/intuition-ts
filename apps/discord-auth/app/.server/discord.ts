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

const ALLOWED_ROLE_IDS = [
  // Main roles
  '1186312711739547699', // Seeker v2
  '1186380921570607114', // Wave
  '1186381022821101758', // Energy
  '1186381058736930867', // Atom
  '1208418197167153243', // Molecule v2
  '1186381150625726554', // Cell
  '1186381180422062110', // Neuron
  '1208418541410189352', // Synapse v2
  '1208418723158036530', // Aura v2
  '1186381257198817392', // Soul
  '1206583612384739349', // Tribesman v2
  '1208438051622355035', // Aligned v2
  '1212434261643362324', // Enlightened v3
  '1211321175461077043', // Enlightened v2
  '1186381353860735016', // Enlightened
  // Orbit roles
  '996887464922841159', // Inquirer
  '922676359631896598', // Wanderer
  '996944844280832025', // Traveler
  '996830829386944584', // Disciple
  '922676885740199947', // Enchaner
  '996998149430321162', // Illuminated
  '1032846335155642508', // Conscious
  // Remove the @everyone role since it's not needed
] as readonly string[]

// Role points mapping based on the CSV data
export const ROLE_POINTS: Record<string, number> = {
  // Main roles
  '1186312711739547699': 5000, // Seeker v2
  '1186380921570607114': 15000, // Wave
  '1186381022821101758': 25000, // Energy
  '1186381058736930867': 35000, // Atom
  '1208418197167153243': 45000, // Molecule v2
  '1186381150625726554': 55000, // Cell
  '1186381180422062110': 65000, // Neuron
  '1208418541410189352': 75000, // Synapse v2
  '1208418723158036530': 85000, // Aura v2
  '1186381257198817392': 95000, // Soul
  '1206583612384739349': 105000, // Tribesman v2
  '1208438051622355035': 115000, // Aligned v2
  '1212434261643362324': 75000, // Enlightened v3
  '1211321175461077043': 87500, // Enlightened v2
  '1186381353860735016': 125000, // Enlightened
  // Orbit roles
  '996887464922841159': 5000, // Inquirer
  '922676359631896598': 15000, // Wanderer
  '996944844280832025': 20000, // Traveler
  '996830829386944584': 30000, // Disciple
  '922676885740199947': 50000, // Enchaner
  '996998149430321162': 70000, // Illuminated
  '1032846335155642508': 100000, // Conscious
}

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
    .filter((role) => {
      const isInMemberRoles = member.roles.includes(role.id)
      const isInAllowedRoles = ALLOWED_ROLE_IDS.includes(role.id)

      return isInMemberRoles && isInAllowedRoles
    })
    .sort((a, b) => b.position - a.position)
    .map((role) => {
      const points = ROLE_POINTS[role.id] || 0

      return {
        id: role.id,
        name: role.name,
        color: role.color
          ? `#${role.color.toString(16).padStart(6, '0')}`
          : null,
        position: role.position,
        icon: role.icon ?? null,
        unicodeEmoji: role.unicode_emoji ?? null,
        points,
      }
    })

  // Calculate total points
  const totalPoints = userRoles.reduce(
    (sum, role) => sum + (role.points || 0),
    0,
  )

  // We're not going to include all roles as a fallback anymore
  // Only include roles that the user actually has and are in the allowed list

  return {
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    roles: userRoles,
    totalPoints, // Add total points to the user object
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

  // Filter roles by the allowed list
  const allowedRoles = roles
    .filter((role) => {
      const isAllowed = ALLOWED_ROLE_IDS.includes(role.id)
      return isAllowed
    })
    .map((role): DiscordRole => {
      const points = ROLE_POINTS[role.id] || 0

      return {
        id: role.id,
        name: role.name,
        color: role.color
          ? `#${role.color.toString(16).padStart(6, '0')}`
          : null,
        position: role.position,
        icon: role.icon ?? null,
        unicodeEmoji: role.unicode_emoji ?? null,
        points,
      }
    })

  return allowedRoles
}
