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

import { AtomSearchComboboxItem } from '@components/atom-search-combobox'
import logger from '@lib/utils/logger'
import {
  formatBalance,
  getAtomDescriptionGQL,
  getAtomIpfsLinkGQL,
  truncateString,
} from '@lib/utils/misc'
import { Triple } from 'app/types/triple'

export interface TagSearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tagClaims: Triple[]
  placeholder?: string
  shouldFilter?: boolean
  onTagClick?: (tag: Triple) => void
}

const TagSearchCombobox = ({
  placeholder = 'Search',
  tagClaims,
  onTagClick = () => {},
  ...props
}: TagSearchComboboxProps) => {
  logger('tagClaims in tags-search-combo-box', tagClaims)
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
            {tagClaims.map((tagClaim) => {
              return (
                <HoverCard openDelay={150} closeDelay={150} key={tagClaim.id}>
                  <HoverCardTrigger className="w-full">
                    <AtomSearchComboboxItem
                      key={tagClaim.id}
                      id={tagClaim.id}
                      name={truncateString(tagClaim.object?.label ?? '', 16)}
                      avatarSrc={tagClaim.object?.image ?? ''}
                      value={
                        +formatBalance(tagClaim.vault?.total_shares ?? '0') *
                        +formatBalance(
                          tagClaim.vault?.current_share_price ?? '0',
                        )
                      }
                      variant="non-user"
                      attestors={tagClaim.vault?.position_count || 0}
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
                            tagClaim.object?.label ?? '',
                            18,
                          )}
                          id={tagClaim.object?.vault_id?.toString()}
                          bio={getAtomDescriptionGQL(tagClaim?.object)}
                          ipfsLink={getAtomIpfsLinkGQL(tagClaim?.object)}
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
