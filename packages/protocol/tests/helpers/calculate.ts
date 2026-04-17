import type { Hex } from 'viem'
import { encodePacked, keccak256, stringToHex, toHex } from 'viem'

export function calculateAtomId(atomData: string | Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  // Convert to hex if it's a string, ensuring safe input to keccak256
  const hexData =
    typeof atomData === 'string' ? stringToHex(atomData) : atomData
  return keccak256(
    encodePacked(['bytes32', 'bytes'], [salt, keccak256(hexData)]),
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
