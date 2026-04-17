import type { Hex } from 'viem'
import { encodePacked, isHex, keccak256, stringToHex, toHex } from 'viem'

/**
 * Computes an atom ID by hashing the atom data with the ATOM_SALT.
 * @param atomData Raw atom data as string or hex.
 * @returns Keccak256 hash representing the atom ID.
 */
export function calculateAtomId(atomData: string | Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  // Convert to hex if it's not already hex-encoded, ensuring safe input to keccak256
  const hexData = isHex(atomData) ? atomData : stringToHex(atomData)
  return keccak256(
    encodePacked(['bytes32', 'bytes'], [salt, keccak256(hexData)]),
  )
}
