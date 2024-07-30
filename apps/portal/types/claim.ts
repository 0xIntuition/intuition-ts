export const ClaimElement = {
  Subject: 'subject',
  Predicate: 'predicate',
  Object: 'object',
} as const

export type ClaimElementType = (typeof ClaimElement)[keyof typeof ClaimElement]
