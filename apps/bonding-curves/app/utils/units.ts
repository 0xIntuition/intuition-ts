import { parseEther, parseUnits } from 'viem'

/**
 * Parses a numeric string input that may include units or scientific notation.
 * Supports formats:
 * - Scientific notation: "1e18", "2e18"
 * - Unit suffixes: "1 ether", "1 gwei", "1 wei"
 * - Plain numbers: "1000000000000000000"
 */
export function parseNumberInput(input: string): bigint {
  // Handle scientific notation (e.g., 1e18)
  if (input.toLowerCase().includes('e')) {
    const [base, exponent] = input.toLowerCase().split('e')
    return parseUnits(base, Number(exponent))
  }

  // Handle wei/gwei/ether suffixes
  if (input.toLowerCase().endsWith('wei')) {
    return BigInt(input.slice(0, -3))
  }
  if (input.toLowerCase().endsWith('gwei')) {
    return parseUnits(input.slice(0, -4), 9)
  }
  if (input.toLowerCase().endsWith('ether')) {
    return parseEther(input.slice(0, -5))
  }

  // If no suffix, treat as raw wei value
  return BigInt(input)
}

export function formatNumberInput(value: bigint | number): string {
  const bigintValue = typeof value === 'number' ? BigInt(value) : value

  // If it's a small number (less than 1e9), return as wei
  if (bigintValue < BigInt(1e9)) {
    return bigintValue.toString()
  }

  // Check if it's divisible by common denominations
  if (bigintValue % BigInt(1e18) === 0n) {
    return `${(Number(bigintValue) / 1e18)}e18`
  }
  if (bigintValue % BigInt(1e9) === 0n) {
    return `${(Number(bigintValue) / 1e9)}e9`
  }

  // For other large numbers, use wei
  return bigintValue.toString()
} 