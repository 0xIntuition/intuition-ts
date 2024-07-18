import { useEffect, useState } from 'react'

import { IdentityPresenter } from '@0xintuition/api'

import { SEARCH_IDENTITIES_RESOURCE_ROUTE } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'

export function useIdentityServerSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [identities, setIdentities] = useState<IdentityPresenter[]>([])
  const identityFetcher = useFetcher<IdentityPresenter>()
  const identitiesFetcher = useFetcher<IdentityPresenter[]>()

  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = (event.target as HTMLInputElement).value
    setSearchQuery(value)
  }

  const populateIdentities = async (ids: string[]) => {
    ids.forEach((id) => {
      identityFetcher.load(`${SEARCH_IDENTITIES_RESOURCE_ROUTE}?search=${id}`)
      console.log('//-----------//')
      console.log('- identityFetcher.data -')
      console.log(identityFetcher.data)
      console.log('//-----------//')
    })
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

  return { setSearchQuery, identities, handleInput, populateIdentities }
}
