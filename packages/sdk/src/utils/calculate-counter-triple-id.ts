import type { Hex } from 'viem'
import { encodePacked, keccak256, toHex } from 'viem'

/**
 * Computes a counter triple ID by hashing a triple ID with COUNTER_SALT.
 * @param tripleId Triple ID to counter.
 * @returns Keccak256 hash representing the counter triple ID.
 */
export function calculateCounterTripleId(tripleId: Hex) {
  const salt = keccak256(toHex('COUNTER_SALT'))
  return keccak256(encodePacked(['bytes32', 'bytes32'], [salt, tripleId]))
}
