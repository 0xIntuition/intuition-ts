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
  Identity,
  ProfileCard,
} from '@0xintuition/1ui'

import { formatBalance, truncateString } from '@lib/utils/misc'
import { IdentityType } from 'app/types'

import { IdentitySearchComboboxItem } from './identity-search-combo-box-item'

export interface IdentitySearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  identities: IdentityType[]
  placeholder?: string
  onIdentityClick?: (identity: IdentityType) => void
  onIdentitySelect?: (identity: IdentityType) => void
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
              return (
                <HoverCard openDelay={150} closeDelay={150} key={identity.id}>
                  <HoverCardTrigger className="w-full">
                    <IdentitySearchComboboxItem
                      key={identity.id}
                      variant={
                        identity.type === ('Person' || 'Account')
                          ? Identity.user
                          : Identity.nonUser
                      }
                      name={truncateString(identity.label ?? '', 7)}
                      avatarSrc={identity.image ?? ''}
                      value={
                        +formatBalance(identity.vault?.currentSharePrice, 18) *
                          +formatBalance(identity.vault?.totalShares, 18) ?? '0'
                      }
                      walletAddress={identity.walletId}
                      socialCount={0} // TODO: add follower count
                      tagCount={0} // TODO: add tag count
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
                          variant={
                            identity.type === ('Person' || 'Account')
                              ? Identity.user
                              : Identity.nonUser
                          }
                          avatarSrc={identity.image ?? ''}
                          name={identity.label ?? ''}
                          id={identity.walletId}
                          stats={
                            identity.type === ('Person' || 'Account')
                              ? {
                                  numberOfFollowers: 0,
                                  numberOfFollowing: 0,
                                }
                              : undefined
                          }
                          bio={
                            identity.value?.person?.description ||
                            identity.value?.thing?.description ||
                            identity.value?.organization?.description ||
                            ''
                          }
                          ipfsLink={
                            identity.value?.person?.url ||
                            identity.value?.thing?.url ||
                            identity.value?.organization?.url ||
                            ''
                          }
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
