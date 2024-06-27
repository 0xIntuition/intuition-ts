export const ClaimPositionVariant = {
  claim: 'claim',
  user: 'user',
} as const
export type ClaimPositionVariantType = keyof typeof ClaimPositionVariant
