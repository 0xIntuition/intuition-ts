import { useEffect, useState } from 'react'

import { IdentityPresenter } from '@0xintuition/api'

import { useFetcher } from '@remix-run/react'
import { SEARCH_IDENTITIES_RESOURCE_ROUTE } from 'consts'
import { Identity, IdentityType } from 'types'

export function useIdentitySelection() {
  const [selectedIdentities, setSelectedIdentities] = useState<
    Record<IdentityType, IdentityPresenter | undefined>
  >({
    [Identity.Subject]: undefined,
    [Identity.Predicate]: undefined,
    [Identity.Object]: undefined,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [identities, setIdentities] = useState<IdentityPresenter[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const identitiesFetcher = useFetcher<IdentityPresenter[]>()

  const handleIdentitySelection = (
    identityType: IdentityType,
    identity: IdentityPresenter,
  ) => {
    setSelectedIdentities((prev) => ({ ...prev, [identityType]: identity }))
    setSearchQuery('')
    setIdentities([])
  }

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true)
      setError(null)
      const searchParam = `?search=${encodeURIComponent(searchQuery)}`
      identitiesFetcher.load(
        `${SEARCH_IDENTITIES_RESOURCE_ROUTE}${searchParam}`,
      )
    }
  }, [searchQuery])

  useEffect(() => {
    if (identitiesFetcher.state === 'idle') {
      setIsLoading(false)
      if (identitiesFetcher.data) {
        setIdentities(identitiesFetcher.data)
      } else if (
        identitiesFetcher.data === undefined &&
        identitiesFetcher.state === 'idle'
      ) {
        setError('Failed to fetch identities. Please try again.')
      }
    }
  }, [identitiesFetcher.state, identitiesFetcher.data])

  return {
    selectedIdentities,
    searchQuery,
    setSearchQuery,
    setIdentities,
    identities,
    handleIdentitySelection,
    error,
    isLoading,
  }
}
