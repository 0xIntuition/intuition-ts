import logger from '@lib/utils/logger'
import { json, type ActionFunction } from '@remix-run/node'
import { requireAuthedUser } from '@server/auth'
import { emitter } from '@server/emitter'
import { getIdentity } from '@server/identity'
import { type Identity } from '@types/identity'
import type { User } from '@types/user'

export const action: ActionFunction = async ({ request }) => {
  const user = (await requireAuthedUser(request)) as User

  const formData = await request.formData()
  const identity_id = formData.get('identity_id')

  let eventEmitted = false

  if (identity_id) {
    let identity
    let attempts = 0

    do {
      const response = await getIdentity(identity_id.toString(), request)
      identity = response.data as Identity
      if (identity?.status === 'complete') break
      await new Promise((resolve) => setTimeout(resolve, 5000))
      attempts++
    } while (attempts < 10)

    if (identity?.status !== 'complete') {
      logger('Identity status not complete after 5 attempts')
    }

    if (!eventEmitted) {
      emitter.emit('create-identity')
      eventEmitted = true
    }
    return json({ user, identity, success: true })
  }

  return json({ success: false }, { status: 400 })
}
