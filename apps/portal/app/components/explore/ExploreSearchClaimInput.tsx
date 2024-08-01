import * as React from 'react'

import { Separator, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { pascalCaseString } from '@lib/utils/misc'
import { useFetcher, useLocation, useNavigate } from '@remix-run/react'
import { GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE } from 'consts'
import { ClaimElement, ClaimElementType } from 'types'

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

  const subjectFetcher = useFetcher<IdentityPresenter[]>()
  const predicateFetcher = useFetcher<IdentityPresenter[]>()
  const objectFetcher = useFetcher<IdentityPresenter[]>()

  const fetchIdentityById = (
    id: string | null,
    fetcher: ReturnType<typeof useFetcher>,
  ) => {
    if (id) {
      const searchParam = `?id=${encodeURIComponent(id)}`
      fetcher.load(`${GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE}${searchParam}`)
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    fetchIdentityById(params.get(ClaimElement.Subject), subjectFetcher)
    fetchIdentityById(params.get(ClaimElement.Predicate), predicateFetcher)
    fetchIdentityById(params.get(ClaimElement.Object), objectFetcher)
    // omits the fetchers from the exhaustive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  React.useEffect(() => {
    const newSelectedIdentities = { ...selectedIdentities }

    if (subjectFetcher.data) {
      newSelectedIdentities.subject = subjectFetcher.data[0] ?? null
    }
    if (predicateFetcher.data) {
      newSelectedIdentities.predicate = predicateFetcher.data[0] ?? null
    }
    if (objectFetcher.data) {
      newSelectedIdentities.object = objectFetcher.data[0] ?? null
    }

    setSelectedIdentities(newSelectedIdentities)
    // omits the fetchers data from the exhaustive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectFetcher.data, predicateFetcher.data, objectFetcher.data])

  const handleIdentitySelection = (
    type: ClaimElementType,
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
      params.set(ClaimElement.Subject, identities.subject.id)
    } else {
      params.delete(ClaimElement.Subject)
    }
    if (identities.predicate) {
      params.set(ClaimElement.Predicate, identities.predicate.id)
    } else {
      params.delete(ClaimElement.Predicate)
    }
    if (identities.object) {
      params.set(ClaimElement.Object, identities.object.id)
    } else {
      params.delete(ClaimElement.Object)
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`
    navigate(newUrl, { replace: true })
  }

  const handleOpenChange = (type: ClaimElementType, isOpen: boolean) => {
    setPopoverOpen({ ...popoverOpen, [type]: isOpen })
  }

  const identityInputProps = (
    type: ClaimElementType,
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
    <div className="flex flex-col w-full gap-2">
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
        subject={identityInputProps(ClaimElement.Subject)}
        predicate={identityInputProps(ClaimElement.Predicate)}
        object={identityInputProps(ClaimElement.Object)}
      />
    </div>
  )
}

export { ExploreSearchClaimInput }
