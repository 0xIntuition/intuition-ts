export interface CellHighlight {
  rowIndex: number;
  cellIndex: number;
}

export function detectAdjacentDuplicates(data: string[][]): CellHighlight[] {
  const highlights: CellHighlight[] = [];

  for (let cellIndex = 0; cellIndex < data[0].length; cellIndex++) {
    for (let rowIndex = 1; rowIndex < data.length - 1; rowIndex++) {
      if (data[rowIndex][cellIndex] === data[rowIndex + 1][cellIndex]) {
        highlights.push({ rowIndex, cellIndex });
        highlights.push({ rowIndex: rowIndex + 1, cellIndex });
      }
    }
  }

  return highlights;
}