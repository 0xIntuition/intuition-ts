import type { Hex } from 'viem'
import { encodePacked, keccak256, toHex } from 'viem'

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
