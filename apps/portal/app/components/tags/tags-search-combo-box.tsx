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
import { ClaimPresenter } from '@0xintuition/api'

import { IdentitySearchComboboxItem } from '@components/identity/identity-search-combo-box-item'
import { formatBalance, getAtomIpfsLink, truncateString } from '@lib/utils/misc'

export interface TagSearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tags: ClaimPresenter[]
  placeholder?: string
  shouldFilter?: boolean
  onTagClick?: (tag: ClaimPresenter) => void
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
              return (
                <HoverCard openDelay={150} closeDelay={150} key={tag.claim_id}>
                  <HoverCardTrigger className="w-full">
                    <IdentitySearchComboboxItem
                      key={index}
                      variant={Identity.nonUser}
                      name={truncateString(tag.object?.display_name ?? '', 16)}
                      value={+formatBalance(tag.assets_sum)}
                      walletAddress={tag.object?.identity_id ?? ''}
                      avatarSrc={tag.object?.image ?? ''}
                      tagCount={tag.num_positions || 0}
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
                          avatarSrc={tag.object?.image ?? ''}
                          name={truncateString(
                            tag.object?.display_name ?? '',
                            18,
                          )}
                          id={tag.object?.identity_id}
                          bio={tag.object?.description ?? ''}
                          ipfsLink={getAtomIpfsLink(tag?.object)}
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
