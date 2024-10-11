export type QuestSet = {
  imgSrc: string
  title: string
  description: string
  summary: string
  navigatePath: string
}

export const MDXContentVariant = {
  LORE: 'lore',
  DEFAULT: 'default',
}

export type MDXContentVariantType =
  (typeof MDXContentVariant)[keyof typeof MDXContentVariant]
