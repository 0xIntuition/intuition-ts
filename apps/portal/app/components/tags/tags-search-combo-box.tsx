import * as React from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  EmptyStateCard,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Identity,
  ProfileCard,
} from '@0xintuition/1ui'
import { TagEmbeddedPresenter } from '@0xintuition/api'

import { IdentitySearchComboboxItem } from '@components/identity/identity-search-combo-box-item'
import { formatBalance, truncateString } from '@lib/utils/misc'
import { IPFS_GATEWAY_URL } from 'app/consts'

export interface TagSearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tags: TagEmbeddedPresenter[]
  placeholder?: string
  shouldFilter?: boolean
  onTagClick?: (identity: TagEmbeddedPresenter) => void
}

const TagSearchCombobox = ({
  placeholder = 'Search',
  tags,
  onTagClick = () => {},
  ...props
}: TagSearchComboboxProps) => {
  return (
    <div className="min-w-96" {...props}>
      <Command className="border-none">
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>
            <EmptyStateCard
              message="No identities found."
              className="border-none"
            />
          </CommandEmpty>
          <CommandGroup key={tags.length}>
            {tags.map((tag, index) => {
              const {
                display_name: name,
                total_assets: value,
                num_tagged_identities: tagCount,
                identity_id: walletAddress,
              } = tag
              return (
                <HoverCard
                  openDelay={150}
                  closeDelay={150}
                  key={tag.identity_id}
                >
                  <HoverCardTrigger className="w-full">
                    <IdentitySearchComboboxItem
                      key={index}
                      variant={Identity.nonUser}
                      name={truncateString(name, 16)}
                      value={+formatBalance(value)}
                      walletAddress={walletAddress}
                      avatarSrc={tag.image ?? ''}
                      tagCount={tagCount || 0}
                      onClick={() => onTagClick(tag)}
                      onSelect={() => onTagClick(tag)}
                    />
                  </HoverCardTrigger>
                  {tag && (
                    <HoverCardContent
                      side="right"
                      sideOffset={16}
                      className="w-max"
                    >
                      <div className="w-80 max-md:w-[80%]">
                        <ProfileCard
                          variant={Identity.nonUser}
                          avatarSrc={tag.image ?? ''}
                          name={truncateString(tag.display_name, 18)}
                          id={tag.identity_id}
                          bio={tag.description ?? ''}
                          ipfsLink={`${IPFS_GATEWAY_URL}/${tag?.identity_id?.replace('ipfs://', '')}`}
                        />
                      </div>
                    </HoverCardContent>
                  )}
                </HoverCard>
              )
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export { TagSearchCombobox }
