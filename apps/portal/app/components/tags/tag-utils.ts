import { TAG_PREDICATE_VAULT_ID_TESTNET } from 'constants'

import { IdentityPresenter } from '@0xintuition/api'

export const createTagArrays = (
  tags: IdentityPresenter[],
  subjectVaultId: string,
) => {
  const subjectIdentityVaultIds = tags.map(() => subjectVaultId)
  const predicateHasTagVaultIds = tags.map(() => TAG_PREDICATE_VAULT_ID_TESTNET)
  const objectTagVaultIds = tags.map((tag) => tag.vault_id)

  return { subjectIdentityVaultIds, predicateHasTagVaultIds, objectTagVaultIds }
}
