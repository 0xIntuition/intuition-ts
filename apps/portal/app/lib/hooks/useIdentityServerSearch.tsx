import { useEffect, useState } from 'react'

import { IdentityPresenter } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { SEARCH_IDENTITIES_RESOURCE_ROUTE } from 'consts'

export function useIdentityServerSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [identities, setIdentities] = useState<IdentityPresenter[]>([])
  const identitiesFetcher = useFetcher<IdentityPresenter[]>()

  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = (event.target as HTMLInputElement).value
    setSearchQuery(value)
  }

  useEffect(() => {
    logger('identitiesFetcher.data changed:', identitiesFetcher.data)
    if (identitiesFetcher.data) {
      setIdentities(identitiesFetcher.data)
    }
  }, [identitiesFetcher.data])

  useEffect(() => {
    logger('searchQuery changed:', searchQuery)
    if (searchQuery) {
      const searchParam = `?search=${encodeURIComponent(searchQuery)}`
      identitiesFetcher.load(
        `${SEARCH_IDENTITIES_RESOURCE_ROUTE}${searchParam}`,
      )
    }
    // Ignoring identitiesFetcher to prevent loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, SEARCH_IDENTITIES_RESOURCE_ROUTE])

  return { setSearchQuery, identities, handleInput }
}
