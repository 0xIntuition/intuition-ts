import * as React from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  Identity,
} from '@0xintuition/1ui'
import { TagEmbeddedPresenter } from '@0xintuition/api'

import { IdentitySearchComboboxItem } from '@components/identity/identity-search-combo-box-item'
import { formatBalance, truncateString } from '@lib/utils/misc'

export interface TagSearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tags: TagEmbeddedPresenter[]
  placeholder?: string
  shouldFilter?: boolean
}

const TagSearchCombobox = ({
  placeholder = 'Search',
  tags,
  ...props
}: TagSearchComboboxProps) => {
  return (
    <div className="min-w-96" {...props}>
      <Command className="border-none">
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup key={tags.length}>
            {tags.map((tag, index) => {
              const {
                display_name: name,
                total_assets: value,
                num_tagged_identities: tagCount,
                identity_id: walletAddress,
              } = tag
              return (
                <IdentitySearchComboboxItem
                  key={index}
                  variant={Identity.nonUser}
                  name={truncateString(name, 7)}
                  value={+formatBalance(value)}
                  walletAddress={walletAddress}
                  tagCount={tagCount || 0}
                />
              )
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export { TagSearchCombobox }
