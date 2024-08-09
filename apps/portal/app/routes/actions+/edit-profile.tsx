import { ApiError, UserPresenter, UsersService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireUser, requireUserWallet, setupAPI } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export type EditProfileActionData = {
  status: 'success' | 'error'
  profile?: UserPresenter
  error?: string
}

export async function action({ request }: ActionFunctionArgs) {
  setupAPI(request)
  logger('Validating create identity form data')

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')

  const formData = await request.formData()

  for (const [key, value] of formData.entries()) {
    logger(`${key}: ${value}`)
  }

  const id = formData.get('id')
  const display_name = formData.get('display_name')
  const image_url = formData.get('image_url')
  const description = formData.get('description')

  try {
    let profile
    try {
      const requestBody: {
        privy_id: string
        display_name: string
        description: string
        image?: string
      } = {
        privy_id: user.id as string,
        display_name: display_name as string,
        description: description as string,
        image: image_url as string,
      }

      logger('requestBody:', requestBody)

      profile = await UsersService.updateUser({
        id: id as string,
        requestBody,
      })
      logger('Profile updated:', profile)
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        profile = undefined
        console.log(
          `${error.name} - ${error.status}: ${error.message} - ${JSON.stringify(error.body)}`,
        )
      } else {
        throw error
      }
    }

    if (!profile) {
      throw new Error('Failed to update profile')
    }
    return json(
      {
        status: 'success',
        profile,
      } as EditProfileActionData,
      {
        status: 200,
      },
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating profile:', error)
      return json(
        {
          status: 'error',
          error: `An error occurred: ${error}`,
        } as EditProfileActionData,
        {
          status: 500,
        },
      )
    }
  }
}
