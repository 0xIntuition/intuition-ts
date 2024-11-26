import {
  defaultCAIP10Data,
  defaultCAIP10Descriptions,
  defaultCSVData,
  defaultCSVDescriptions,
  defaultCSVValues,
  defaultURIData,
  defaultURIDescriptions,
} from './default-data'

export interface AtomDataType {
  name: string
  defaultData: string[][]
  defaultDescriptions: Record<string, string>
  defaultValues?: Record<string, string>
}

export const atomDataTypes: Record<string, AtomDataType> = {
  CSV: {
    name: 'Schema.org <Thing>',
    defaultData: defaultCSVData,
    defaultDescriptions: defaultCSVDescriptions,
    defaultValues: defaultCSVValues,
  },
  CAIP10: {
    name: 'CAIP-10',
    defaultData: defaultCAIP10Data,
    defaultDescriptions: defaultCAIP10Descriptions,
  },
  URI: {
    name: 'Raw URI',
    defaultData: defaultURIData,
    defaultDescriptions: defaultURIDescriptions,
  },
}

export type AtomDataTypeKey = keyof typeof atomDataTypes

// Add this function to detect types from headers
export function detectAtomDataType(headers: string[]): AtomDataTypeKey {
  console.log(`Headers: ${headers}`)
  if (headers.length === 0) {
    console.log('No headers found, defaulting to CSV')
    return 'CSV'
  }

  // Check each atom data type's default data headers
  for (const [key, type] of Object.entries(atomDataTypes)) {
    // Get the headers from the default data
    const typeHeaders = type.defaultData[0]
    console.log(`Key: ${key}, Type: ${type}`)

    console.log(`headers: ${JSON.stringify(headers)}`)
    console.log(`typeHeaders: ${JSON.stringify(typeHeaders)}`)

    // If headers match exactly, return this type
    if (JSON.stringify(headers) === JSON.stringify(typeHeaders)) {
      console.log(`Detected type: ${key}`)
      return key as AtomDataTypeKey
    }
  }

  // Default to CSV if no exact match found
  console.log('No match found, defaulting to CSV')
  return 'CSV'
}
