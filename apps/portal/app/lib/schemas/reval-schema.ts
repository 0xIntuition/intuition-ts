import { z } from 'zod'

export function revalSchema() {
  return z.object({
    eventName: z.string(),
  })
}
