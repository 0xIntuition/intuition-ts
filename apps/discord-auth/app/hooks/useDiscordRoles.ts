import { useEffect, useMemo, useState } from 'react'

import type { DiscordRole } from '../types/discord'

interface UseDiscordRolesProps {
  roleIds: string[] | undefined
}

export function useDiscordRoles({ roleIds }: UseDiscordRolesProps) {
  const [allRoles, setAllRoles] = useState<DiscordRole[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all roles once
  useEffect(() => {
    async function fetchRoles() {
      if (!roleIds) {
        setAllRoles([])
        return
      }

      // Even if roleIds is empty, we'll fetch all roles and show them
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/resources/roles')

        if (!response.ok) {
          throw new Error(
            `Failed to fetch roles: ${response.status} ${response.statusText}`,
          )
        }

        const roles: DiscordRole[] = await response.json()
        setAllRoles(roles)
      } catch (error) {
        console.error('useDiscordRoles: Error fetching roles:', error)
        setError(
          error instanceof Error ? error.message : 'Failed to fetch roles',
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  }, [roleIds]) // Changed to depend on roleIds to refetch if they change

  // Filter roles based on roleIds
  const roles = useMemo(() => {
    if (!allRoles.length) {
      return []
    }

    // If roleIds is empty or undefined, return an empty array
    // We should never show roles the user doesn't have
    if (!roleIds?.length) {
      return []
    }

    const userRoles = allRoles
      .filter((role) => {
        const hasRole = roleIds.includes(role.id)
        return hasRole
      })
      .sort((a, b) => b.position - a.position)

    return userRoles
  }, [roleIds, allRoles])

  return { roles, isLoading, error }
}
