import type { Hex } from 'viem'
import { encodePacked, keccak256, toHex } from 'viem'

/**
 * Computes a triple ID by hashing subject, predicate, and object atom IDs with TRIPLE_SALT.
 * @param subjectAtomData Subject atom ID.
 * @param predicateAtomData Predicate atom ID.
 * @param objectAtomData Object atom ID.
 * @returns Keccak256 hash representing the triple ID.
 */
export function calculateTripleId(
  subjectAtomData: Hex,
  predicateAtomData: Hex,
  objectAtomData: Hex,
) {
  const salt = keccak256(toHex('TRIPLE_SALT'))
  return keccak256(
    encodePacked(
      ['bytes32', 'bytes32', 'bytes32', 'bytes32'],
      [salt, subjectAtomData, predicateAtomData, objectAtomData],
    ),
  )
}
