import * as fs from 'fs'

export function insertIntoMapping(
  key: string,
  value: string,
  filePath: string,
): void {
  let mapping: Record<string, string> = {}

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      mapping = JSON.parse(fileContent) // Load the existing mapping
    } catch (error) {
      console.error(
        `Failed to read or parse the existing file: ${error.message}`,
      )
      return
    }
  }

  // Insert or update the mapping with the new key-value pair
  mapping[key] = value

  try {
    const jsonContent = JSON.stringify(mapping, null, 2) // Convert the mapping to a JSON string
    fs.writeFileSync(filePath, jsonContent, 'utf8') // Write the JSON string to the file
  } catch (error) {
    console.error(`Failed to save mapping to file: ${error.message}`)
  }
}

export function searchMapping(key: string, filePath: string): string | null {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    return null
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const mapping: Record<string, string> = JSON.parse(fileContent)

    if (key in mapping) {
      return mapping[key]
    }
    return null
  } catch (error) {
    console.error(`Failed to read or parse the file: ${error.message}`)
    return null
  }
}
