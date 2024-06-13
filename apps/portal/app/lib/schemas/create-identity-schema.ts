import { z } from 'zod'

import { DESCRIPTION_MAX_LENGTH, MAX_UPLOAD_SIZE } from '../utils/constants'

export function createIdentitySchema() {
  return z.object({
    display_name: z
      .string({ required_error: 'Please enter a identity name.' })
      .min(2, {
        message: 'Identity name must be at least 2 characters.',
      })
      .max(30, {
        message: 'Identity name must not be longer than 30 characters.',
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
    image_url: z
      .instanceof(File)
      .refine((file) => {
        return file.size <= MAX_UPLOAD_SIZE
      }, 'File size must be less than 3MB')
      .refine((file) => {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
      }, 'File must be a .png, .jpg, .jpeg, or .gif')
      .or(z.string()),
    vault_id: z.string().optional(),
    creator: z.string().optional(),
    contract: z.string().optional(),
    predicate: z.boolean().optional(),
  })
}
