import { Question } from '@lib/graphql/types'
import { AtomType, TripleType, VaultDetailsType } from 'app/types'
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

export type StakeModalState = {
  isOpen: boolean
  id: string | null
  direction?: 'for' | 'against'
  modalType?: 'atom' | 'triple'
  mode?: 'deposit' | 'redeem'
  triple?: TripleType
  atom?: AtomType
  vaultDetails?: VaultDetailsType
  vaultId?: string | number
}

export const stakeModalAtom = atom<StakeModalState>({
  isOpen: false,
  id: null,
})

export const onboardingModalAtom = atom<{
  isOpen: boolean
  question: Question | null
  predicateId: number | null
  objectId: number | null
  tagObjectId?: number | null
}>({
  isOpen: false,
  question: null,
  predicateId: null,
  objectId: null,
  tagObjectId: null,
})

export const shareModalAtom = atom<{
  isOpen: boolean
  currentPath: string | null
  title: string
  tvl?: number
  percentageChange?: number
  valueChange?: number
}>({
  isOpen: false,
  currentPath: null,
  title: '',
})

export const atomDetailsModalAtom = atom<{
  isOpen: boolean
  atomId: number
  data?: {
    id: string
    image: string
    name: string
    list: string
    users: number
    forTvl: number
    againstTvl?: number
    position?: number
  }
}>({
  isOpen: false,
  atomId: 0,
  data: undefined,
})
