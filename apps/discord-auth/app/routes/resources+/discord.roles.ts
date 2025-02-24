import { json } from '@remix-run/node'

import { fetchGuildRoles } from '../../.server/discord'

export async function loader() {
  try {
    const roles = await fetchGuildRoles()
    return json(roles)
  } catch (error) {
    console.error('Failed to fetch Discord roles:', error)
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch roles',
      },
      { status: 500 },
    )
  }
}
