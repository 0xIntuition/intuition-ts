import { getAddress } from 'viem'

export type CsvData = string[][]

export interface DuplicateResult {
  hasDuplicates: boolean
  duplicateIndices: number[]
}

export interface RowProofreadResult {
  isDuplicate: boolean
  // Add more row-level proofing results here
}

export interface UnusualCharacterIssue {
  rowIndex: number
  cellIndex: number
  originalValue: string
  suggestedValue: string
  reason: string // "Garbled Text", "Control Characters", or "Unicode Replacement Character"
}

export interface UnusualCharacterResult {
  hasUnusualCharacters: boolean
  cellIssues: UnusualCharacterIssue[]
}

export interface CsvProofreadResult {
  duplicates: DuplicateResult
  unusualCharacters: UnusualCharacterResult
  // Add more CSV-level proofing results here
}

export interface CAIP10Issue {
  rowIndex: number
  cellIndex: number
  originalValue: string
  suggestedValue: string
  reason: string
}

export interface CAIP10ProofreadResult {
  csvData: CsvData
  cellIssues: CAIP10Issue[]
}

export function proofreadRow(
  row: string[],
  csvData: CsvData,
  rowIndex: number,
): RowProofreadResult {
  return {
    isDuplicate: isRowDuplicate(row, csvData, rowIndex),
    // Add more row-level proofing checks here
  }
}

export function proofreadAll(csvData: CsvData): CsvProofreadResult {
  return {
    duplicates: checkForDuplicates(csvData),
    unusualCharacters: detectUnusualCharacters(csvData),
    // Add more CSV-level proofing checks here
  }
}

function checkForDuplicates(csvData: CsvData): DuplicateResult {
  const dataRows = csvData.slice(1)
  const seen = new Set<string>()
  const duplicateIndices: number[] = []

  dataRows.forEach((row, index) => {
    const rowString = JSON.stringify(row)
    if (seen.has(rowString)) {
      duplicateIndices.push(index + 1) // +1 because we sliced off the header row
    } else {
      seen.add(rowString)
    }
  })

  return {
    hasDuplicates: duplicateIndices.length > 0,
    duplicateIndices,
  }
}

function isRowDuplicate(
  row: string[],
  csvData: CsvData,
  rowIndex: number,
): boolean {
  const dataRows = csvData.slice(1)
  const rowString = JSON.stringify(row)

  return dataRows.some(
    (existingRow, index) =>
      index !== rowIndex - 1 && JSON.stringify(existingRow) === rowString,
  )
}

export interface CellHighlight {
  rowIndex: number
  cellIndex: number
}

export function detectAllAdjacentDuplicates(
  data: string[][],
  sortedIndices: number[],
): CellHighlight[] {
  const highlights: CellHighlight[] = []

  for (let cellIndex = 0; cellIndex < data[0].length; cellIndex++) {
    for (let i = 0; i < sortedIndices.length - 1; i++) {
      const currentRowIndex = sortedIndices[i]
      const nextRowIndex = sortedIndices[i + 1]
      if (data[currentRowIndex][cellIndex] === data[nextRowIndex][cellIndex]) {
        highlights.push({ rowIndex: i, cellIndex })
        highlights.push({ rowIndex: i + 1, cellIndex })
      }
    }
  }

  return highlights
}

export function detectAdjacentDuplicatesForCell(
  data: string[][],
  sortedIndices: number[],
  rowIndex: number,
  cellIndex: number,
): CellHighlight[] {
  const highlights: CellHighlight[] = []
  const sortedRowIndex = sortedIndices.indexOf(rowIndex)

  if (sortedRowIndex > 0) {
    const prevRowIndex = sortedIndices[sortedRowIndex - 1]
    if (data[rowIndex][cellIndex] === data[prevRowIndex][cellIndex]) {
      highlights.push({ rowIndex: sortedRowIndex - 1, cellIndex })
      highlights.push({ rowIndex: sortedRowIndex, cellIndex })
    }
  }

  if (sortedRowIndex < sortedIndices.length - 1) {
    const nextRowIndex = sortedIndices[sortedRowIndex + 1]
    if (data[rowIndex][cellIndex] === data[nextRowIndex][cellIndex]) {
      highlights.push({ rowIndex: sortedRowIndex, cellIndex })
      highlights.push({ rowIndex: sortedRowIndex + 1, cellIndex })
    }
  }

  return highlights
}

export function detectUnusualCharacters(
  csvData: CsvData,
): UnusualCharacterResult {
  const cellIssues: UnusualCharacterIssue[] = []

  for (let rowIndex = 0; rowIndex < csvData.length; rowIndex++) {
    const row = csvData[rowIndex]
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const cell = row[cellIndex]
      const fixResult = fixGarbledText(cell)
      if (fixResult.isGarbled) {
        cellIssues.push({
          rowIndex,
          cellIndex,
          originalValue: cell,
          suggestedValue: fixResult.fixedText,
          reason: fixResult.reason,
        })
      }
    }
  }

  return {
    hasUnusualCharacters: cellIssues.length > 0,
    cellIssues,
  }
}

function fixGarbledText(cell: string): {
  isGarbled: boolean
  fixedText: string
  reason: string
} {
  let fixedText = cell
  let isGarbled = false
  const reasons: string[] = []

  // Check for control characters
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1F\x7F-\x9F]/.test(cell)) {
    isGarbled = true
    reasons.push('Control Characters')
    // eslint-disable-next-line no-control-regex
    fixedText = fixedText.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
  }

  // Check for Unicode Replacement Character
  if (cell.includes('\uFFFD')) {
    isGarbled = true
    reasons.push('Unicode Replacement Character')
    fixedText = fixedText.replace(/\uFFFD/g, '')
  }

  // Regular expression for acceptable characters
  const acceptableChars = /[^\p{L}\p{M}\p{N}\p{P}\p{S}\p{Z}]/gu

  // Check for garbled text (characters outside acceptable ranges)
  if (acceptableChars.test(fixedText)) {
    isGarbled = true
    reasons.push('Garbled Text')
    fixedText = fixedText.replace(acceptableChars, '')
  }

  const reason = reasons.join(', ')

  return { isGarbled, fixedText, reason }
}

export function proofreadCAIP10s(csvData: CsvData): CAIP10ProofreadResult {
  const cellIssues: CAIP10Issue[] = []
  const dataRows = csvData.slice(1) // Skip header row

  for (let rowIndex = 0; rowIndex < dataRows.length; rowIndex++) {
    const row = dataRows[rowIndex]
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const cell = row[cellIndex]
      const fixResult = fixCAIP10(cell)

      // Flag the cell if it needs any fixes (not just invalid or checksum)
      if (fixResult.fixedText !== cell) {
        cellIssues.push({
          rowIndex: rowIndex + 1, // Add 1 to account for header row
          cellIndex,
          originalValue: cell,
          suggestedValue: fixResult.fixedText,
          reason: fixResult.reason,
        })
      }
    }
  }

  return { csvData, cellIssues }
}

export function fixCAIP10(text: string): {
  isValidCAIP10: boolean
  fixedText: string
  reason: string
} {
  try {
    let fixedText = text
    const reasons: string[] = []
    let isValid = true

    // Split and check parts
    let parts = fixedText.split(':')

    // Fix 1: Add CAIP10 prefix if missing
    if (parts.length === 3 && parts[0] !== 'caip10') {
      fixedText = `caip10:${fixedText}`
      reasons.push('Added CAIP10 prefix')
      parts = fixedText.split(':')
    }

    // If we don't have 4 parts after potential prefix fix, it's invalid
    if (parts.length !== 4) {
      return {
        isValidCAIP10: false,
        fixedText,
        reason:
          'Invalid CAIP-10 format - must be caip10:namespace:chainId:address',
      }
    }

    let [prefix, namespace, chainId, address] = parts
    namespace = `${namespace}` // silence warning

    // Fix 2: Fix prefix if needed
    if (prefix !== 'caip10') {
      prefix = 'caip10'
      reasons.push('Fixed prefix')
    }

    // Fix 3: Only clean chainId if namespace is eip155
    if (namespace === 'eip155') {
      if (!/^\d+$/.test(chainId)) {
        // Try to extract numbers only
        const cleanedChainId = chainId.replace(/[^\d]/g, '')
        if (cleanedChainId) {
          chainId = cleanedChainId
          reasons.push('Fixed chainId format')
        } else {
          isValid = false
          reasons.push('Invalid chainId')
        }
      }
    }

    // Fix 4: Only checksum the address if namespace is eip155
    if (namespace === 'eip155') {
      try {
        const checksummedAddress = getAddress(address)
        if (address !== checksummedAddress) {
          address = checksummedAddress
          reasons.push('Address checksummed')
        }
      } catch {
        isValid = false
        reasons.push('Invalid Ethereum address')
      }
    }

    // Reconstruct the CAIP10 string with all attempted fixes
    fixedText = `${prefix}:${namespace}:${chainId}:${address}`

    return {
      isValidCAIP10: isValid,
      fixedText,
      reason: reasons.join(' and '),
    }
  } catch {
    return {
      isValidCAIP10: false,
      fixedText: text,
      reason: 'Invalid format',
    }
  }
}
