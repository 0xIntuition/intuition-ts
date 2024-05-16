import logger from '@lib/utils/logger'
import { generateQueryParams, getAuthHeaders, invariant } from '@lib/utils/misc'
import { IdentitySchema, type Identity } from '@types/identity'
import type { APIResponse, QueryParams } from '@types/query'
import type { User } from '@types/user'
import { z } from 'zod'
import { isAuthedUser, requireAuthedUser } from './auth'

const apiUrl = process.env.API_URL
if (!apiUrl) {
  throw new Error('API_URL is not defined')
}

export async function createIdentity(
  request: Request,
  params: {
    display_name: string
    image_url: string
    predicate: boolean
    description: string
    contract: string
  },
) {
  logger('CREATING MEME OFFCHAIN')
  const user = (await requireAuthedUser(request)) as User
  invariant(user, 'Authed user required')

  const { accessToken } = user

  const { display_name, image_url, description } = params
  invariant(display_name, 'Name is required')
  invariant(image_url, 'Image URL is required')
  invariant(description, 'Identity Data is required')

  logger('API BODY', {
    display_name: display_name as string,
    creator: user.wallet.toLowerCase() as string,
    description: description as string,
    image_url: image_url as string,
  })

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  // Actual API call

  const apiResponse = await fetch(`${apiUrl}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      display_name: display_name as string,
      description: description as string,
      image_url: image_url as string,
      creator: user.wallet.toLowerCase() as string,
    }),
  })
  logger('API RESPONSE: ', apiResponse)
  if (!apiResponse.ok) {
    const error = await apiResponse.json()
    logger('Failed to create identity. API ERROR: ', error)
    throw new Error(error.message)
  }

  const responseBodyJson = await apiResponse.json()
  const identity = responseBodyJson as Identity
  logger('API RESPONSE: ', identity)
  return { identity }
}

export async function getIdentity(
  id: string,
  request: Request,
): Promise<APIResponse<Identity>> {
  try {
    if (!apiUrl) {
      throw new Error('API_URL is not defined')
    }

    const user = (await isAuthedUser(request)) as User
    const headers = getAuthHeaders(user !== null ? user.accessToken : '')

    const res = await fetch(`${apiUrl}/identity/${id}`, {
      method: 'GET',
      headers: headers,
    })

    const { data } = await res.json()

    const validatedData = IdentitySchema.safeParse(data)
    if (!validatedData.success) {
      throw new Error(`Could not validate identity: ${validatedData.error}`)
    }

    return { success: true, data: validatedData.data }
  } catch (error) {
    logger(
      `Error in getIdentity: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
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
    logger('accessToken', accessToken)
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
