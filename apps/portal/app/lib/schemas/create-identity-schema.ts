import { z } from 'zod'

import { DESCRIPTION_MAX_LENGTH, MAX_UPLOAD_SIZE } from '../utils/constants'

const urlWithoutHttps = z
  .string()
  .refine((url) => !url.startsWith('https://'), {
    message: "You don't need to include the https://",
  })
  .transform((url) => (url.startsWith('https://') ? url.slice(8) : url))
  .refine(
    (url) => {
      const urlPattern =
        /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i
      return urlPattern.test(url)
    },
    {
      message: 'This link is an invalid URL.',
    },
  )

export function createIdentitySchema() {
  return z.object({
    display_name: z
      .string({ required_error: 'Please enter an identity name.' })
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
      .or(z.string())
      .optional(),
    external_reference: urlWithoutHttps.optional(),
    initial_deposit: z.string().optional(),
    vault_id: z.string().optional(),
    creator: z.string().optional(),
    contract: z.string().optional(),
    predicate: z.boolean().optional(),
  })
}

export function imageUrlSchema() {
  return z.object({
    image_url: z
      .instanceof(File)
      .refine((file) => {
        return file.size <= MAX_UPLOAD_SIZE
      }, 'File size must be less than 3MB')
      .refine((file) => {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
      }, 'File must be a .png, .jpg, .jpeg, or .gif')
      .or(z.string()),
  })
}
