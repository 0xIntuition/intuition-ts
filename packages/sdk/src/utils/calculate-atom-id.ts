import type { Hex } from 'viem'
import { encodePacked, keccak256, stringToHex, toHex } from 'viem'

/**
 * Computes an atom ID by hashing the atom data with the ATOM_SALT.
 * @param atomData Raw atom data as string or hex.
 * @returns Keccak256 hash representing the atom ID.
 */
export function calculateAtomId(atomData: string | Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  // Convert to hex if it's a string, ensuring safe input to keccak256
  const hexData =
    typeof atomData === 'string' ? stringToHex(atomData) : atomData
  return keccak256(
    encodePacked(['bytes32', 'bytes'], [salt, keccak256(hexData)]),
  )
}
