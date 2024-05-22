import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireAuthedUser } from '@server/auth'
import { type Identity } from '@types/identity'
import type { User } from '@types/user'

export async function action({ request }: ActionFunctionArgs) {
  logger('Validating create identity form data')

  logger('Request', request)

  const formData = await request.formData()

  for (const [key, value] of formData.entries()) {
    logger(`${key}: ${value}`)
  }

  const display_name = formData.get('display_name')
  const identity_id = formData.get('identity_id')
  const description = formData.get('description')

  try {
    const _data = await requireAuthedUser(request)
    const user = _data as User
    const { accessToken } = user

    const identityParams = {
      display_name: display_name as string,
      identity_id: identity_id as string,
      description: description as string,
      is_user: true,
      predicate: false,
      contract: MULTIVAULT_CONTRACT_ADDRESS as string,
      creator: user.wallet.toLowerCase(),
    }
    logger('Identity params:', identityParams)
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }

    logger('create headers', headers)
    const apiResponse = await fetch(`${process.env.API_URL}/identity`, {
      method: 'POST',
      headers,
      body: JSON.stringify(identityParams),
    })

    logger('create identity response', apiResponse)
    if (!apiResponse.ok) {
      throw new Error('Failed to create identity')
    }

    const responseBodyJson = await apiResponse.json()
    const identity = responseBodyJson as Identity
    logger('create identity response body', responseBodyJson)
    logger('Created identity:', identity)

    return json(
      {
        status: 'success',
        identity,
      } as const,
      {
        status: 200,
      },
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in creating the offchain identity:', error)
      return json(
        {
          status: 'error',
          error: `An error occurred: ${error}`,
        } as const,
        {
          status: 500,
        },
      )
    }
  }
}
