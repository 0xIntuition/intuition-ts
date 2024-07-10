export const ClaimPositionRowVariant = {
  claim: 'claim',
  user: 'user',
} as const
export type ClaimPositionRowVariantType = keyof typeof ClaimPositionRowVariant
