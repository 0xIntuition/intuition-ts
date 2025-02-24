import { json } from '@remix-run/node'

import type { DiscordAPIRole } from '../../types/discord'

function getMemoryUsage() {
  if (global.gc) {
    global.gc()
  }
  const used = process.memoryUsage()
  return {
    rss: Math.round(used.rss / 1024 / 1024),
    heapTotal: Math.round(used.heapTotal / 1024 / 1024),
    heapUsed: Math.round(used.heapUsed / 1024 / 1024),
    external: Math.round(used.external / 1024 / 1024),
  }
}

export async function loader() {
  const initialMemory = getMemoryUsage()

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

    console.log('Discord roles API memory usage:', {
      ...getMemoryUsage(),
      rssDiff: `${Math.round((process.memoryUsage().rss - initialMemory.rss * 1024 * 1024) / 1024)}KB`,
      rolesCount: minimalRoles.length,
    })

    return json(minimalRoles)
  } catch (error) {
    console.error('Discord roles API error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      memory: getMemoryUsage(),
    })

    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch roles',
      },
      { status: 500 },
    )
  }
}
