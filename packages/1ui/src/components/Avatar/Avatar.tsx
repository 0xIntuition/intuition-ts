import * as React from 'react'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'

import { Icon, IconName } from '..'
import { cn } from '../../styles'

const AvatarContainer = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
))
AvatarContainer.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square object-cover h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'bg-muted flex h-full w-full items-center justify-center',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const avatarVariants = cva('aspect-square bg-background border-border/10', {
  variants: {
    variant: {
      [Identity.user]: 'rounded-full',
      [Identity.nonUser]: 'rounded',
    },
  },
  defaultVariants: {
    variant: Identity.user,
  },
})

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  name: string
}

const Avatar = ({ className, variant, src, name, onClick }: AvatarProps) => {
  return (
    <AvatarContainer
      className={cn(avatarVariants({ variant }), className)}
      onClick={onClick}
    >
      <AvatarImage src={src} alt={`${name} avatar`} />
      <AvatarFallback className="bg-inherit">
        <Icon
          name={
            variant === Identity.nonUser
              ? IconName.fingerprint
              : IconName.cryptoPunk
          }
          className="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
        />
      </AvatarFallback>
    </AvatarContainer>
  )
}

export { Avatar, AvatarContainer, AvatarImage, AvatarFallback }
