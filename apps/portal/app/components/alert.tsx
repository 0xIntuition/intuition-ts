import { cn, Text } from '@0xintuition/1ui'

export enum AlertVariant {
  warning = 'warning',
  error = 'error',
  success = 'success',
  info = 'info',
}

interface AlertProps {
  children: React.ReactNode
  variant?: AlertVariant
  className?: string
}

export function Alert({
  children,
  variant = AlertVariant.info,
  className,
}: AlertProps) {
  const variantStyles = {
    [AlertVariant.warning]: 'bg-warning/10 border-warning/30 text-warning',
    [AlertVariant.error]:
      'bg-destructive/10 border-destructive/30 text-destructive',
    [AlertVariant.success]: 'bg-success/10 border-success/30 text-success',
    [AlertVariant.info]: 'bg-info/10 border-info/30 text-info',
  }

  return (
    <div
      className={cn('p-4 rounded-lg border', variantStyles[variant], className)}
    >
      <Text>{children}</Text>
    </div>
  )
}
