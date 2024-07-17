import * as React from 'react'

import { Separator, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { fetchIdentity } from '@lib/utils/fetches'
import { pascalCaseString } from '@lib/utils/misc'
import { useLocation, useNavigate } from '@remix-run/react'

import { IdentityInput, IdentityInputButtonProps } from '../identity-input'

export interface ExploreSearchClaimInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  identities?: IdentityPresenter[]
}

const ExploreSearchClaimInput = ({
  identities = [],
}: ExploreSearchClaimInputProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedIdentities, setSelectedIdentities] = React.useState<{
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }>({
    subject: null,
    predicate: null,
    object: null,
  })
  const [popoverOpen, setPopoverOpen] = React.useState<{
    subject: boolean
    predicate: boolean
    object: boolean
  }>({
    subject: false,
    predicate: false,
    object: false,
  })

  // TODO: Uncomment this once fetchIdentity is working
  // Fetch identities based on URL parameters
  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const subjectId = params.get('subject')
    const predicateId = params.get('predicate')
    const objectId = params.get('object')

    const fetchIdentities = async () => {
      const newSelectedIdentities = { ...selectedIdentities }
      if (subjectId) {
        newSelectedIdentities.subject = await fetchIdentity(subjectId)
      }
      if (predicateId) {
        newSelectedIdentities.predicate = await fetchIdentity(predicateId)
      }
      if (objectId) {
        newSelectedIdentities.object = await fetchIdentity(objectId)
      }
      setSelectedIdentities(newSelectedIdentities)
    }

    fetchIdentities()
  }, [location.search])

  const handleIdentitySelection = (
    type: 'subject' | 'predicate' | 'object',
    identity: IdentityPresenter,
  ) => {
    const updatedIdentities = { ...selectedIdentities, [type]: identity }
    setSelectedIdentities(updatedIdentities)
    setPopoverOpen({ ...popoverOpen, [type]: false }) // Close the popover after selection
    updateQueryParams(updatedIdentities)
  }

  const updateQueryParams = (identities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }) => {
    const params = new URLSearchParams(window.location.search)
    if (identities.subject) {
      params.set('subject', identities.subject.identity_id)
    } else {
      params.delete('subject')
    }
    if (identities.predicate) {
      params.set('predicate', identities.predicate.identity_id)
    } else {
      params.delete('predicate')
    }
    if (identities.object) {
      params.set('object', identities.object.identity_id)
    } else {
      params.delete('object')
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`
    navigate(newUrl, { replace: true })
  }

  const handleOpenChange = (
    type: 'subject' | 'predicate' | 'object',
    isOpen: boolean,
  ) => {
    setPopoverOpen({ ...popoverOpen, [type]: isOpen })
  }

  const identityInputProps = (
    type: 'subject' | 'predicate' | 'object',
  ): IdentityInputButtonProps => ({
    label: pascalCaseString(type),
    placeholder: `Select an identity`,
    selectedValue: selectedIdentities[type]
      ? {
          variant: selectedIdentities[type]!.is_user ? 'user' : 'non-user',
          imgSrc: selectedIdentities[type]!.user?.image ?? null,
          name: selectedIdentities[type]!.display_name,
        }
      : { name: '' },
    onClick: () => handleOpenChange(type, !popoverOpen[type]),
    isPopoverOpen: popoverOpen[type],
    identities,
    onIdentitySelect: (identity: IdentityPresenter) =>
      handleIdentitySelection(type, identity),
  })

  return (
    <div className="flex flex-col">
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
        Need help?{' '}
        <a
          href="https://intutition.systems"
          className="text-primary/50 underline"
        >
          Learn more about claims
        </a>
      </Text>

      <Separator className="mb-7" />
      <IdentityInput
        showLabels
        subject={identityInputProps('subject')}
        predicate={identityInputProps('predicate')}
        object={identityInputProps('object')}
      />
    </div>
  )
}

export { ExploreSearchClaimInput }
