import * as React from 'react'

import { Separator, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE } from '@lib/utils/constants'
import { pascalCaseString } from '@lib/utils/misc'
import { useFetcher, useLocation, useNavigate } from '@remix-run/react'
import { Identity, IdentityType } from 'types/identity'

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
  const identityFetcher = useFetcher<IdentityPresenter[]>()

  React.useEffect(() => {
    const newSelectedIdentities = { ...selectedIdentities }

    const params = new URLSearchParams(location.search)
    const subjectId = params.get(Identity.Subject)
    const predicateId = params.get(Identity.Predicate)
    const objectId = params.get(Identity.Object)

    if (subjectId) {
      const searchParam = `?id=${encodeURIComponent(subjectId)}`
      identityFetcher.load(
        `${GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE}${searchParam}`,
      )
      newSelectedIdentities.subject = identityFetcher.data?.[0] ?? null
      console.log(
        'newSelectedIdentities.subject',
        newSelectedIdentities.subject,
      )
    }
    if (predicateId) {
      const searchParam = `?id=${encodeURIComponent(predicateId)}`
      identityFetcher.load(
        `${GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE}${searchParam}`,
      )
      newSelectedIdentities.predicate = identityFetcher.data?.[0] ?? null
      console.log(
        'newSelectedIdentities.predicate',
        newSelectedIdentities.predicate,
      )
    }
    if (objectId) {
      const searchParam = `?id=${encodeURIComponent(objectId)}`
      identityFetcher.load(
        `${GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE}${searchParam}`,
      )
      newSelectedIdentities.object = identityFetcher.data?.[0] ?? null
      console.log('newSelectedIdentities.object', newSelectedIdentities.object)
    }
    console.log('newSelectedIdentities', newSelectedIdentities)
    setSelectedIdentities(newSelectedIdentities)
  }, [location.search, identityFetcher.load])

  React.useEffect(() => {
    if (identityFetcher.data) {
      const params = new URLSearchParams(location.search)
      const subjectId = params.get(Identity.Subject)
      const predicateId = params.get(Identity.Predicate)
      const objectId = params.get(Identity.Object)

      const newSelectedIdentities = { ...selectedIdentities }

      if (subjectId) {
        newSelectedIdentities.subject = identityFetcher.data?.[0] ?? null
      }
      if (predicateId) {
        newSelectedIdentities.predicate = identityFetcher.data?.[0] ?? null
      }
      if (objectId) {
        newSelectedIdentities.object = identityFetcher.data?.[0] ?? null
      }

      setSelectedIdentities(newSelectedIdentities)
    }
  }, [identityFetcher.data, location.search])

  const handleIdentitySelection = (
    type: IdentityType,
    identity: IdentityPresenter,
  ) => {
    const updatedIdentities = { ...selectedIdentities, [type]: identity }
    setSelectedIdentities(updatedIdentities)
    setPopoverOpen({ ...popoverOpen, [type]: false })
    updateQueryParams(updatedIdentities)
  }

  const updateQueryParams = (identities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }) => {
    const params = new URLSearchParams(window.location.search)
    if (identities.subject) {
      params.set(Identity.Subject, identities.subject.identity_id)
    } else {
      params.delete(Identity.Subject)
    }
    if (identities.predicate) {
      params.set(Identity.Predicate, identities.predicate.identity_id)
    } else {
      params.delete(Identity.Predicate)
    }
    if (identities.object) {
      params.set(Identity.Object, identities.object.identity_id)
    } else {
      params.delete(Identity.Object)
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`
    navigate(newUrl, { replace: true })
  }

  const handleOpenChange = (type: IdentityType, isOpen: boolean) => {
    setPopoverOpen({ ...popoverOpen, [type]: isOpen })
  }

  const identityInputProps = (
    type: IdentityType,
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
        subject={identityInputProps(Identity.Subject)}
        predicate={identityInputProps(Identity.Predicate)}
        object={identityInputProps(Identity.Object)}
      />
    </div>
  )
}

export { ExploreSearchClaimInput }
