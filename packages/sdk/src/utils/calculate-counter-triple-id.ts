import type { Hex } from 'viem'
import { encodePacked, keccak256, toHex } from 'viem'

export function calculateCounterTripleId(tripleId: Hex) {
  const salt = keccak256(toHex('COUNTER_SALT'))
  return keccak256(encodePacked(['bytes32', 'bytes32'], [salt, tripleId]))
}
