import { IdentityPresenter, OpenAPI } from '@0xintuition/api'

import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function action({ request, context }: ActionFunctionArgs) {
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
    OpenAPI.BASE = 'https://dev.api.intuition.systems'
    const accessToken = getPrivyAccessToken(request)
    const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
    OpenAPI.HEADERS = headers as Record<string, string>

    const session = context.get(SessionContext)
    console.log('[LOADER] user', session.get('user'))
    const user = session.get('user')

    const identityParams = {
      display_name: display_name as string,
      identity_id: identity_id as string,
      description: description as string,
      is_user: true,
      predicate: false,
      contract: MULTIVAULT_CONTRACT_ADDRESS as string,
      creator: user?.details?.wallet?.address.toLowerCase(),
    }
    logger('Identity params:', identityParams)
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
    const identity = responseBodyJson as IdentityPresenter
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
