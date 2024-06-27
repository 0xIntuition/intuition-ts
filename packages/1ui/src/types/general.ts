export const Subject = {
  identity: 'identity',
  entity: 'entity',
} as const

export type SubjectType = (typeof Subject)[keyof typeof Subject]
