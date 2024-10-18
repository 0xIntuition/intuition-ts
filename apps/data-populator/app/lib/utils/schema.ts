/* eslint-disable @typescript-eslint/no-explicit-any */

import { Thing, WithContext } from 'schema-dts'

export function convertCsvToSchemaObjects<T extends Thing>(
  csvData: string[][],
): WithContext<T>[] {
  const [headers, ...rows] = csvData

  return rows.map((row) => {
    const obj: WithContext<T> = {
      '@context': 'https://schema.org',
    } as WithContext<T>

    headers.forEach((header, index) => {
      // Set the property regardless of whether row[index] has a value
      // We must use the type unambiguously to properly hash its metadata
      /* eslint-disable-next-line no-extra-semi */
      ;(obj as any)[header] = row[index]
    })

    return obj
  })
}
