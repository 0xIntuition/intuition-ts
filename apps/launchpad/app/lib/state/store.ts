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

export const onboardingModalAtom = atom<{
  isOpen: boolean
  gameId: string | null
}>({
  isOpen: false,
  gameId: null,
})

export const shareModalAtom = atom<{
  isOpen: boolean
  currentPath: string | null
  title: string
  tvl: number
  percentageChange?: number
  valueChange?: number
}>({
  isOpen: false,
  currentPath: null,
  title: '',
  tvl: 0,
})

export const atomDetailsModalAtom = atom<{
  isOpen: boolean
  atomId: number
}>({
  isOpen: false,
  atomId: 0,
})
