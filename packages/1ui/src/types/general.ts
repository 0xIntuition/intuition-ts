export const Identity = {
  user: 'user',
  nonUser: 'non-user',
} as const

export type IdentityType = (typeof Identity)[keyof typeof Identity]
