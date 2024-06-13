import { ApiError, OpenAPI, UsersService } from '@0xintuition/api'

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

  const id = formData.get('id')
  const display_name = formData.get('display_name')
  const image_url = formData.get('image_url')
  const description = formData.get('description')

  try {
    OpenAPI.BASE = 'https://dev.api.intuition.systems'
    const accessToken = getPrivyAccessToken(request)
    const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
    logger('create headers', headers)
    OpenAPI.HEADERS = headers as Record<string, string>

    const session = context.get(SessionContext)
    console.log('[LOADER] user', session.get('user'))
    const user = session.get('user')

    if (!user?.details?.wallet?.address) {
      throw new Error('User wallet address is undefined')
    }

    let profile
    try {
      const profileParams = {
        id: id as string,
        privy_id: user.details.id as string,
        display_name: display_name as string,
        image: image_url as string,
        description: description as string,
      }
      logger('Profile params:', profileParams)
      profile = await UsersService.updateUser({
        id: id as string,
        requestBody: {
          privy_id: user.details.id as string,
          display_name: display_name as string,
          image: image_url as string,
          description: description as string,
        },
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
      } as const,
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
        } as const,
        {
          status: 500,
        },
      )
    }
  }
}
