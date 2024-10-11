type CsvData = string[][];

interface DuplicateResult {
  hasDuplicates: boolean;
  duplicateIndices: number[];
}

interface RowProofreadResult {
  isDuplicate: boolean;
  // Add more row-level proofing results here
}

interface UnusualCharacterIssue {
  rowIndex: number;
  cellIndex: number;
  originalValue: string;
  suggestedValue: string;
  reason: string; // "Garbled Text", "Control Characters", or "Unicode Replacement Character"
}

interface UnusualCharacterResult {
  hasUnusualCharacters: boolean;
  cellIssues: UnusualCharacterIssue[];
}

interface CsvProofreadResult {
  duplicates: DuplicateResult;
  unusualCharacters: UnusualCharacterResult;
  // Add more CSV-level proofing results here
}

export function proofreadRow(
  row: string[],
  csvData: CsvData,
  rowIndex: number
): RowProofreadResult {
  return {
    isDuplicate: isRowDuplicate(row, csvData, rowIndex),
    // Add more row-level proofing checks here
  };
}

export function proofreadAll(csvData: CsvData): CsvProofreadResult {
  return {
    duplicates: checkForDuplicates(csvData),
    unusualCharacters: detectUnusualCharacters(csvData),
    // Add more CSV-level proofing checks here
  };
}

function checkForDuplicates(csvData: CsvData): DuplicateResult {
  const headerRow = csvData[0];
  const dataRows = csvData.slice(1);
  const seen = new Set<string>();
  const duplicateIndices: number[] = [];

  dataRows.forEach((row, index) => {
    const rowString = JSON.stringify(row);
    if (seen.has(rowString)) {
      duplicateIndices.push(index + 1); // +1 because we sliced off the header row
    } else {
      seen.add(rowString);
    }
  });

  return {
    hasDuplicates: duplicateIndices.length > 0,
    duplicateIndices,
  };
}

function isRowDuplicate(
  row: string[],
  csvData: CsvData,
  rowIndex: number
): boolean {
  const dataRows = csvData.slice(1);
  const rowString = JSON.stringify(row);

  return dataRows.some(
    (existingRow, index) =>
      index !== rowIndex - 1 && JSON.stringify(existingRow) === rowString
  );
}

export interface CellHighlight {
  rowIndex: number;
  cellIndex: number;
}

export function detectAllAdjacentDuplicates(
  data: string[][],
  sortedIndices: number[]
): CellHighlight[] {
  const highlights: CellHighlight[] = [];

  for (let cellIndex = 0; cellIndex < data[0].length; cellIndex++) {
    for (let i = 0; i < sortedIndices.length - 1; i++) {
      const currentRowIndex = sortedIndices[i];
      const nextRowIndex = sortedIndices[i + 1];
      if (data[currentRowIndex][cellIndex] === data[nextRowIndex][cellIndex]) {
        highlights.push({ rowIndex: i, cellIndex });
        highlights.push({ rowIndex: i + 1, cellIndex });
      }
    }
  }

  return highlights;
}

export function detectAdjacentDuplicatesForCell(
  data: string[][],
  sortedIndices: number[],
  rowIndex: number,
  cellIndex: number
): CellHighlight[] {
  const highlights: CellHighlight[] = [];
  const sortedRowIndex = sortedIndices.indexOf(rowIndex);

  if (sortedRowIndex > 0) {
    const prevRowIndex = sortedIndices[sortedRowIndex - 1];
    if (data[rowIndex][cellIndex] === data[prevRowIndex][cellIndex]) {
      highlights.push({ rowIndex: sortedRowIndex - 1, cellIndex });
      highlights.push({ rowIndex: sortedRowIndex, cellIndex });
    }
  }

  if (sortedRowIndex < sortedIndices.length - 1) {
    const nextRowIndex = sortedIndices[sortedRowIndex + 1];
    if (data[rowIndex][cellIndex] === data[nextRowIndex][cellIndex]) {
      highlights.push({ rowIndex: sortedRowIndex, cellIndex });
      highlights.push({ rowIndex: sortedRowIndex + 1, cellIndex });
    }
  }

  return highlights;
}

export function detectUnusualCharacters(
  csvData: CsvData
): UnusualCharacterResult {
  const cellIssues: UnusualCharacterIssue[] = [];

  for (let rowIndex = 0; rowIndex < csvData.length; rowIndex++) {
    const row = csvData[rowIndex];
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const cell = row[cellIndex];
      const fixResult = fixGarbledText(cell);
      if (fixResult.isGarbled) {
        cellIssues.push({
          rowIndex,
          cellIndex,
          originalValue: cell,
          suggestedValue: fixResult.fixedText,
          reason: fixResult.reason,
        });
      }
    }
  }

  return {
    hasUnusualCharacters: cellIssues.length > 0,
    cellIssues,
  };
}

function containsGarbledText(cell: string): boolean {
  // Regular expression for acceptable characters
  const acceptableChars = /[^\x20-\x7E\u00A0-\u00FF\u2010-\u206F]/;
  return acceptableChars.test(cell);
}

function fixGarbledText(cell: string): {
  isGarbled: boolean;
  fixedText: string;
  reason: string;
} {
  let fixedText = cell;
  let isGarbled = false;
  let reasons: string[] = [];

  // Check for control characters
  if (/[\x00-\x1F\x7F-\x9F]/.test(cell)) {
    isGarbled = true;
    reasons.push('Control Characters');
    fixedText = fixedText.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  }

  // Check for Unicode Replacement Character
  if (cell.includes('\uFFFD')) {
    isGarbled = true;
    reasons.push('Unicode Replacement Character');
    fixedText = fixedText.replace(/\uFFFD/g, '');
  }

  // Regular expression for acceptable characters
  const acceptableChars = /[^\x20-\x7E\u00A0-\u00FF\u2010-\u206F]/g;

  // Check for garbled text (characters outside acceptable ranges)
  if (acceptableChars.test(fixedText)) {
    isGarbled = true;
    reasons.push('Garbled Text');
    fixedText = fixedText.replace(acceptableChars, '');
  }

  const reason = reasons.join(', ');

  return { isGarbled, fixedText, reason };
}
