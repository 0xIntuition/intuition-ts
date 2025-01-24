import { parseEther } from 'viem'
import { z } from 'zod'

// Person atom schema
export const personAtomSchema = z.object({
  type: z.literal('Person'),
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
})

// Thing atom schema
export const thingAtomSchema = z.object({
  type: z.literal('Thing'),
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
})

// Organization atom schema
export const organizationAtomSchema = z.object({
  type: z.literal('Organization'),
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
})

// Union of all atom schemas
export const atomSchema = z.discriminatedUnion('type', [
  personAtomSchema,
  thingAtomSchema,
  organizationAtomSchema,
])

// types inferred from schemas
export type PersonAtom = z.infer<typeof personAtomSchema>
export type ThingAtom = z.infer<typeof thingAtomSchema>
export type OrganizationAtom = z.infer<typeof organizationAtomSchema>
export type Atom = z.infer<typeof atomSchema>

export const createDepositSchema = (minDeposit: string) =>
  z.object({
    amount: z
      .string()
      .min(1, 'Amount is required')
      .superRefine(async (val, ctx) => {
        try {
          const amount = parseEther(val)
          const min = parseEther(minDeposit)

          if (amount < min) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Minimum deposit is ${minDeposit} ETH`,
            })
            return false
          }

          // TODO: Figure out why validation isn't working in this block
          // if (balance && amount > balance) {
          //   ctx.addIssue({
          //     code: z.ZodIssueCode.custom,
          //     message: `Insufficient balance`,
          //   })
          //   return false
          // }

          return true
        } catch (e) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid amount',
          })
          return false
        }
      }),
  })

export type DepositFormData = z.infer<ReturnType<typeof createDepositSchema>>
