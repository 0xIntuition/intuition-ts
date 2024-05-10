import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@styles'

const textVariants = cva('text-primary', {
  variants: {
    variant: {
      heading1: 'text-[3.75rem]',
      heading2: 'text-[3.125rem]',
      heading3: 'text-[2.5rem]',
      heading4: 'text-[1.875rem]',
      heading5: 'text-[1.5rem]',
      headline: 'text-[1.25rem]',
      bodyLarge: 'text-[1rem]',
      body: 'text-[0.875rem]',
      caption: 'text-[0.75rem]',
      footnote: 'text-[0.75rem]',
      small: 'text-[0.625rem]',
    },
    weight: {
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'normal',
  },
})

const determineElement = (variant: string | undefined | null) => {
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
    const Comp = determineElement(variant)
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
