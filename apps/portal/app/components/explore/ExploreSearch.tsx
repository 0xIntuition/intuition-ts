import * as React from 'react'

import { IdentityInput, Separator, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag'
  identities: IdentityPresenter[]
  onCreateIdentityClick?: () => void
}

const ExploreSearch = ({
  variant,
  identities,
  onCreateIdentityClick = undefined,
  ...props
}: ExploreSearchProps) => {
  return (
    <div className="min-w-96 flex flex-col items-center" {...props}>
      {/* User variant */}
      {variant === 'user' && (
        <IdentitySearchCombobox
          identities={identities}
          placeholder="Search by a username or address"
          onCreateIdentityClick={onCreateIdentityClick}
        />
      )}

      {/* Identity variant */}
      {variant === 'identity' && (
        <IdentitySearchCombobox
          identities={identities}
          placeholder="Search by Identity"
          onCreateIdentityClick={onCreateIdentityClick}
        />
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
        <IdentitySearchCombobox
          identities={identities}
          placeholder="Search by list"
          onCreateIdentityClick={onCreateIdentityClick}
        />
      )}
    </div>
  )
}

export { ExploreSearch }
