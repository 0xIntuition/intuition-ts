import { ApiError, ClaimsService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { requireUserWallet, setupAPI } from '@server/auth'
import { MULTIVAULT_CONTRACT_ADDRESS, NO_WALLET_ERROR } from 'app/consts'

export async function action({ request }: ActionFunctionArgs) {
  await setupAPI(request)
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

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
        creator: wallet as string,
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
