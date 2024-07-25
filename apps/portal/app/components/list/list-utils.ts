import { IdentityPresenter } from '@0xintuition/api'

import { TAG_PREDICATE_VAULT_ID_TESTNET } from 'consts'

export const createIdentityArrays = (
  identities: IdentityPresenter[],
  objectVaultId: string,
) => {
  const subjectIdentityVaultIds = identities.map(
    (identity) => identity.vault_id,
  )
  const predicateHasTagVaultIds = identities.map(
    () => TAG_PREDICATE_VAULT_ID_TESTNET,
  )
  const objectIdentityVaultIds = identities.map(() => objectVaultId)

  return {
    subjectIdentityVaultIds,
    predicateHasTagVaultIds,
    objectIdentityVaultIds,
  }
}
