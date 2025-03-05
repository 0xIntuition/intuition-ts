import { json } from '@remix-run/node'

import type { DiscordAPIRole } from '../../types/discord'

export async function loader() {
  try {
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

    const roles = (await response.json()) as DiscordAPIRole[]

    // Map directly to minimal role objects
    const minimalRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
      color: role.color ? `#${role.color.toString(16).padStart(6, '0')}` : null,
      position: role.position,
      icon: role.icon ?? null,
      unicodeEmoji: role.unicode_emoji ?? null,
    }))

    if (global.gc) {
      global.gc()
    }

    return json(minimalRoles)
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch roles',
      },
      { status: 500 },
    )
  }
}
