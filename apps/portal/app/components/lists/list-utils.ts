import { GetAtomQuery } from '@0xintuition/graphql'

import { getSpecialPredicate } from '@lib/utils/app'
import { CURRENT_ENV } from 'app/consts'

export const createIdentityArrays = (
  identities: GetAtomQuery['atom'][],
  objectVaultId: string,
) => {
  const subjectIdentityVaultIds = identities.map(
    (identity) => identity?.vault_id,
  )
  const predicateHasTagVaultIds = identities.map(
    () => getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
  )
  const objectIdentityVaultIds = identities.map(() => objectVaultId)

  return {
    subjectIdentityVaultIds,
    predicateHasTagVaultIds,
    objectIdentityVaultIds,
  }
}
