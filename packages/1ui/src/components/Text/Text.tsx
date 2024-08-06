import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../styles'

export const TextVariant = {
  heading1: 'heading1',
  heading2: 'heading2',
  heading3: 'heading3',
  heading4: 'heading4',
  heading5: 'heading5',
  headline: 'headline',
  bodyLarge: 'bodyLarge',
  body: 'body',
  caption: 'caption',
  footnote: 'footnote',
  small: 'small',
}

export type TextVariantType = (typeof TextVariant)[keyof typeof TextVariant]

export const TextWeight = {
  normal: 'normal',
  medium: 'medium',
  semibold: 'semibold',
  bold: 'bold',
}

export type TextWeightType = (typeof TextWeight)[keyof typeof TextWeight]

const textVariants = cva('text-primary', {
  variants: {
    variant: {
      [TextVariant.heading1]: 'text-6xl',
      [TextVariant.heading2]: 'text-5xl',
      [TextVariant.heading3]: 'text-4xl',
      [TextVariant.heading4]: 'text-3xl',
      [TextVariant.heading5]: 'text-2xl',
      [TextVariant.headline]: 'text-xl',
      [TextVariant.bodyLarge]: 'text-lg',
      [TextVariant.body]: 'text-base',
      [TextVariant.caption]: 'text-sm',
      [TextVariant.footnote]: 'text-sm',
      [TextVariant.small]: 'text-xs',
    },
    weight: {
      [TextWeight.normal]: 'font-normal',
      [TextWeight.medium]: 'font-medium',
      [TextWeight.semibold]: 'font-semibold',
      [TextWeight.bold]: 'font-bold',
    },
  },
  defaultVariants: {
    variant: TextVariant.body,
    weight: TextWeight.normal,
  },
})

const textElement = (variant: number | string | undefined | null) => {
  switch (variant) {
    case TextVariant.heading1:
      return 'h1'
    case TextVariant.heading2:
      return 'h2'
    case TextVariant.heading3:
      return 'h3'
    case TextVariant.heading4:
      return 'h4'
    case TextVariant.heading5:
      return 'h5'
    case TextVariant.headline:
      return 'h6'
    default:
      return 'p'
  }
}

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, weight, ...props }, ref) => {
    const Comp = textElement(variant)
    return (
      <Comp
        className={cn(textVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Text.displayName = 'Text'

export { Text, textVariants }
