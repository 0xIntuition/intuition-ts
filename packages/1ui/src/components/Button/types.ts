export enum ButtonVariant {
  Default = 'default',
  Destructive = 'destructive',
  Outline = 'outline',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Link = 'link',
  Tooltip = 'tooltip',
}

export enum ButtonSize {
  Default = 'default',
  Small = 'sm',
  Large = 'lg',
  Icon = 'icon',
}

export type ButtonVariants = ButtonVariant.Default | 'destructive'
