export function getAuthHeaders(apiKey?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (apiKey) {
    headers['x-api-key'] = apiKey
  }

  return headers
}
