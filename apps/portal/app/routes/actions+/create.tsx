import { parseWithZod } from '@conform-to/zod'
import { createIdentitySchema } from '@lib/schemas/create-identity-schema'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireAuthedUser } from '@server/auth'
import { type Identity } from '@types/identity'
import type { User } from '@types/user'

export async function action({ request }: ActionFunctionArgs) {
  logger('Validating create identity form data')

  const formData = await request.formData()
  const submission = await parseWithZod(formData, {
    schema: createIdentitySchema(),
    async: true,
  })

  if (submission.status !== 'success') {
    return json(submission.reply(), {
      status: submission.status === 'error' ? 400 : 200,
    })
  }

  logger('Enter creating identity')
  const { display_name, description } = submission.value
  logger('Submission', submission.value)

  try {
    const _data = await requireAuthedUser(request)
    const user = _data as User
    const { accessToken } = user

    const identityParams = {
      display_name: display_name as string,
      description: description as string,
      predicate: false,
      contract: MULTIVAULT_CONTRACT_ADDRESS as string,
      creator: user.wallet.toLowerCase(),
    }
    logger('Identity params:', identityParams)
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }

    const apiResponse = await fetch(`${process.env.API_URL}/identity`, {
      method: 'POST',
      headers,
      body: JSON.stringify(identityParams),
    })

    if (!apiResponse.ok) {
      throw new Error('Failed to create identity')
    }

    const responseBodyJson = await apiResponse.json()
    const identity = responseBodyJson as Identity

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
