import logger from '@lib/utils/logger'
import { generateQueryParams, getAuthHeaders } from '@lib/utils/misc'
import { type Identity } from '@types/identity'
import type { APIResponse, QueryParams } from '@types/query'
import type { User } from '../types/user'
import { requireAuthedUser } from './auth'

const apiUrl = process.env.API_URL
if (!apiUrl) {
  throw new Error('API_URL is not defined')
}

export async function getActivity(
  request: Request,
  params?: QueryParams,
): Promise<APIResponse<Identity[]>> {
  try {
    if (!apiUrl) {
      throw new Error('API_URL is not defined')
    }

    logger('get identities')

    const { accessToken } = (await requireAuthedUser(request)) as User

    logger('access Token', accessToken)

    const headers = getAuthHeaders(accessToken !== null ? accessToken : '')

    logger('headers', headers)
    const queryParams = generateQueryParams(params)

    const res = await fetch(`${apiUrl}/activities?${queryParams}`, {
      method: 'GET',
      headers: headers,
    })

    logger('get identities response', res)
    if (!res.ok) {
      throw new Error(
        `Error getting identities: ${res.status} ${res.statusText}`,
      )
    }

    const { data, total } = await res.json()

    // const validatedData = z.array(IdentitySchema).safeParse(data)
    // if (!validatedData.success) {
    //   throw new Error(`Error validating identities: ${validatedData.error}`)
    // }

    return { success: true, data: data, total: total }
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
