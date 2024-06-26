export const Identity = {
  user: 'user',
  entity: 'entity',
} as const

export type IdentityType = (typeof Identity)[keyof typeof Identity]
