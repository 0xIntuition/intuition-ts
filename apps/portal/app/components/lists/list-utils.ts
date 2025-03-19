import { getSpecialPredicate } from '@lib/utils/app'
import { CURRENT_ENV } from 'app/consts'
import { Atom } from 'app/types/atom'

export const createIdentityArrays = (
  identities: Atom[],
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
