import { z } from 'zod'

export type User = {
  didSession: string
  wallet: string
  id: string
  ensName?: string
  // newUser: boolean
  accessToken: string
}

export const UserProfileSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  total_identities: z.string(),
  total_claims: z.string(),
  total_positions: z.string(),
  total_position_value: z.string(),
  total_delta: z.string(),
  total_entry_fees: z.string(),
  total_exit_fees: z.string(),
  total_protocol_fee_paid: z.string(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

export const UserAggregatesSchema = z.object({
  num_identities_created: z.number(),
  num_claims_created: z.number(),
  num_claims_about: z.number(),
  last_active: z.string(),
  total_claims_value_accrual: z.number(),
  total_identities_value_accrual: z.number(),
  num_positions_for: z.number(),
  num_positions_against: z.number(),
  total_value_positions_for: z.number(),
  total_value_positions_against: z.number(),
})

export type UserAggregates = z.infer<typeof UserAggregatesSchema>

export const EmbededUserAggregatesSchema = z.object({
  id: z.string().optional(),
  wallet: z.string().optional(),
  ens_name: z.string().optional(),
  total: z.number().optional(),
})

export type EmbededUserAggregates = z.infer<typeof EmbededUserAggregatesSchema>

export const UserIdResponseSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  total: z.string(),
})

export type UserIdResponse = z.infer<typeof UserIdResponseSchema>
