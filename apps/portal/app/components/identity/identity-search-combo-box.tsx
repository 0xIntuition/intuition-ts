import * as React from 'react'

import {
  Button,
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

import {
  formatBalance,
  getAtomDescription,
  getAtomId,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  sliceString,
  truncateString,
} from '@lib/utils/misc'

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
  onIdentityClick = () => {},
  onIdentitySelect = () => {},
  onCreateIdentityClick,
  identities,
  onValueChange,
  onInput,
  value,
  shouldFilter,
  placeholder = `Search for an identity...`,
  ...props
}: IdentitySearchComboboxProps) => {
  return (
    <div className="min-w-96 max-md:min-w-0 max-md:w-[90vw]" {...props}>
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
            onClick={onCreateIdentityClick}
            className="w-fit p-2.5"
          >
            <Icon name={IconName.plusLarge} className="h-4 w-4" />
            Create a new Identity
          </Button>
        )}
        <CommandList>
          <CommandEmpty>
            <EmptyStateCard
              message={`No identities found.`}
              className="border-none max-md:min-h-0 max-md:h-fit"
            />
          </CommandEmpty>
          <CommandGroup key={identities.length}>
            {identities.map((identity) => {
              const {
                display_name: name,
                user,
                image,
                assets_sum: value,
                follower_count: socialCount,
                tag_count: tagCount,
                is_user: isUser,
              } = identity
              const variant = isUser ? 'user' : 'non-user'

              return (
                <HoverCard openDelay={150} closeDelay={150} key={identity.id}>
                  <HoverCardTrigger className="w-full">
                    <IdentitySearchComboboxItem
                      key={identity.id}
                      variant={variant}
                      name={truncateString(user?.display_name ?? name, 7)}
                      avatarSrc={user?.image ?? image ?? ''}
                      value={+formatBalance(value)}
                      walletAddress={
                        identity.is_user === true
                          ? (identity.user?.ens_name ??
                            sliceString(identity.user?.wallet, 6, 4))
                          : identity.identity_id
                      }
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
                      className="w-max"
                    >
                      <div className="w-80 max-md:w-[80%]">
                        <ProfileCard
                          variant={identity.is_user ? 'user' : 'non-user'}
                          avatarSrc={getAtomImage(identity)}
                          name={getAtomLabel(identity)}
                          id={getAtomId(identity)}
                          stats={
                            identity.is_user === true
                              ? {
                                  numberOfFollowers:
                                    identity.follower_count ?? 0,
                                  numberOfFollowing:
                                    identity.followed_count ?? 0,
                                }
                              : undefined
                          }
                          bio={getAtomDescription(identity)}
                          ipfsLink={getAtomIpfsLink(identity)}
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

export { IdentitySearchCombobox }
