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
export const editProfileModalAtom = atomWithToggle(false)
export const editSocialLinksModalAtom = atomWithToggle(false)

export const stakeModalAtom = atom<{
  isOpen: boolean
  id: string | null
  direction?: 'for' | 'against' | null
  modalType?: 'identity' | 'claim' | null
  mode?: 'deposit' | 'redeem'
}>({
  isOpen: false,
  id: null,
  direction: null,
  modalType: null,
  mode: undefined,
})
