import logger from '@lib/utils/logger'
import { generateQueryParams, getAuthHeaders } from '@lib/utils/misc'
import { IdentitySchema, type Identity } from '@types/identity'
import type { APIResponse, QueryParams } from '@types/query'
import type { User } from '@types/user'
import { z } from 'zod'
import { requireAuthedUser } from './auth'

const apiUrl = process.env.API_URL
if (!apiUrl) {
  throw new Error('API_URL is not defined')
}

export async function getIdentities(
  request: Request,
  params?: QueryParams,
): Promise<APIResponse<Identity[]>> {
  try {
    if (!apiUrl) {
      throw new Error('API_URL is not defined')
    }

    const { accessToken } = (await requireAuthedUser(request)) as User
    const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
    const queryParams = generateQueryParams(params)

    const res = await fetch(`${apiUrl}/identities?${queryParams}`, {
      method: 'GET',
      headers: headers,
    })

    if (!res.ok) {
      throw new Error(
        `Error getting identities: ${res.status} ${res.statusText}`,
      )
    }

    const { data, total } = await res.json()

    const validatedData = z.array(IdentitySchema).safeParse(data)
    if (!validatedData.success) {
      throw new Error(`Error validating identities: ${validatedData.error}`)
    }

    return { success: true, data: validatedData.data, total: total }
  } catch (error) {
    logger(
      `Error in getIdentities: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
