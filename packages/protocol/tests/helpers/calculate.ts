import type { Hex } from 'viem'
import { encodePacked, keccak256, toHex } from 'viem'

export function calculateAtomId(atomData: Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  return keccak256(
    encodePacked(['bytes32', 'bytes'], [salt, keccak256(atomData)]),
  )
}

export function calculateCounterTripleId(tripleId: Hex) {
  const salt = keccak256(toHex('COUNTER_SALT'))
  return keccak256(encodePacked(['bytes32', 'bytes32'], [salt, tripleId]))
}

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
