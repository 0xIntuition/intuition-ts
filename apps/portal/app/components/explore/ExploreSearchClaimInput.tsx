import * as React from 'react'

import { IdentityInput, Separator, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { useNavigate } from '@remix-run/react'

import { ExplorePopoverIdentityInput } from './ExplorePopoverIdentityInput'

export interface ExploreSearchClaimInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  identities?: IdentityPresenter[]
}

const ExploreSearchClaimInput = ({
  identities = [],
}: ExploreSearchClaimInputProps) => {
  const navigate = useNavigate()
  const [selectedIdentities, setSelectedIdentities] = React.useState<{
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }>({
    subject: null,
    predicate: null,
    object: null,
  })
  const [popoverType, setPopoverType] = React.useState<
    'subject' | 'predicate' | 'object' | null
  >(null)
  const [searchQuery, setSearchQuery] = React.useState<string>('')

  const handleIdentitySelection = (
    type: 'subject' | 'predicate' | 'object',
    identity: IdentityPresenter,
  ) => {
    const updatedIdentities = { ...selectedIdentities, [type]: identity }
    setSelectedIdentities(updatedIdentities)
    setPopoverType(null) // Close the popover after selection
    updateQueryParams(updatedIdentities)
  }

  const updateQueryParams = (identities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }) => {
    const params = new URLSearchParams(window.location.search)
    if (identities.subject) {
      params.set('subject', identities.subject.id)
    } else {
      params.delete('subject')
    }
    if (identities.predicate) {
      params.set('predicate', identities.predicate.id)
    } else {
      params.delete('predicate')
    }
    if (identities.object) {
      params.set('object', identities.object.id)
    } else {
      params.delete('object')
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`
    navigate(newUrl, { replace: true })
  }

  const handleInput = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <div className="flex flex-col items-center">
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
      <IdentityInput
        showLabels
        subject={{
          placeholder: 'Select an identity',
          selectedValue: selectedIdentities.subject
            ? {
                variant: selectedIdentities.subject.is_user
                  ? 'user'
                  : 'non-user',
                imgSrc: selectedIdentities.subject.user?.image ?? null,
                name: selectedIdentities.subject.display_name,
              }
            : { name: '' },
          onClick: () => {
            console.log('subject clicked')
            setPopoverType('subject')
          },
        }}
        predicate={{
          placeholder: 'Select an identity',
          selectedValue: selectedIdentities.predicate
            ? {
                variant: selectedIdentities.predicate.is_user
                  ? 'user'
                  : 'non-user',
                imgSrc: selectedIdentities.predicate.user?.image ?? null,
                name: selectedIdentities.predicate.display_name,
              }
            : { name: '' },
          onClick: () => setPopoverType('predicate'),
        }}
        object={{
          placeholder: 'Select an identity',
          selectedValue: selectedIdentities.object
            ? {
                variant: selectedIdentities.object.is_user
                  ? 'user'
                  : 'non-user',
                imgSrc: selectedIdentities.object.user?.image ?? null,
                name: selectedIdentities.object.display_name,
              }
            : { name: '' },
          onClick: () => setPopoverType('object'),
        }}
      />
      {popoverType && (
        <ExplorePopoverIdentityInput
          label={popoverType}
          identityType={popoverType}
          selectedIdentity={selectedIdentities[popoverType]}
          onIdentitySelect={(type, identity) =>
            handleIdentitySelection(type, identity)
          }
          setSearchQuery={setSearchQuery}
          identities={identities}
          handleInput={handleInput}
        />
      )}
    </div>
  )
}

export { ExploreSearchClaimInput }
