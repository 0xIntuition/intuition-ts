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
  Icon,
  IconName,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { formatBalance, truncateString } from '@lib/utils/misc'

import { IdentitySearchComboboxItem } from './identity-search-combo-box-item'

export interface IdentitySearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  identities: IdentityPresenter[]
  onIdentityClick?: (identity: IdentityPresenter) => void
  onCreateIdentityClick?: () => void
}

const IdentitySearchCombobox = ({
  onIdentityClick = () => {},
  onCreateIdentityClick,
  identities,
  ...props
}: IdentitySearchComboboxProps) => {
  return (
    <div className="min-w-96" {...props}>
      <Command>
        <CommandInput placeholder="Search for an identity..." />
        {onCreateIdentityClick && (
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
          <CommandGroup>
            {identities.map((identity, index) => {
              const {
                display_name: name,
                assets_sum: value,
                creator_address: walletAddress,
                follower_count: socialCount,
                tag_count: tagCount,
                is_user: isUser,
              } = identity
              const variant = isUser ? 'user' : 'non-user'

              return (
                <IdentitySearchComboboxItem
                  key={index}
                  variant={variant}
                  name={truncateString(name, 7)}
                  value={+formatBalance(value)}
                  walletAddress={walletAddress}
                  socialCount={socialCount || 0}
                  tagCount={tagCount || 0}
                  onClick={() => onIdentityClick(identity)}
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
