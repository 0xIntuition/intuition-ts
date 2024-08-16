import * as React from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import { Icon, IconName, IconNameType } from 'components/Icon'
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'

export const BannerVariant = {
  info: 'info',
  warning: 'warning',
  error: 'error',
}

const bannerVariants = cva(
  'flex w-full justify-between items-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r',
  {
    variants: {
      variant: {
        [BannerVariant.info]: 'from-accent/60 to-accent/10',
        [BannerVariant.warning]: 'from-warning/60 to-warning/10',
        [BannerVariant.error]: 'from-destructive/60 to-destructive/10',
      },
    },
    defaultVariants: {
      variant: BannerVariant.info,
    },
  },
)

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title: string
  message: string
}

const Banner = ({
  variant,
  title,
  message,
  className,
  children,
  ...props
}: BannerProps) => {
  let iconName: IconNameType = IconName.circleInfo

  if (variant === BannerVariant.warning) {
    iconName = IconName.triangleExclamation
  } else if (variant === BannerVariant.error) {
    iconName = IconName.circleX
  }

  return (
    <div className={cn('w-full theme-border rounded-lg', className)} {...props}>
      <div className={cn(bannerVariants({ variant }), 'p-3')}>
        <div className="flex gap-2 items-center">
          <Icon name={iconName} />
          <Text variant={TextVariant.bodyLarge}>{title}</Text>
        </div>
        {children}
      </div>
      <div className="p-4">
        <Text
          variant={TextVariant.body}
          className="text-secondary-foreground/70"
        >
          {message}
        </Text>
      </div>
    </div>
  )
}

export { Banner }
