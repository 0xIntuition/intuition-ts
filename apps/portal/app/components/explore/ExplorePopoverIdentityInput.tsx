import React from 'react'

import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IdentityTag,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProfileCard,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import logger from '@lib/utils/logger'
import { sliceString, truncateString } from '@lib/utils/misc'
import * as blockies from 'blockies-ts'

interface ExplorePopoverIdentityInputProps {
  label: string
  identityType: 'subject' | 'predicate' | 'object'
  selectedIdentity: IdentityPresenter | null
  onIdentitySelect: (
    type: 'subject' | 'predicate' | 'object',
    identity: IdentityPresenter,
  ) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  identities: IdentityPresenter[]
  handleInput: (value: string) => void
}

export const ExplorePopoverIdentityInput: React.FC<
  ExplorePopoverIdentityInputProps
> = ({
  label,
  identityType,
  selectedIdentity,
  onIdentitySelect,
  setSearchQuery,
  identities,
  handleInput,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2 items-start">
          <Text variant="small" className="text-primary/60">
            {label}
          </Text>
          <HoverCard>
            <HoverCardTrigger>
              <IdentityTag size="lg">
                {truncateString(selectedIdentity?.display_name ?? '', 7) ||
                  label}
              </IdentityTag>
            </HoverCardTrigger>
            {selectedIdentity && (
              <HoverCardContent side="bottom">
                <ProfileCard
                  variant={selectedIdentity.is_user ? 'user' : 'non-user'}
                  avatarSrc={
                    selectedIdentity.user?.image ??
                    blockies
                      .create({ seed: selectedIdentity.user?.wallet })
                      .toDataURL()
                  }
                  name={
                    selectedIdentity.is_user
                      ? selectedIdentity.user?.display_name ?? ''
                      : selectedIdentity.display_name
                  }
                  walletAddress={
                    selectedIdentity.is_user
                      ? selectedIdentity.user?.ens_name ??
                        sliceString(selectedIdentity.user?.wallet, 6, 4)
                      : selectedIdentity.identity_id
                  }
                  stats={
                    selectedIdentity.is_user
                      ? {
                          numberOfFollowers:
                            selectedIdentity.follower_count ?? 0,
                          numberOfFollowing:
                            selectedIdentity.followed_count ?? 0,
                        }
                      : undefined
                  }
                  bio={
                    selectedIdentity.is_user
                      ? selectedIdentity.user?.description ?? ''
                      : selectedIdentity.description ?? ''
                  }
                >
                  {selectedIdentity.is_user && (
                    <Button
                      variant="accent"
                      onClick={() => logger('follow functionality')}
                    >
                      Follow
                    </Button>
                  )}
                </ProfileCard>
              </HoverCardContent>
            )}
          </HoverCard>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-transparent">
        <IdentitySearchCombobox
          identities={identities}
          onIdentitySelect={(identity) =>
            onIdentitySelect(identityType, identity)
          }
          onValueChange={setSearchQuery}
          onInput={handleInput}
          shouldFilter={false}
        />
      </PopoverContent>
    </Popover>
  )
}
