import { toHex } from 'viem'

// write a function to generate n random atoms and apply toHex to each
export function generateRandomAtoms(n: number): `0x${string}`[] {
  return Array.from({ length: n }, () =>
    toHex(Math.random().toString(36).substring(2, 15)),
  )
}
