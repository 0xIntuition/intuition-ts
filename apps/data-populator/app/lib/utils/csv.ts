import { Thing, WithContext } from 'schema-dts';

export async function parseCsv(content: File): Promise<string[][]> {
  const text = await fileToText(content);
  const things = parseCsvToThings(text);
  const rows = thingsToStringArrays(things);
  // console.log(rows);
  return rows;
}

function fileToText(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function parseCsvToThings(text: string): Thing[] {
  const rows = parseCsvText(text);
  // Assuming each row corresponds to a Thing with properties matching the CSV headers
  const headers = rows[0];
  const things: Thing[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const thing: WithContext<Thing> = {
      '@context': 'https://schema.org',
      '@type': 'Thing'
    };
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j];
      const value = row[j];
      (thing as any)[key] = value;
    }
    things.push(thing);
  }
  return things;
}

function thingsToStringArrays(things: Thing[]): string[][] {
  const rows: string[][] = [];
  if (things.length === 0) return rows;

  const headers = Object.keys(things[0]);
  rows.push(headers);

  for (const thing of things) {
    const row = headers.map(header => thing[header] as string || '');
    rows.push(row);
  }
  return rows;
}

function parseCsvText(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          currentCell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        currentRow.push(currentCell);
        currentCell = '';
      } else if (c === '\r') {
        // Ignore \r
      } else if (c === '\n') {
        currentRow.push(currentCell);
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += c;
      }
    }
    i++;
  }

  if (inQuotes) {
    throw new Error('Invalid CSV format: unmatched quotes');
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows;
}

export function generateCsvContent(data: string[][]): string {
  return data
    .map((row) =>
      row
        .map((cell) => {
          if (cell == null) {
            return '';
          }
          const cellString = String(cell);
          // Check if the cell contains special characters
          if (
            cellString.includes(',') ||
            cellString.includes('"') ||
            cellString.includes('\n')
          ) {
            // Escape double quotes by doubling them
            const escapedCell = cellString.replace(/"/g, '""');
            // Wrap the cell in double quotes
            return `"${escapedCell}"`;
          } else {
            return cellString;
          }
        })
        .join(',')
    )
    .join('\n');
}

export function jsonToTable(jsonString: string): string[][] {
  // Parse the JSON string into an array of objects
  const dataArray: Array<{ [key: string]: any }> = JSON.parse(jsonString);

  // Check if the data is an array and not empty
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return [];
  }

  // Collect all unique headers from all objects
  const headersSet = new Set<string>();
  dataArray.forEach((item) => {
    Object.keys(item).forEach((key) => {
      headersSet.add(key);
    });
  });
  const headers = Array.from(headersSet);

  // Initialize the table with headers
  const table: string[][] = [headers];

  // Iterate over each object and extract values in the order of headers
  dataArray.forEach((item) => {
    const row = headers.map((header) =>
      item.hasOwnProperty(header) ? String(item[header]) : ''
    );
    table.push(row);
  });

  return table;
}