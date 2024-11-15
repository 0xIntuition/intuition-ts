export const defaultCSVData = [
  ['@context', '@type', 'name', 'description', 'image', 'url'], // header row
  ['https://schema.org', 'Thing', '', '', '', ''], // empty data row
]

// Add fields here as desired
export const defaultCSVDescriptions: Record<string, string> = {
  name: 'Name of the atom',
  description: 'Description of the atom',
  image: "URL for the atom's image",
  url: 'URL for the website associated with the atom',
}

export const defaultCSVValues: Record<string, string> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
}
