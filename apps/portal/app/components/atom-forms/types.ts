import { z } from 'zod'

export type Atom = {
  type: 'Thing' | 'Person' | 'Organization'
  name: string
  description?: string
  image?: string
  url?: string
}

export type DepositFormData = {
  amount: string
}

export const createDepositSchema = (minDeposit: number) =>
  z.object({
    amount: z
      .string()
      .min(1, 'Amount is required')
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Amount must be greater than 0',
      })
      .refine((val) => Number(val) >= minDeposit, {
        message: `Amount must be at least ${minDeposit} ETH`,
      }),
  })

export const thingAtomSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  url: z.string().optional(),
})

export const personAtomSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  url: z.string().optional(),
})

export const organizationAtomSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  url: z.string().optional(),
})
