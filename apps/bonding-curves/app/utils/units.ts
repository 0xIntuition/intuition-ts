import { parseEther, parseGwei, parseUnits } from 'viem'

/**
 * Parses a numeric string input that may include units or scientific notation.
 * Supports formats:
 * - Scientific notation: "1e18", "2e18"
 * - Unit suffixes: "1 ether", "1 gwei", "1 wei"
 * - Plain numbers: "1000000000000000000"
 */
export function parseNumberInput(value: string): bigint {
  const trimmed = value.trim()

  // Handle unit suffixes
  if (trimmed.includes(' ')) {
    const [num, unit] = trimmed.split(' ')
    switch (unit.toLowerCase()) {
      case 'ether':
        return parseEther(num)
      case 'gwei':
        return parseGwei(num)
      case 'wei':
        return BigInt(num)
      default:
        throw new Error(`Unknown unit: ${unit}`)
    }
  }

  // Handle scientific notation
  if (trimmed.includes('e')) {
    const [base, exponent] = trimmed.split('e').map(Number)
    console.log('parsing scientific notation', base, exponent)
    return parseUnits(base.toString(), exponent)
  }

  // Try parsing as ether first (common case)
  try {
    console.log('parsing ether', trimmed)
    return parseEther(trimmed)
  } catch {
    // If that fails, treat as raw wei value
    console.log('parsing wei', trimmed)
    return BigInt(trimmed)
  }
} 