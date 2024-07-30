import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IdentityTag,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProfileCard,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { sliceString, truncateString } from '@lib/utils/misc'
import { IdentityType } from 'types'

interface IdentityPopoverProps {
  type: IdentityType
  isObjectPopoverOpen: boolean
  setIsObjectPopoverOpen: (isOpen: boolean) => void
  selectedIdentity?: IdentityPresenter | null
  identities: IdentityPresenter[]
  handleIdentitySelection: (
    identityType: IdentityType,
    identity: IdentityPresenter,
  ) => void
  setSearchQuery: (query: string) => void
  handleInput: (event: React.FormEvent<HTMLInputElement>) => Promise<void>
}

export const IdentityPopover: React.FC<IdentityPopoverProps> = ({
  type,
  isObjectPopoverOpen,
  setIsObjectPopoverOpen,
  selectedIdentity,
  identities,
  handleIdentitySelection,
  setSearchQuery,
  handleInput,
}) => {
  return (
    <Popover
      open={isObjectPopoverOpen}
      onOpenChange={setIsObjectPopoverOpen}
      modal={isObjectPopoverOpen}
    >
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2 w-45">
          <Text variant="small" className="text-primary/60">
            {type}
          </Text>
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger className="w-full">
              <IdentityTag
                size="lg"
                variant={selectedIdentity?.is_user ? 'user' : 'non-user'}
                imgSrc={
                  selectedIdentity?.user?.image ?? selectedIdentity?.image
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
                <ProfileCard
                  variant={
                    selectedIdentity.is_user === true ? 'user' : 'non-user'
                  }
                  avatarSrc={
                    selectedIdentity.user?.image ?? selectedIdentity.image ?? ''
                  }
                  name={truncateString(
                    selectedIdentity.user?.display_name ??
                      selectedIdentity.display_name,
                    18,
                  )}
                  walletAddress={
                    selectedIdentity.is_user === true
                      ? selectedIdentity.user?.ens_name ??
                        sliceString(selectedIdentity.user?.wallet, 6, 4)
                      : selectedIdentity.identity_id
                  }
                  stats={
                    selectedIdentity.is_user === true
                      ? {
                          numberOfFollowers:
                            selectedIdentity.follower_count ?? 0,
                          numberOfFollowing:
                            selectedIdentity.followed_count ?? 0,
                        }
                      : undefined
                  }
                  bio={
                    selectedIdentity.is_user === true
                      ? selectedIdentity.user?.description ?? ''
                      : selectedIdentity.description ?? ''
                  }
                ></ProfileCard>
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
          onIdentitySelect={(identity) =>
            handleIdentitySelection(type, identity)
          }
          onValueChange={setSearchQuery}
          onInput={handleInput}
          shouldFilter={false}
        />
      </PopoverContent>
    </Popover>
  )
}
