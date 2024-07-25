import * as React from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  EmptyStateCard,
  Icon,
  IconName,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { formatBalance, truncateString } from '@lib/utils/misc'

import { IdentitySearchComboboxItem } from './identity-search-combo-box-item'

export interface IdentitySearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  identities: IdentityPresenter[]
  existingIdentityIds?: string[]
  placeholder?: string
  onIdentityClick?: (identity: IdentityPresenter) => void
  onIdentitySelect?: (identity: IdentityPresenter) => void
  onCreateIdentityClick?: () => void
  value?: string
  onValueChange?: (value: string) => void
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
  shouldFilter?: boolean
}

// TODO: [ENG-2670] - determine why there are more selected identities showing when overriding default search
// TODO: [ENG-2511] - determine what is causing mouse scrolling to be unavailable when overriding default search

const IdentitySearchCombobox = ({
  placeholder = 'Search for an identity...',
  onIdentityClick = () => {},
  onIdentitySelect = () => {},
  onCreateIdentityClick,
  identities,
  existingIdentityIds,
  onValueChange,
  onInput,
  value,
  shouldFilter,
  ...props
}: IdentitySearchComboboxProps) => {
  return (
    <div className="min-w-96" {...props}>
      <Command shouldFilter={shouldFilter}>
        <CommandInput
          placeholder={placeholder}
          value={value}
          onValueChange={onValueChange}
          onInput={onInput}
        />
        {onCreateIdentityClick && (
          <Button
            variant={ButtonVariant.text}
            size={ButtonSize.lg}
            className="gap-1.5 font-light justify-start p-3 theme-border border-0 border-b"
            onClick={onCreateIdentityClick}
          >
            <Icon name={IconName.plusLarge} className="h-4 w-4" />
            Create a new identity
          </Button>
        )}
        <CommandList>
          <CommandEmpty>
            <EmptyStateCard
              message="No identities found."
              className="border-none"
            />
          </CommandEmpty>
          <CommandGroup key={identities.length}>
            {identities.map((identity, index) => {
              const {
                display_name: name,
                user,
                image,
                assets_sum: value,
                creator_address: walletAddress,
                follower_count: socialCount,
                tag_count: tagCount,
                is_user: isUser,
                identity_id,
              } = identity
              const variant = isUser ? 'user' : 'non-user'
              const isDisabled = existingIdentityIds?.includes(identity_id)

              return (
                <IdentitySearchComboboxItem
                  key={index}
                  variant={variant}
                  name={truncateString(user?.display_name ?? name, 7)}
                  avatarSrc={user?.image ?? image ?? undefined}
                  value={+formatBalance(value)}
                  walletAddress={walletAddress}
                  socialCount={socialCount || 0}
                  tagCount={tagCount || 0}
                  onClick={() => onIdentityClick(identity)}
                  onSelect={() => onIdentitySelect(identity)}
                  disabled={isDisabled}
                />
              )
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export { IdentitySearchCombobox }
