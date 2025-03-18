import { AtomType } from 'app/types/atom'

import { useIdentityServerSearch } from './useIdentityServerSearch'

interface UseFilteredIdentitySearchProps {
  selectedItems: AtomType[]
}

function useFilteredIdentitySearch({
  selectedItems,
}: UseFilteredIdentitySearchProps) {
  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()

  const filteredIdentities = identities.filter(
    (identity) =>
      !selectedItems.some((item) => item.vault_id === identity.vault_id),
  )

  return {
    setSearchQuery,
    filteredIdentities,
    handleInput,
  }
}

export default useFilteredIdentitySearch
