import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { json, type ActionFunction } from '@remix-run/node'
import { requireUserWallet, setupAPI } from '@server/auth'
import { emitter } from '@server/emitter'

const RETRY_LIMIT = 10
const RETRY_DELAY = 5000

async function fetchIdentityWithRetry(
  identity_id: string,
): Promise<IdentityPresenter | null> {
  let attempts = 0
  let identity = null

  while (attempts < RETRY_LIMIT) {
    try {
      const response = await IdentitiesService.getIdentityById({
        id: identity_id,
      })
      identity = response as IdentityPresenter
      logger('Checking identity status', identity.status)
      if (identity.status === 'complete') {
        return identity
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        logger('Record not found, retrying...')
      } else {
        throw error
      }
    }
    attempts++
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
  }

  return identity
}

export const action: ActionFunction = async ({ request }) => {
  await setupAPI(request)
  const wallet = await requireUserWallet(request)

  const formData = await request.formData()
  const identity_id = String(formData.get('identity_id'))

  if (identity_id) {
    const identity = await fetchIdentityWithRetry(identity_id)

    if (identity?.status !== 'complete') {
      logger('Identity status not complete after 10 attempts')
      return json({ success: false }, { status: 400 })
    }

    emitter.emit('create-identity')
    return json({ wallet, identity, success: true })
  }

  return json({ success: false }, { status: 400 })
}
