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
  useSidebarLayoutContext,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { InfoTooltip } from '@components/info-tooltip'
import { globalCreateIdentityModalAtom } from '@lib/state/store'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  sliceString,
} from '@lib/utils/misc'
import { ClaimElementType } from 'app/types'
import { useSetAtom } from 'jotai'

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
  const setCreateIdentityModalActive = useSetAtom(globalCreateIdentityModalAtom)
  const { isMobileView } = useSidebarLayoutContext()

  return (
    <Popover
      open={isObjectPopoverOpen}
      onOpenChange={setIsObjectPopoverOpen}
      modal={isMobileView ? false : isObjectPopoverOpen}
    >
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2 w-45">
          <div className="flex flex-row gap-1">
            <Text variant="caption" className="text-secondary-foreground">
              {type}
            </Text>
            <InfoTooltip
              title={
                type === 'subject'
                  ? 'Subject'
                  : type === 'predicate'
                    ? 'Predicate'
                    : 'Object'
              }
              content={
                type === 'subject'
                  ? 'Represents the entity or concept being described. For example, in the statement {[Alice] [is] [trustworthy]}, [Alice] is the subject.'
                  : type === 'predicate'
                    ? 'Describes the relationship or attribute of the subject. For example, in the statement {[Alice] [is] [trustworthy]}, [Alice], [is] serves as the predicate, akin to the key in a key-value pair.'
                    : 'Denotes the value or characteristic attributed to the subject. For example, in the statement {[Alice] [is] [trustworthy]}, [Alice], [trustworthy] is the object, akin to the value in a key-value pair.'
              }
            />
          </div>
          <HoverCard openDelay={150} closeDelay={100}>
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
              <HoverCardContent side="bottom" className="w-max">
                <div className="w-80 max-md:w-[80%]">
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
                        ? (selectedIdentity.user?.ens_name ??
                          sliceString(selectedIdentity.user?.wallet, 6, 4))
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
                  />
                </div>
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
          onCreateIdentityClick={() => setCreateIdentityModalActive(true)}
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
