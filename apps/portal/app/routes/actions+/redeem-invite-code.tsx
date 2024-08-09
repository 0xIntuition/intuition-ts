import { ApiError, InviteCodesService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export async function action({ request }: ActionFunctionArgs) {
  logger('Validating redeem invite code form data')
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const formData = await request.formData()

  for (const [key, value] of formData.entries()) {
    logger(`${key}: ${value}`)
  }

  const invite_code = formData.get('invite_code')

  try {
    let invite_code_response
    try {
      invite_code_response = await InviteCodesService.redeemInviteCode({
        requestBody: {
          invite_code: invite_code as string,
          wallet,
        },
      })
      logger('Invite code redeemed:', invite_code_response)
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        invite_code_response = undefined
        console.log(
          `${error.name} - ${error.status}: ${error.message} - ${(error.body as { code: number; error: string }).error}`,
        )
        return json(
          {
            status: 'error',
            error: (error.body as { code: number; error: string }).error,
          },
          { status: error.status },
        )
      }
      throw error
    }

    return json(
      {
        status: 'success',
      } as const,
      {
        status: 200,
      },
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in redeeming invite code:', error)
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
