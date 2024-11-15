import { useEffect, useState } from 'react'

import { useGetAtomsQuery } from '@0xintuition/graphql'

import { useDebounce } from './useDebounce'

interface UseAtomSearchProps {
  selectedAtomIds?: string[]
}

export function useAtomSearch({
  selectedAtomIds = [],
}: UseAtomSearchProps = {}) {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const { data: atomsData } = useGetAtomsQuery(
    {
      where: debouncedSearch
        ? {
            _or: [
              { label: { _ilike: `%${debouncedSearch}%` } },
              { type: { _ilike: `%${debouncedSearch}%` } },
            ],
            id: { _nin: selectedAtomIds },
          }
        : { id: { _nin: selectedAtomIds } },
    },
    {
      queryKey: [
        'get-atoms-query',
        { search: debouncedSearch, selectedAtomIds },
      ],
    },
  )

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery((event.target as HTMLInputElement).value)
  }

  return {
    atoms: atomsData?.atoms_aggregate.nodes || [],
    setSearchQuery,
    handleInput,
  }
}
