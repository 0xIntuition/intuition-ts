import React from 'react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Identity,
  IdentityTag,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProfileCard,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { sliceString, truncateString } from '@lib/utils/misc'
import * as blockies from 'blockies-ts'
import {
  Identity as ClaimIdentity,
  IdentityType as ClaimIdentityType,
} from 'types'

import { IdentitySearchCombobox } from '../identity/identity-search-combo-box'

interface IdentityPopoversProps {
  selectedIdentities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }
  identities: IdentityPresenter[]
  handleIdentitySelection: (
    identityType: ClaimIdentityType,
    identity: IdentityPresenter,
  ) => void
  setSearchQuery: (searchQuery: string) => void
  handleInput: (event: React.FormEvent<HTMLInputElement>) => Promise<void>
  popoverStates: {
    isSubjectPopoverOpen: boolean
    setIsSubjectPopoverOpen: (isOpen: boolean) => void
    isPredicatePopoverOpen: boolean
    setIsPredicatePopoverOpen: (isOpen: boolean) => void
    isObjectPopoverOpen: boolean
    setIsObjectPopoverOpen: (isOpen: boolean) => void
  }
}

export const IdentityPopovers: React.FC<IdentityPopoversProps> = ({
  selectedIdentities,
  identities,
  handleIdentitySelection,
  setSearchQuery,
  handleInput,
  popoverStates,
}) => (
  <div className="flex items-center w-full m-auto justify-center">
    <IdentityPopover
      type={ClaimIdentity.Subject}
      isOpen={popoverStates.isSubjectPopoverOpen}
      setIsOpen={popoverStates.setIsSubjectPopoverOpen}
      selectedIdentity={selectedIdentities.subject}
      identities={identities}
      onIdentitySelect={(identity) =>
        handleIdentitySelection(ClaimIdentity.Subject, identity)
      }
      setSearchQuery={setSearchQuery}
      handleInput={handleInput}
    />
    <Divider />
    <IdentityPopover
      type={ClaimIdentity.Predicate}
      isOpen={popoverStates.isPredicatePopoverOpen}
      setIsOpen={popoverStates.setIsPredicatePopoverOpen}
      selectedIdentity={selectedIdentities.predicate}
      identities={identities}
      onIdentitySelect={(identity) =>
        handleIdentitySelection(ClaimIdentity.Predicate, identity)
      }
      setSearchQuery={setSearchQuery}
      handleInput={handleInput}
    />
    <Divider />
    <IdentityPopover
      type={ClaimIdentity.Object}
      isOpen={popoverStates.isObjectPopoverOpen}
      setIsOpen={popoverStates.setIsObjectPopoverOpen}
      selectedIdentity={selectedIdentities.object}
      identities={identities}
      onIdentitySelect={(identity) =>
        handleIdentitySelection(ClaimIdentity.Object, identity)
      }
      setSearchQuery={setSearchQuery}
      handleInput={handleInput}
    />
  </div>
)

interface IdentityPopoverProps {
  type: ClaimIdentityType
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedIdentity: IdentityPresenter | null
  identities: IdentityPresenter[]
  onIdentitySelect: (identity: IdentityPresenter) => void
  setSearchQuery: (query: string) => void
  handleInput: (event: React.FormEvent<HTMLInputElement>) => Promise<void>
}

export const IdentityPopover: React.FC<IdentityPopoverProps> = ({
  type,
  isOpen,
  setIsOpen,
  selectedIdentity,
  identities,
  onIdentitySelect,
  setSearchQuery,
  handleInput,
}) => {
  const renderProfileCard = (identity: IdentityPresenter) => (
    <ProfileCard
      variant={identity?.is_user === true ? Identity.user : Identity.nonUser}
      avatarSrc={
        identity?.user?.image ??
        identity?.image ??
        blockies.create({ seed: identity?.user?.wallet }).toDataURL()
      }
      name={truncateString(
        identity?.is_user === true
          ? identity?.user?.display_name ?? ''
          : identity?.display_name ?? '',
        18,
      )}
      walletAddress={
        identity?.is_user === true
          ? identity?.user?.ens_name ??
            sliceString(identity?.user?.wallet, 6, 4)
          : identity?.identity_id
      }
      stats={
        identity?.is_user === true
          ? {
              numberOfFollowers: identity?.follower_count ?? 0,
              numberOfFollowing: identity?.followed_count ?? 0,
            }
          : undefined
      }
      bio={
        identity?.is_user === true
          ? identity?.user?.description ?? ''
          : identity?.description ?? ''
      }
    />
  )

  const handleIdentitySelect = (identity: IdentityPresenter) => {
    onIdentitySelect(identity)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={isOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2 w-45">
          <Text variant="small" className="text-primary/60">
            {type}
          </Text>
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger className="w-full">
              <IdentityTag
                size="lg"
                variant={
                  selectedIdentity?.is_user ? Identity.user : Identity.nonUser
                }
                imgSrc={
                  selectedIdentity?.user?.image ??
                  selectedIdentity?.image ??
                  blockies
                    .create({
                      seed: selectedIdentity?.user?.wallet,
                    })
                    .toDataURL()
                }
                className="w-full"
              >
                <Trunctacular
                  maxStringLength={20}
                  variant="bodyLarge"
                  value={
                    (selectedIdentity?.user?.display_name ??
                      selectedIdentity?.display_name ??
                      '') ||
                    type
                  }
                  disableTooltip
                />
              </IdentityTag>
            </HoverCardTrigger>
            {selectedIdentity && (
              <HoverCardContent side="bottom" className="w-80">
                {renderProfileCard(selectedIdentity)}
              </HoverCardContent>
            )}
          </HoverCard>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="bg-transparent border-none"
        side="bottom"
        align="center"
        sideOffset={5}
      >
        <IdentitySearchCombobox
          identities={identities}
          onIdentitySelect={handleIdentitySelect}
          onValueChange={setSearchQuery}
          onInput={handleInput}
          shouldFilter={false}
        />
      </PopoverContent>
    </Popover>
  )
}

const Divider = () => (
  <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
)
