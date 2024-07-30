import { ApiError } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'consts'

export async function action({ request }: ActionFunctionArgs) {
  logger('Validating create identity form data')
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const formData = await request.formData()

  for (const [key, value] of formData.entries()) {
    logger(`${key}: ${value}`)
  }

  const invite_code = formData.get('invite_code')

  try {
    let identity
    try {
      const inviteCodeParams = {
        invite_code: invite_code as string,
      }
      logger('Invite code params:', inviteCodeParams)
      // identity = await InviteCodesService.redeemInviteCode({
      //   requestBody: inviteCodeParams,
      // })
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
