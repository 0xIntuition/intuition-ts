import { z } from 'zod'
import { EmbededUserAggregatesSchema } from './user'

export const IdentitySchema = z.object({
  id: z.string(),
  identity_id: z.string(),
  predicate: z.boolean(),
  is_user: z.boolean(),
  identity_hash: z.string(),
  display_name: z.string(),
  description: z.string(),
  image: z.string(),
  creator: EmbededUserAggregatesSchema,
  creator_id: z.string(),
  status: z.string(),
  created_at: z.string(),
  num_positions: z.number(),
  updated_at: z.string(),
  vault_id: z.string(),
  vault_uuid: z.string(),
  assets_sum: z.string(), // bigint
  conviction_sum: z.string(), // bigint
  conviction_price: z.string(), // bigint
  contract: z.string(),
  asset_delta: z.string().nullish(), // bigint
  user_asset_delta: z.string(), // bigint
  conviction_price_delta: z.string(), // bigint
  user_conviction: z.string().nullish(), // bigint
  user_assets: z.string(), // bigint
})
export type Identity = z.infer<typeof IdentitySchema>

export const IdentityAggregatesSchema = z.object({
  num_positions: z.number(),
  assets_sum: z.string(), // bigint
  conviction_sum: z.string(), // bigint
  conviction_price: z.string(), // bigint
  updated_at: z.string(),
})
export type IdentityAggregates = z.infer<typeof IdentityAggregatesSchema>

export const IdentitySortByKeys = [
  'identity_id',
  'display_name',
  'creator',
  'created_at',
  'num_positions',
  'assets_sum',
  'conviction_sum',
  'conviction_price',
  'updated_at',
] as const
export type IdentitySortByKeysType = (typeof IdentitySortByKeys)[number]

export const IdentitySortByFieldSchema = z.enum(IdentitySortByKeys)
export type IdentitySortByFieldType = z.infer<typeof IdentitySortByFieldSchema>

export const IdentitySortByDirectionSchema = z.enum(['ascending', 'descending'])
export type IdentitySortByDirectionType = z.infer<
  typeof IdentitySortByDirectionSchema
>

export const IdentityQueryConfigSchema = z.object({
  sort_method: z.boolean().optional(),
  sort_order: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
})
export type IdentityQueryConfig = z.infer<typeof IdentityQueryConfigSchema>

export const IdentityPositionSchema = z.object({
  id: z.string(),
  user: EmbededUserAggregatesSchema,
  creator_id: z.string(),
  direction: z.enum(['for', 'against']),
  vault_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  conviction: z.string(), // bigint
  share_price: z.string(), // bigint
  assets: z.string(), // bigint
  fee: z.string(), // bigint
  contract: z.string(),
  value: z.string(), // bigint
  user_asset_delta: z.string(), // bigint
  total: z.number(),
})

export type IdentityPosition = z.infer<typeof IdentityPositionSchema>

export const IdentityPositionSortByKeys = [
  'address',
  'updated_at',
  'assets',
  'conviction',
  'delta_assets',
] as const
export type IdentityPositionSortByKeysType =
  (typeof IdentityPositionSortByKeys)[number]

export const IdentityPositionSortByFieldSchema = z.enum(
  IdentityPositionSortByKeys,
)
export type IdentityPositionSortByFieldType = z.infer<
  typeof IdentityPositionSortByFieldSchema
>

export const IdentityPositionSortByDirectionSchema = z.enum([
  'ascending',
  'descending',
])
export type IdentityPositionSortByDirectionType = z.infer<
  typeof IdentityPositionSortByDirectionSchema
>

export const IdentityPositionQueryConfigSchema = z.object({
  sort_method: z.boolean().optional(),
  sort_order: z.boolean().optional(),
})
export type IdentityPositionQueryConfig = z.infer<
  typeof IdentityQueryConfigSchema
>

export const IdentityActivitySchema = z.object({
  event: z.enum(['deposit', 'redeem']),
  vault_id: z.string(),
  user: IdentitySchema,
  timestamp: z.string(), // unix timestamp
  assets: z.string(),
  conviction: z.string(),
  fee: z.string(), // bigint
  txHash: z.string(),
  block: z.string(),
})
export type IdentityActivity = z.infer<typeof IdentityActivitySchema>

export type IdentityCreateResponseType = Pick<
  Identity,
  'identity_id' | 'display_name' | 'description' | 'image' | 'created_at'
>
