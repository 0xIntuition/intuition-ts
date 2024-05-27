import * as React from 'react'

import { cn } from '@styles'
import { cva, type VariantProps } from 'class-variance-authority'

const textVariants = cva('text-primary', {
  variants: {
    variant: {
      heading1: 'text-6xl',
      heading2: 'text-5xl',
      heading3: 'text-4xl',
      heading4: 'text-3xl',
      heading5: 'text-2xl',
      headline: 'text-xl',
      bodyLarge: 'text-lg',
      body: 'text-base',
      caption: 'text-sm',
      footnote: 'text-sm',
      small: 'text-xs',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'normal',
  },
})

const textElement = (variant: string | undefined | null) => {
  switch (variant) {
    case 'heading1':
      return 'h1'
    case 'heading2':
      return 'h2'
    case 'heading3':
      return 'h3'
    case 'heading4':
      return 'h4'
    case 'heading5':
      return 'h5'
    case 'headline':
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
