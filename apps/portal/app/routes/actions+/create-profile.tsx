import { ApiError, IdentitiesService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireUserWallet, setupAPI } from '@server/auth'
import { MULTIVAULT_CONTRACT_ADDRESS, NO_WALLET_ERROR } from 'consts'

export async function action({ request }: ActionFunctionArgs) {
  setupAPI(request)
  logger('Validating create identity form data')
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const formData = await request.formData()

  for (const [key, value] of formData.entries()) {
    logger(`${key}: ${value}`)
  }

  const display_name = formData.get('display_name')
  const identity_id = formData.get('identity_id')
  const description = formData.get('description')

  try {
    let identity
    try {
      const identityParams = {
        contract: MULTIVAULT_CONTRACT_ADDRESS as string,
        creator: wallet as string,
        display_name: display_name as string,
        identity_id: identity_id as string,
        description: description as string,
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
      throw new Error('Failed to create identity')
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
