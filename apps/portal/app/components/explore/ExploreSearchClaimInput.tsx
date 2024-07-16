import * as React from 'react'

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
  Separator,
  Text,
} from '@0xintuition/1ui'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { FAKE_IDENTITIES } from '@lib/utils/fake-data'
import logger from '@lib/utils/logger'
import { sliceString, truncateString } from '@lib/utils/misc'
import { Form, useSubmit } from '@remix-run/react'
import * as blockies from 'blockies-ts'

export interface ExploreSearchClaimInputProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Divider = () => (
  <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
)

const ExploreSearchClaimInput = () => {
  const submit = useSubmit()
  const [selectedIdentities, setSelectedIdentities] = React.useState({
    subject: null,
    predicate: null,
    object: null,
  })
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleIdentitySelection = (type: string, identity: any) => {
    const updatedIdentities = { ...selectedIdentities, [type]: identity }
    setSelectedIdentities(updatedIdentities)
    updateQueryParams(updatedIdentities)
  }

  const updateQueryParams = (identities: any) => {
    const params = new URLSearchParams()
    if (identities.subject) {
      params.set('subject', identities.subject.id)
    }
    if (identities.predicate) {
      params.set('predicate', identities.predicate.id)
    }
    if (identities.object) {
      params.set('object', identities.object.id)
    }
    const action = `?${params.toString()}`
    submit(new FormData(), { action, method: 'get' })
  }

  return (
    <Form method="get" className="flex flex-col items-center">
      <Text
        variant="bodyLarge"
        weight="regular"
        className="mb-2.5 text-secondary-foreground"
      >
        Select any combination of identities to find matching claims
      </Text>
      <Text
        variant="caption"
        weight="regular"
        className="mb-2.5 text-secondary-foreground"
      >
        Need help? Learn more about claims
      </Text>
      <Separator className="mb-7" />
      <div className="flex items-center gap-4">
        <PopoverIdentityInput
          label="Subject"
          identityType="subject"
          selectedIdentity={selectedIdentities.subject}
          onIdentitySelect={handleIdentitySelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Divider />
        <PopoverIdentityInput
          label="Predicate"
          identityType="predicate"
          selectedIdentity={selectedIdentities.predicate}
          onIdentitySelect={handleIdentitySelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Divider />
        <PopoverIdentityInput
          label="Object"
          identityType="object"
          selectedIdentity={selectedIdentities.object}
          onIdentitySelect={handleIdentitySelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </Form>
  )
}

const PopoverIdentityInput = ({
  label,
  identityType,
  selectedIdentity,
  onIdentitySelect,
  searchQuery,
  setSearchQuery,
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
                  variant={
                    selectedIdentity?.is_user === true ? 'user' : 'non-user'
                  }
                  avatarSrc={
                    selectedIdentity?.user?.image ??
                    blockies
                      .create({ seed: selectedIdentity?.user?.wallet })
                      .toDataURL()
                  }
                  name={
                    selectedIdentity?.is_user === true
                      ? selectedIdentity?.user?.display_name ?? ''
                      : selectedIdentity?.display_name
                  }
                  walletAddress={
                    selectedIdentity?.is_user === true
                      ? selectedIdentity?.user?.ens_name ??
                        sliceString(selectedIdentity?.user?.wallet, 6, 4)
                      : selectedIdentity?.identity_id
                  }
                  stats={
                    selectedIdentity?.is_user === true
                      ? {
                          numberOfFollowers:
                            selectedIdentity?.follower_count ?? 0,
                          numberOfFollowing:
                            selectedIdentity?.followed_count ?? 0,
                        }
                      : undefined
                  }
                  bio={
                    selectedIdentity?.is_user === true
                      ? selectedIdentity?.user?.description ?? ''
                      : selectedIdentity?.description ?? ''
                  }
                >
                  {selectedIdentity?.is_user === true && (
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
        {/* TODO: Fix */}
        <IdentitySearchCombobox
          identities={FAKE_IDENTITIES}
          onIdentitySelect={(identity) =>
            onIdentitySelect(identityType, identity)
          }
          onValueChange={setSearchQuery}
          // onInput={handleInput}
          shouldFilter={false}
        />
      </PopoverContent>
    </Popover>
  )
}

export { ExploreSearchClaimInput }
