import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { json, type ActionFunction } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { emitter } from '@server/emitter'

export const action: ActionFunction = async ({ request }) => {
  const wallet = await requireUserWallet(request)

  const formData = await request.formData()
  const identity_id = formData.get('identity_id')

  let eventEmitted = false

  if (identity_id) {
    let identity
    let attempts = 0

    do {
      try {
        const response = await IdentitiesService.getIdentityById({
          id: identity_id.toString(),
        })
        identity = response as IdentityPresenter
        await new Promise((resolve) => setTimeout(resolve, 5000))
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          console.log('Record not found, retrying...')
        } else {
          throw error
        }
      }
      if (identity?.status === 'complete') {
        break
      }
      attempts++
    } while (attempts < 10)

    if (identity?.status !== 'complete') {
      logger('Identity status not complete after 10 attempts')
    }

    if (!eventEmitted) {
      emitter.emit('create-identity')
      eventEmitted = true
    }
    return json({ wallet, identity, success: true })
  }

  return json({ success: false }, { status: 400 })
}
