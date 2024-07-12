import * as React from 'react'

import { IdentityInput, Separator, Text } from '@0xintuition/1ui'

import { ExploreSearchInput } from './ExploreSearchInput'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag'
}

const ExploreSearch = ({ variant, ...props }: ExploreSearchProps) => {
  return (
    <div className="min-w-96 flex flex-col items-center" {...props}>
      {/* User variant */}
      {variant === 'user' && <ExploreSearchInput searchParam="user" />}

      {/* Identity variant */}
      {variant === 'identity' && (
        <ExploreSearchInput searchParam="identity" />
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
      {variant === 'tag' && <ExploreSearchInput searchParam="tag" />}
    </div>
  )
}

export { ExploreSearch }
