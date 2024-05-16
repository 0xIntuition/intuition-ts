import { emitter } from '@server/emitter'
import { revalSchema } from '@lib/schemas/reval-schema'
import { parseWithZod } from '@conform-to/zod'

import { json, type ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: revalSchema() })

  if (!submission.payload) {
    return json(
      { status: 'error', message: 'Invalid form data', submission } as const,
      { status: 400 },
    )
  }

  const { eventName } = submission.payload

  if (typeof eventName === 'string' || typeof eventName === 'symbol') {
    emitter.emit(eventName)
  } else {
    throw new Error('eventName must be a string or symbol')
  }

  return null
}
