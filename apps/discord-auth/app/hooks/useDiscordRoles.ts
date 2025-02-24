import { useEffect, useState } from 'react'

import type { DiscordRole } from '../types/discord'

interface UseDiscordRolesProps {
  roleIds: string[] | undefined
}

export function useDiscordRoles({ roleIds }: UseDiscordRolesProps) {
  const [roles, setRoles] = useState<DiscordRole[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRoles() {
      if (!roleIds?.length) {
        setRoles([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/resources/_discord.roles')
        if (!response.ok) {
          throw new Error('Failed to fetch roles')
        }
        const allRoles: DiscordRole[] = await response.json()

        // Filter to only the roles the user has
        const userRoles = allRoles
          .filter((role) => roleIds.includes(role.id))
          .sort((a, b) => b.position - a.position) // Sort by position (highest first)

        setRoles(userRoles)
      } catch (error) {
        console.error('Error fetching roles:', error)
        setError(
          error instanceof Error ? error.message : 'Failed to fetch roles',
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  }, [roleIds])

  return { roles, isLoading, error }
}
