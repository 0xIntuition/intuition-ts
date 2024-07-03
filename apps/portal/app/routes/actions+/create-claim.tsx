import { ApiError, ClaimsService, OpenAPI } from '@0xintuition/api'

import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function action({ request, context }: ActionFunctionArgs) {
  logger('Create claim action route')

  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    logger(`${key}: ${value}`)
  }

  // need to see updated, typesafe way to get the submission values
  // const submission = await parseWithZod(formData, {
  //   schema: createClaimSchema(),
  //   async: true,
  // })

  const subject_id = formData.get('subject_id')
  const predicate_id = formData.get('predicate_id')
  const object_id = formData.get('object_id')

  try {
    OpenAPI.BASE = 'https://dev.api.intuition.systems'
    const accessToken = getPrivyAccessToken(request)
    const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
    OpenAPI.HEADERS = headers as Record<string, string>

    const session = context.get(SessionContext)
    const user = session.get('user')

    if (!user?.details?.wallet?.address) {
      throw new Error('User wallet address is undefined')
    }

    let claim
    try {
      const claimParams: {
        contract: string
        subject: string
        predicate: string
        object: string
        creator: string
      } = {
        subject: subject_id as string,
        predicate: predicate_id as string,
        object: object_id as string,
        creator: user.details.wallet.address as string,
        contract: MULTIVAULT_CONTRACT_ADDRESS as string,
      }
      logger('[CREATE CLAIM ACTION] Claim params:', claimParams)
      claim = await ClaimsService.createClaim({
        requestBody: claimParams,
      })
      logger('[CREATE CLAIM ACTION] Claim created:')
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        claim = undefined
        logger(
          `${error.name} - ${error.status}: ${error.message} - ${JSON.stringify(error.body)}`,
        )
      } else {
        throw error
      }
    }
    if (!claim) {
      throw new Error('Failed to create claim.')
    }

    logger('claim', claim)
    return json(
      {
        status: 'success',
        claim,
      } as const,
      {
        status: 200,
      },
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in creating the offchain claim:', error)
      return json({ status: 'error', error: `An error occurred: ${error}` })
    }
  }
}
