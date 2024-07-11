import * as React from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  IdentityInput,
  IdentitySearchCombobox,
  IdentitySearchComboboxItem,
  Separator,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag'
  identities: any[]
  onCreateIdentityClick?: () => void
}

const ExploreSearch = ({
  variant,
  identities,
  onCreateIdentityClick = undefined,
  children,
  ...props
}: ExploreSearchProps) => {
  return (
    <div className="min-w-96 flex flex-col items-center" {...props}>
      {/* User variant */}
      {variant === 'user' && (
        <IdentitySearchCombobox
          placeholder="Search by a username or address"
          onCreateIdentityClick={onCreateIdentityClick}
        >
          {identities.map((identity, index) => (
            <IdentitySearchComboboxItem
              key={index}
              variant={identity.variant}
              name={identity.name}
              value={identity.value}
              walletAddress={identity.walletAddress}
              socialCount={identity.socialCount}
              tagCount={identity.tagCount}
            />
          ))}
        </IdentitySearchCombobox>
      )}

      {/* Identity variant */}
      {variant === 'identity' && (
        <IdentitySearchCombobox
          placeholder="Search by Identity"
          onCreateIdentityClick={onCreateIdentityClick}
        >
          {identities.map((identity, index) => (
            <IdentitySearchComboboxItem
              key={index}
              variant={identity.variant}
              name={identity.name}
              value={identity.value}
              walletAddress={identity.walletAddress}
              socialCount={identity.socialCount}
              tagCount={identity.tagCount}
            />
          ))}
        </IdentitySearchCombobox>
        // TODO: Add tags here
      )}

      {/* Claim variant */}
      {variant === 'claim' && (
        <>
          <Text
            variant="bodyLarge"
            weight="regular"
            className="mb-2.5 text-secondary-foreground"
          >
            Select any combination of identities to find matching claims
          </Text>
          <Text
            variant="caption"
            weight="regular"
            className="mb-2.5 text-secondary-foreground"
          >
            Need help? Learn more about claims
          </Text>
          <Separator className="mb-7" />
          {/* TODO: Implement functionality */}
          <IdentityInput
            subject={{
              placeholder: 'Select an identity',
              selectedValue: {},
              onClick: () => {},
            }}
            predicate={{
              placeholder: 'Select an identity',
              selectedValue: {},
              onClick: () => {},
            }}
            object={{
              placeholder: 'Select an identity',
              selectedValue: {},
              onClick: () => {},
            }}
          />
        </>
      )}

      {/* Tag variant */}
      {variant === 'tag' && (
        <Command>
          <CommandInput placeholder="Search by list" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  )
}

export { ExploreSearch }
