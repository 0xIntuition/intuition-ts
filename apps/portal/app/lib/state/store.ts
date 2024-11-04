import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { VaultDetailsType } from 'app/types'
import type { WritableAtom } from 'jotai'
import { atom, createStore } from 'jotai'

export const GlobalStore = createStore()

export function atomWithToggle(
  initialValue: boolean,
): WritableAtom<boolean, [boolean | undefined], void> {
  const anAtom = atom<boolean, [boolean | undefined], void>(
    // read function
    initialValue,
    // write function
    (get, set, nextValue?: boolean) => {
      const update = nextValue ?? !get(anAtom)
      set(anAtom, update)
    },
  )
  return anAtom
}

export const globalCreateIdentityModalAtom = atomWithToggle(false)
export const detailCreateIdentityModalAtom = atomWithToggle(false)
export const globalCreateClaimModalAtom = atomWithToggle(false)
export const detailCreateClaimModalAtom = atomWithToggle(false)
export const editProfileModalAtom = atomWithToggle(false)
export const editSocialLinksModalAtom = atomWithToggle(false)

export const tagsModalAtom = atom<{
  isOpen: boolean
  mode: 'view' | 'add'
  readOnly?: boolean
}>({
  isOpen: false,
  mode: 'add',
  readOnly: false,
})

export const stakeModalAtom = atom<{
  isOpen: boolean
  id: string | null
  direction?: 'for' | 'against'
  modalType?: 'identity' | 'claim'
  mode?: 'deposit' | 'redeem'
  claim?: ClaimPresenter
  identity?: IdentityPresenter
  vaultId: string | null
  vaultDetails?: VaultDetailsType
}>({
  isOpen: false,
  id: null,
  direction: undefined,
  modalType: undefined,
  mode: undefined,
  claim: undefined,
  identity: undefined,
  vaultId: null,
  vaultDetails: undefined,
})

export const followModalAtom = atom<{
  isOpen: boolean
  id: string | null
}>({
  isOpen: false,
  id: null,
})

export const addIdentitiesListModalAtom = atom<{
  isOpen: boolean
  id: string | null
}>({
  isOpen: false,
  id: null,
})

export const saveListModalAtom = atom<{
  isOpen: boolean
  id?: string | null
  tag?: IdentityPresenter | null
  identity?: IdentityPresenter | null
  invalidIdentity?: IdentityPresenter | null
}>({
  isOpen: false,
  id: null,
  tag: null,
  identity: null,
  invalidIdentity: null,
})

export const imageModalAtom = atom<{
  isOpen: boolean
  identity: IdentityPresenter | null
}>({
  isOpen: false,
  identity: null,
})

export const createClaimModalAtom = atom<{
  isOpen: boolean
  subject?: IdentityPresenter | null
  predicate?: IdentityPresenter | null
  object?: IdentityPresenter | null
}>({
  isOpen: false,
  subject: null,
  predicate: null,
  object: null,
})

export const shareModalAtom = atom<{
  isOpen: boolean
  currentPath: string | null
}>({
  isOpen: false,
  currentPath: null,
})
