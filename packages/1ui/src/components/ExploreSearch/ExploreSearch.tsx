import * as React from 'react'

import { CommandGroup } from 'cmdk'

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  IdentityInput,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  Text,
} from '..'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag'
  // TODO: Fix this
  identities: any[]
  onCreateIdentityClick?: () => void
}

const ExploreSearch = ({
  variant,
  onCreateIdentityClick = undefined,
  children,
  ...props
}: ExploreSearchProps) => {
  const tabOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'claims', label: 'Claims' },
    { value: 'positions', label: 'Positions' },
    { value: 'activity', label: 'Activity' },
  ]

  const [selectedTab, setSelectedTab] = React.useState(tabOptions[0].value)

  return (
    <div className="min-w-96 flex flex-col items-center" {...props}>
      <SegmentedControl>
        {tabOptions.map((option, index) => (
          <SegmentedControlItem
            key={index}
            isActive={selectedTab === option.value}
            onClick={() => setSelectedTab(option.value)}
            className="mb-5"
          >
            {option.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>

      {/* User variant */}
      {variant === 'user' && (
        <Command>
          <CommandInput placeholder="Search by a username or address" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
      )}

      {/* Identity variant */}
      {variant === 'identity' && (
        <Command>
          <CommandInput placeholder="Search by Identity" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
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
