import { OpenAPI } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'

export async function setupAPI() {
  const apiUrl = process.env.API_URL

  const apiKey = process.env.API_KEY

  OpenAPI.BASE = apiUrl ?? ''

  const headers = getAuthHeaders(apiKey !== null ? apiKey : '')
  logger('headers', headers)
  OpenAPI.HEADERS = headers as Record<string, string>
}
