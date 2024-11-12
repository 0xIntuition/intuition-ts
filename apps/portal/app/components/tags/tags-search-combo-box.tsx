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
  tagClaims: ClaimPresenter[]
  placeholder?: string
  shouldFilter?: boolean
  onTagClick?: (tag: ClaimPresenter) => void
}

const TagSearchCombobox = ({
  placeholder = 'Search',
  tagClaims,
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
          <CommandGroup key={tagClaims.length}>
            {tagClaims.map((tagClaim, index) => {
              return (
                <HoverCard
                  openDelay={150}
                  closeDelay={150}
                  key={tagClaim.claim_id}
                >
                  <HoverCardTrigger className="w-full">
                    <IdentitySearchComboboxItem
                      key={index}
                      variant={Identity.nonUser}
                      name={truncateString(
                        tagClaim.object?.display_name ?? '',
                        16,
                      )}
                      value={+formatBalance(tagClaim.assets_sum)}
                      walletAddress={tagClaim.object?.identity_id ?? ''}
                      avatarSrc={tagClaim.object?.image ?? ''}
                      tagCount={tagClaim.num_positions || 0}
                      onClick={() => onTagClick(tagClaim)}
                      onSelect={() => onTagClick(tagClaim)}
                    />
                  </HoverCardTrigger>
                  {tagClaim && (
                    <HoverCardContent
                      side="right"
                      sideOffset={16}
                      className="w-max"
                    >
                      <div className="w-80 max-md:w-[80%]">
                        <ProfileCard
                          variant={Identity.nonUser}
                          avatarSrc={tagClaim.object?.image ?? ''}
                          name={truncateString(
                            tagClaim.object?.display_name ?? '',
                            18,
                          )}
                          id={tagClaim.object?.identity_id}
                          bio={tagClaim.object?.description ?? ''}
                          ipfsLink={getAtomIpfsLink(tagClaim?.object)}
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
