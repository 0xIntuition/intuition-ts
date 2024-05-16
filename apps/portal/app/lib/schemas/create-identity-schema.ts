import { z } from 'zod'
import { DESCRIPTION_MAX_LENGTH } from '../utils/constants'

export function createIdentitySchema() {
  return z.object({
    display_name: z
      .string({ required_error: 'Please enter a meme name.' })
      .min(2, {
        message: 'Meme name must be at least 2 characters.',
      })
      .max(30, {
        message: 'Meme name must not be longer than 30 characters.',
      }),
    description: z
      .string({
        required_error: 'Please enter a description.',
      })
      .min(2, {
        message: 'Description must be at least 2 characters.',
      })
      .max(DESCRIPTION_MAX_LENGTH, {
        message: 'Description must not be longer than 30 characters.',
      })
      .optional(),
    vault_id: z.string().optional(),
    creator: z.string().optional(),
    contract: z.string().optional(),
    predicate: z.boolean().optional(),
  })
}
