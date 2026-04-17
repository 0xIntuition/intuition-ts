import type { Hex } from 'viem'
import { encodePacked, isHex, keccak256, stringToHex, toHex } from 'viem'

export function calculateAtomId(atomData: string | Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  // Convert to hex if it's not already hex-encoded, ensuring safe input to keccak256
  const hexData = isHex(atomData) ? atomData : stringToHex(atomData)
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
