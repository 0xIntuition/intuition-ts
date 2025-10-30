import type { Hex } from 'viem'
import { encodePacked, keccak256, toHex } from 'viem'

export function calculateAtomId(atomData: Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  return keccak256(
    encodePacked(['bytes32', 'bytes'], [salt, keccak256(atomData)]),
  )
}
