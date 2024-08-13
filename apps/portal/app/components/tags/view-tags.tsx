import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { saveListModalAtom } from '@lib/state/store'
import { useSetAtom } from 'jotai'

export function ViewTags({ tags }: { tags: IdentityPresenter[] }) {
  const setSaveListModalActive = useSetAtom(saveListModalAtom)

  const handleIdentityClick = (identity: IdentityPresenter) => {
    setSaveListModalActive({
      isOpen: true,
      id: identity.vault_id,
    })
  }

  return (
    <IdentitySearchCombobox
      identities={tags}
      shouldFilter={true}
      onIdentityClick={handleIdentityClick}
      onIdentitySelect={handleIdentityClick}
    />
  )
}
