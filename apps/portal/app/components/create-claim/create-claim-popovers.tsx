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

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  sliceString,
} from '@lib/utils/misc'
import { ClaimElementType } from 'app/types'

interface IdentityPopoverProps {
  type: ClaimElementType
  isObjectPopoverOpen: boolean
  setIsObjectPopoverOpen: (isOpen: boolean) => void
  selectedIdentity?: IdentityPresenter | null
  identities: IdentityPresenter[]
  handleIdentitySelection: (
    identityType: ClaimElementType,
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
                variant={
                  selectedIdentity?.is_user ? Identity.user : Identity.nonUser
                }
                imgSrc={getAtomImage(selectedIdentity)}
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
                    selectedIdentity.is_user === true
                      ? Identity.user
                      : Identity.nonUser
                  }
                  avatarSrc={getAtomImage(selectedIdentity)}
                  name={getAtomLabel(selectedIdentity)}
                  id={
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
                  bio={getAtomDescription(selectedIdentity)}
                  ipfsLink={getAtomIpfsLink(selectedIdentity)}
                ></ProfileCard>
              </HoverCardContent>
            )}
          </HoverCard>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="bg-transparent border-none max-md:w-full"
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
