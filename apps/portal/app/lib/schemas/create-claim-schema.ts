import { z } from 'zod'

export function createClaimSchema() {
  return z.object({
    subject_id: z.string({
      required_error: 'Please select a subject.',
    }),
    predicate_id: z.string({
      required_error: 'Please select a predicate.',
    }),
    object_id: z.string({
      required_error: 'Please select an object.',
    }),
    creator: z.string().optional(),
  })
}
