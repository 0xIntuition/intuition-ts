import { VaultDetailsType } from 'app/types'
import { Atom } from 'app/types/atom'
import { Triple } from 'app/types/triple'
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
  claim?: Triple | null
  identity?: Atom | null
  vaultId: string
  vaultDetails?: VaultDetailsType
}>({
  isOpen: false,
  id: null,
  direction: undefined,
  modalType: undefined,
  mode: undefined,
  claim: undefined,
  identity: undefined,
  vaultId: '0',
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
  tag?: Atom | null
  identity?: Atom | null
  invalidIdentity?: Atom | null
}>({
  isOpen: false,
  id: null,
  tag: null,
  identity: null,
  invalidIdentity: null,
})

export const imageModalAtom = atom<{
  isOpen: boolean
}>({
  isOpen: false,
})

export const createClaimModalAtom = atom<{
  isOpen: boolean
  subject?: Atom | null
  predicate?: Atom | null
  object?: Atom | null
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
