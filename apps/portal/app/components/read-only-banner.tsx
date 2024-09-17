import {
  BannerVariant,
  Button,
  ButtonVariant,
  cn,
  Icon,
  IconName,
  IconNameType,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'
import { cva, VariantProps } from 'class-variance-authority'

const DEFAULT_READ_ONLY_BANNER_TITLE =
  'This is a read only view.  To stake or interact, click the link below to view it in the app.'

const readOnlyBannerVariants = cva(
  'flex flex-col w-full justify-between rounded-lg border p-3 items-center gap-3',
  {
    variants: {
      variant: {
        [BannerVariant.info]: 'text-accent border-accent/40 bg-accent/10',
        [BannerVariant.warning]: 'text-warning border-warning/40 bg-warning/10',
        [BannerVariant.error]:
          'text-destructive border-destructive/40 bg-destructive/10',
      },
    },
    defaultVariants: {
      variant: BannerVariant.info,
    },
  },
)

export interface IReadOnlyBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof readOnlyBannerVariants> {
  title?: string
  to?: string
}
export default function ReadOnlyBanner({
  variant,
  title = DEFAULT_READ_ONLY_BANNER_TITLE,
  to,
  children,
  className,
  ...props
}: IReadOnlyBannerProps) {
  let iconName: IconNameType = IconName.circleInfo
  let buttonVariant = ButtonVariant.accent

  if (variant === BannerVariant.warning) {
    iconName = IconName.triangleExclamation
    buttonVariant = ButtonVariant.warning
  } else if (variant === BannerVariant.error) {
    iconName = IconName.circleX
    buttonVariant = ButtonVariant.destructive
  }
  return (
    <div
      className={cn(readOnlyBannerVariants({ variant }), 'p-3', className)}
      {...props}
    >
      <div className="flex gap-2 items-center">
        <Icon name={iconName} className="w-5 h-5 shrink-0" />
        <Text variant={TextVariant.body} className="text-inherit">
          {title}
        </Text>
      </div>
      {children}
      {to && (
        <Link to={to} className="w-full">
          <Button variant={buttonVariant} className="w-full">
            View in App
            <Icon name={IconName.squareArrowTopRight} className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}
