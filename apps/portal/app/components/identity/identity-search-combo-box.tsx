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
  EmptyStateCard,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IconName,
  ProfileCard,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { formatBalance, sliceString, truncateString } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL } from 'consts'

import { IdentitySearchComboboxItem } from './identity-search-combo-box-item'

export interface IdentitySearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  identities: IdentityPresenter[]
  placeholder?: string
  onIdentityClick?: (identity: IdentityPresenter) => void
  onIdentitySelect?: (identity: IdentityPresenter) => void
  onCreateIdentityClick?: () => void
  value?: string
  onValueChange?: (value: string) => void
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
  shouldFilter?: boolean
}

// TODO: [ENG-2670] - determine why there are more selected identities showing when overriding default search

const IdentitySearchCombobox = ({
  placeholder = 'Search for an identity...',
  onIdentityClick = () => {},
  onIdentitySelect = () => {},
  onCreateIdentityClick,
  identities,
  onValueChange,
  onInput,
  value,
  shouldFilter,
  ...props
}: IdentitySearchComboboxProps) => {
  return (
    <div className="min-w-96" {...props}>
      <Command shouldFilter={shouldFilter}>
        <CommandInput
          placeholder={placeholder}
          value={value}
          onValueChange={onValueChange}
          onInput={onInput}
        />
        {onCreateIdentityClick && (
          <Button
            variant={ButtonVariant.text}
            size={ButtonSize.lg}
            className="gap-1.5 font-light justify-start p-3 theme-border border-0 border-b"
            onClick={onCreateIdentityClick}
          >
            <Icon name={IconName.plusLarge} className="h-4 w-4" />
            Create a new identity
          </Button>
        )}
        <CommandList>
          <CommandEmpty>
            <EmptyStateCard
              message="No identities found."
              className="border-none"
            />
          </CommandEmpty>
          <CommandGroup key={identities.length}>
            {identities.map((identity) => {
              const {
                display_name: name,
                user,
                image,
                assets_sum: value,
                creator_address: walletAddress,
                follower_count: socialCount,
                tag_count: tagCount,
                is_user: isUser,
              } = identity
              const variant = isUser ? 'user' : 'non-user'

              return (
                <HoverCard openDelay={100} closeDelay={100} key={identity.id}>
                  <HoverCardTrigger className="w-full">
                    <IdentitySearchComboboxItem
                      key={identity.id}
                      variant={variant}
                      name={truncateString(user?.display_name ?? name, 7)}
                      avatarSrc={user?.image ?? image ?? ''}
                      value={+formatBalance(value)}
                      walletAddress={walletAddress}
                      socialCount={socialCount || 0}
                      tagCount={tagCount || 0}
                      onClick={() => onIdentityClick(identity)}
                      onSelect={() => onIdentitySelect(identity)}
                    />
                  </HoverCardTrigger>
                  {identity && (
                    <HoverCardContent
                      side="right"
                      sideOffset={16}
                      className="w-80"
                    >
                      <ProfileCard
                        variant={identity.is_user ? 'user' : 'non-user'}
                        avatarSrc={identity.user?.image ?? identity.image ?? ''}
                        name={truncateString(
                          identity.user?.display_name ?? identity.display_name,
                          18,
                        )}
                        id={
                          identity.is_user === true
                            ? identity.user?.ens_name ??
                              sliceString(identity.user?.wallet, 6, 4)
                            : identity.identity_id
                        }
                        stats={
                          identity.is_user === true
                            ? {
                                numberOfFollowers: identity.follower_count ?? 0,
                                numberOfFollowing: identity.followed_count ?? 0,
                              }
                            : undefined
                        }
                        bio={
                          identity.is_user === true
                            ? identity.user?.description ?? ''
                            : identity.description ?? ''
                        }
                        ipfsLink={
                          identity.is_user === true
                            ? `${BLOCK_EXPLORER_URL}/address/${identity.identity_id}`
                            : `${IPFS_GATEWAY_URL}/${identity?.identity_id?.replace('ipfs://', '')}`
                        }
                      ></ProfileCard>
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

export { IdentitySearchCombobox }
