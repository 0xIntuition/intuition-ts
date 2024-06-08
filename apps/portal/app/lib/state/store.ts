import { atom } from 'jotai'

export const onboardingModalAtom = atom<{
  isOpen: boolean
}>({
  isOpen: false,
})
