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
  Identity,
} from '@0xintuition/1ui'
import { TagEmbeddedPresenter } from '@0xintuition/api'

import {
  IdentitySearchCombobox,
  IdentitySearchComboboxProps,
} from '@components/identity/identity-search-combo-box'
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
      <Command>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup key={tags.length}>
            {tags.map((tag, index) => {
              const {
                display_name: name,
                total_assets: value,
                num_tagged_identities: tagCount,
              } = tag

              // description?: string | null | undefined;
              // display_name: string;
              // identity_id: string;
              // image?: string | null | undefined;
              // num_positions: number;
              // num_tagged_identities: number;
              // total_assets: string;
              // url?: string | null | undefined;
              // vault_id: string;
              // weight: string;

              return (
                <IdentitySearchComboboxItem
                  key={index}
                  variant={Identity.nonUser}
                  name={truncateString(name, 7)}
                  value={+formatBalance(value)}
                  walletAddress={walletAddress}
                  socialCount={socialCount || 0}
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
