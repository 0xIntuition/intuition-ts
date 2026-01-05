import type { Hex } from 'viem'
import { encodePacked, keccak256, toHex } from 'viem'

/**
 * Computes an atom ID by hashing the atom data with the ATOM_SALT.
 * @param atomData Raw atom data as hex.
 * @returns Keccak256 hash representing the atom ID.
 */
export function calculateAtomId(atomData: Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  return keccak256(
    encodePacked(['bytes32', 'bytes'], [salt, keccak256(atomData)]),
  )
}
