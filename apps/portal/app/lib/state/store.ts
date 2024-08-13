import { IdentityPresenter, TagEmbeddedPresenter } from '@0xintuition/api'

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

export const createIdentityModalAtom = atomWithToggle(false)
export const createClaimModalAtom = atomWithToggle(false)
export const editProfileModalAtom = atomWithToggle(false)
export const editSocialLinksModalAtom = atomWithToggle(false)

export const tagsModalAtom = atom<{
  isOpen: boolean
  mode: 'view' | 'add'
}>({
  isOpen: false,
  mode: 'add',
})

export const stakeModalAtom = atom<{
  isOpen: boolean
  id: string | null
  direction?: 'for' | 'against'
  modalType?: 'identity' | 'claim'
  mode?: 'deposit' | 'redeem'
}>({
  isOpen: false,
  id: null,
  direction: undefined,
  modalType: undefined,
  mode: undefined,
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
  tag?: TagEmbeddedPresenter | null
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
  // imageSrc: string | null
  identity: IdentityPresenter | null
}>({
  isOpen: false,
  identity: null,
  // imageSrc: null,
})
