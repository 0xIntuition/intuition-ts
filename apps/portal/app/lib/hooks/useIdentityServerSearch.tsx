import { useEffect, useState } from 'react'

import { IdentityPresenter } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import {
  GET_IDENTITIES_BY_PARAM_RESOURCE_ROUTE,
  GET_IDENTITIES_RESOURCE_ROUTE,
  SEARCH_IDENTITIES_RESOURCE_ROUTE,
} from 'app/consts'

interface DefaultIdentitiesResponse {
  identities: IdentityPresenter[]
}

export function useIdentityServerSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [identities, setIdentities] = useState<IdentityPresenter[]>([])
  const identitiesFetcher = useFetcher<
    IdentityPresenter[] | DefaultIdentitiesResponse
  >()

  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = (event.target as HTMLInputElement).value
    setSearchQuery(value)
  }

  useEffect(() => {
    logger('identitiesFetcher.data changed:', identitiesFetcher.data)
    if (identitiesFetcher.data) {
      const newIdentities = Array.isArray(identitiesFetcher.data)
        ? identitiesFetcher.data
        : identitiesFetcher.data.identities || []
      logger('Setting identities:', newIdentities)
      setIdentities(newIdentities)
    }
  }, [identitiesFetcher.data])

  useEffect(() => {
    logger('searchQuery changed:', searchQuery)
    if (searchQuery) {
      const searchParam = `?search=${encodeURIComponent(searchQuery)}`
      identitiesFetcher.load(
        `${SEARCH_IDENTITIES_RESOURCE_ROUTE}${searchParam}`,
      )
    } else {
      const defaultParams = new URLSearchParams({
        page: '1',
        limit: '20',
        sortBy: 'AssetsSum',
        direction: 'desc',
      })
      identitiesFetcher.load(
        `${GET_IDENTITIES_BY_PARAM_RESOURCE_ROUTE}?${defaultParams}`,
      )
    }
  }, [
    // omits the fetcher from the exhaustive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchQuery,
    SEARCH_IDENTITIES_RESOURCE_ROUTE,
    GET_IDENTITIES_RESOURCE_ROUTE,
  ])

  return { setSearchQuery, identities, handleInput }
}
