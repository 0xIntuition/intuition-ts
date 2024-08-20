import { IdentityPresenter } from '@0xintuition/api'

import { getSpecialPredicate } from '@lib/utils/app'
import { CURRENT_ENV } from 'app/consts'

export const createTagArrays = (
  tags: IdentityPresenter[],
  subjectVaultId: string,
) => {
  const subjectIdentityVaultIds = tags.map(() => subjectVaultId)
  const predicateHasTagVaultIds = tags.map(
    () => getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
  )
  const objectTagVaultIds = tags.map((tag) => tag.vault_id)

  return { subjectIdentityVaultIds, predicateHasTagVaultIds, objectTagVaultIds }
}
