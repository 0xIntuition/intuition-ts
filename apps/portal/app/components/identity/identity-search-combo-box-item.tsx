import {
  Badge,
  BadgeVariant,
  CommandItem,
  Icon,
  IconName,
  IdentityCard,
  IdentityCardProps,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'

export interface IdentitySearchComboboxItemProps extends IdentityCardProps {
  socialCount?: number
  tagCount?: number
  onClick?: () => void
  onSelect?: () => void
  disabled?: boolean
}

const IdentitySearchComboboxItem = ({
  variant = 'user',
  avatarSrc,
  name,
  value,
  currency = 'ETH',
  walletAddress,
  // socialCount = 0,
  tagCount = 0,
  onClick,
  onSelect,
  disabled,
}: IdentitySearchComboboxItemProps) => {
  return (
    <CommandItem
      onClick={onClick}
      onSelect={onSelect}
      className="border border-transparent rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary hover:border-border/30 px-2 py-4 cursor-pointer"
      disabled={disabled}
    >
      <div className="flex justify-between items-center w-full">
        <IdentityCard
          variant={variant}
          avatarSrc={avatarSrc}
          name={name}
          value={value}
          currency={currency}
          walletAddress={walletAddress}
        />
        <div className="flex items-center gap-1">
          <TooltipProvider>
            {/* TODO: Uncomment when functionality is available */}
            {/* <Tooltip>
              <TooltipTrigger>
                <Badge variant={BadgeVariant.social}>
                  <Icon name={IconName.trustCircle} className="h-3 w-3" />
                  {socialCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                Members in this trust circle identity
              </TooltipContent>
            </Tooltip> */}
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={BadgeVariant.default}>
                  <Icon name={IconName.tag} className="h-3 w-3" />
                  {tagCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent align="end">
                Identities tagged with this identity
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </CommandItem>
  )
}

export { IdentitySearchComboboxItem }
