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
<<<<<<< HEAD:apps/portal/app/components/identity/identity-search-combo-box-item.tsx
} from '@0xintuition/1ui'
=======
} from '..'

export interface IdentitySearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onCreateIdentityClick?: () => void
  value?: string
  onValueChange?: (value: string) => void
}

const IdentitySearchCombobox = ({
  onCreateIdentityClick = undefined,
  children,
  onValueChange,
  value,
  ...props
}: IdentitySearchComboboxProps) => {
  return (
    <div className="min-w-96" {...props}>
      <pre>search value: {value}</pre>
      <Command>
        <CommandInput
          placeholder="Search for an identity..."
          value={value}
          onValueChange={onValueChange}
        />
        {onCreateIdentityClick !== undefined && (
          <Button
            variant={ButtonVariant.text}
            size={ButtonSize.lg}
            className="gap-1.5 font-light justify-start p-3 border-border/30 border-0 border-b"
            onClick={onCreateIdentityClick}
          >
            <Icon name={IconName.plusLarge} className="h-4 w-4" />
            Create a new identity
          </Button>
        )}
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>{children}</CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
>>>>>>> f26ada00 (Connects the parent search input state to the cmdk):packages/1ui/src/components/IdentitySearchCombobox/IdentitySearchCombobox.tsx

export interface IdentitySearchComboboxItemProps extends IdentityCardProps {
  socialCount?: number
  tagCount?: number
  onClick?: () => void
  onSelect?: () => void
}

const IdentitySearchComboboxItem = ({
  variant = 'user',
  avatarSrc,
  name,
  value,
  currency = 'ETH',
  walletAddress,
  socialCount = 0,
  tagCount = 0,
  onClick,
  onSelect,
}: IdentitySearchComboboxItemProps) => {
  return (
    <CommandItem
      onClick={onClick}
      onSelect={onSelect}
      className="border border-transparent rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary hover:border-border/30 px-2 py-4"
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
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={BadgeVariant.social}>
                  <Icon name={IconName.trustCircle} className="h-3 w-3" />
                  {socialCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                Members in this trust circle identity
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={BadgeVariant.default}>
                  <Icon name={IconName.tag} className="h-3 w-3" />
                  {tagCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
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
