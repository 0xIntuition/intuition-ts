import {
  DESCRIPTION_MAX_LENGTH,
  MAX_NAME_LENGTH,
  MAX_UPLOAD_SIZE,
} from 'app/consts'
import { z } from 'zod'

const urlSchema = z
  .string()
  .refine(
    (url) => {
      // Check if the URL contains ://
      if (!url.includes('://')) {
        return false
      }

      // Split the URL into protocol and the rest
      const [protocol, rest] = url.split('://')

      // Check if the protocol is not empty and contains only valid characters
      if (!/^[a-z0-9]+$/i.test(protocol)) {
        return false
      }

      // Check if the rest of the URL is not empty and contains at least one dot
      if (!rest || !rest.includes('.')) {
        return false
      }

      return true
    },
    {
      message:
        'Please enter a valid URL (e.g., https://example.com, ipfs://Qm...)',
    },
  )
  .transform((url) => url.toLowerCase())

export function createIdentitySchema() {
  return z.object({
    display_name: z
      .string({ required_error: 'Please enter an identity name.' })
      .max(MAX_NAME_LENGTH, {
        message: 'Identity name must not be longer than 100 characters.',
      }),
    description: z
      .string({
        required_error: 'Please enter a description.',
      })
      .min(2, {
        message: 'Description must be at least 2 characters.',
      })
      .max(DESCRIPTION_MAX_LENGTH, {
        message: 'Description must not be longer than 512 characters.',
      })
      .optional(),
    image_url: z
      .instanceof(File)
      .refine((file) => {
        return file.size <= MAX_UPLOAD_SIZE
      }, 'File size must be less than 5MB')
      .refine((file) => {
        return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type,
        )
      }, 'File must be a .png, .jpg, .jpeg, .gif, or .webp')
      .or(z.string())
      .optional(),
    external_reference: urlSchema.optional(),
    initial_deposit: z.string().optional(),
    vault_id: z.string().optional(),
    creator: z.string().optional(),
    contract: z.string().optional(),
    predicate: z.boolean().optional(),
    is_contract: z.boolean().optional(),
  })
}

export function imageUrlSchema() {
  return z.object({
    image_url: z
      .instanceof(File)
      .refine((file) => {
        return file.size <= MAX_UPLOAD_SIZE
      }, 'File size must be less than 5MB')
      .refine((file) => {
        return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type,
        )
      }, 'File must be a .png, .jpg, .jpeg, .gif, or .webp')
      .or(z.string()),
  })
}

export function inviteCodeSchema() {
  return z.object({
    invite_code: z
      .string({ required_error: 'Please enter an invite code.' })
      .min(6, {
        message: 'Invite codes are 6 characters.',
      }),
  })
}
