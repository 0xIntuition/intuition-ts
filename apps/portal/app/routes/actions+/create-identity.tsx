import { ApiError, IdentitiesService, OpenAPI } from '@0xintuition/api'

import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { getPrivyAccessToken } from '@server/privy'

export async function action({ request }: ActionFunctionArgs) {
  const wallet = await requireUserWallet(request)

  const formData = await request.formData()

  for (const [key, value] of formData.entries()) {
    logger(`${key}: ${value}`)
  }

  const display_name = formData.get('display_name')
  const image_url = formData.get('image_url')
  const description = formData.get('description')
  const external_reference = formData.get('external_reference')

  try {
    OpenAPI.BASE = 'https://dev.api.intuition.systems'
    const accessToken = getPrivyAccessToken(request)
    const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
    logger('create headers', headers)
    OpenAPI.HEADERS = headers as Record<string, string>

    if (!wallet) {
      throw new Error('User wallet address is undefined')
    }

    let identity
    try {
      const identityParams: {
        contract: string
        creator: string
        display_name: string
        external_reference: string
        description: string
        image?: string
      } = {
        contract: MULTIVAULT_CONTRACT_ADDRESS as string,
        creator: wallet as string,
        display_name: display_name as string,
        external_reference: external_reference as string,
        description: description as string,
      }
      if (image_url) {
        identityParams.image = image_url as string
      }
      logger('Identity params:', identityParams)
      identity = await IdentitiesService.createIdentity({
        requestBody: identityParams,
      })
      logger('Identity created:', identity)
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        identity = undefined
        console.log(
          `${error.name} - ${error.status}: ${error.message} - ${JSON.stringify(error.body)}`,
        )
      } else {
        throw error
      }
    }

    if (!identity) {
      throw new Error('Failed to create identity.')
    }
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
