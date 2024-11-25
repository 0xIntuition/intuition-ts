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
import { GetAtomQuery } from '@0xintuition/graphql'

import { AtomSearchComboboxExtended } from '@components/atom-search-combobox-extended'
import { InfoTooltip } from '@components/info-tooltip'
import {
  getAtomDescriptionGQL,
  getAtomIdGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
} from '@lib/utils/misc'
import { ClaimElementType } from 'app/types'

interface IdentitySelectorProps {
  type: ClaimElementType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedIdentity: GetAtomQuery['atom'] | null
  onSelect: (identity: GetAtomQuery['atom']) => void
}

export const IdentitySelector = ({
  type,
  isOpen,
  onOpenChange,
  selectedIdentity,
  onSelect,
}: IdentitySelectorProps) => {
  const { isMobileView } = useSidebarLayoutContext()

  const tooltipContent = {
    subject:
      'Represents the entity or concept being described. For example, in the statement {[Alice] [is] [trustworthy]}, [Alice] is the subject.',
    predicate:
      'Describes the relationship or attribute of the subject. For example, in the statement {[Alice] [is] [trustworthy]}, [Alice], [is] serves as the predicate, akin to the key in a key-value pair.',
    object:
      'Denotes the value or characteristic attributed to the subject. For example, in the statement {[Alice] [is] [trustworthy]}, [Alice], [trustworthy] is the object, akin to the value in a key-value pair.',
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={onOpenChange}
      modal={isMobileView ? false : isOpen}
    >
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2 w-45">
          <div className="flex flex-row gap-1">
            <Text variant="caption" className="text-secondary-foreground">
              {type}
            </Text>
            <InfoTooltip title={type} content={tooltipContent[type]} />
          </div>
          <HoverCard openDelay={150} closeDelay={100}>
            <HoverCardTrigger className="w-full">
              <IdentityTag
                size="lg"
                variant={
                  selectedIdentity?.type ===
                  ('Account' || 'Person' || 'Default')
                    ? Identity.user
                    : Identity.nonUser
                }
                imgSrc={getAtomImageGQL(selectedIdentity)}
                className="w-full"
              >
                <Trunctacular
                  maxStringLength={20}
                  variant="bodyLarge"
                  value={(selectedIdentity?.label ?? '') || type}
                  disableTooltip
                />
              </IdentityTag>
            </HoverCardTrigger>
            {selectedIdentity && (
              <HoverCardContent side="bottom" className="w-max">
                <div className="w-80 max-md:w-[80%]">
                  <ProfileCard
                    variant={
                      selectedIdentity?.type ===
                      ('Account' || 'Person' || 'Default')
                        ? Identity.user
                        : Identity.nonUser
                    }
                    avatarSrc={getAtomImageGQL(selectedIdentity)}
                    name={getAtomLabelGQL(selectedIdentity)}
                    id={getAtomIdGQL(selectedIdentity)}
                    stats={undefined}
                    bio={getAtomDescriptionGQL(selectedIdentity)}
                    ipfsLink={getAtomIpfsLinkGQL(selectedIdentity)}
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
        <AtomSearchComboboxExtended
          onAtomSelect={onSelect}
          placeholder={`Search for ${type}...`}
          initialValue=""
          className="w-[600px]"
        />
      </PopoverContent>
    </Popover>
  )
}
