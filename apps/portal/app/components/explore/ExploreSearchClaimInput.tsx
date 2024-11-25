import * as React from 'react'

import { Separator, Text } from '@0xintuition/1ui'
import { GetAtomQuery } from '@0xintuition/graphql'

import { IdentitySelector } from '@components/identity/identity-selector'
import { useNavigate } from '@remix-run/react'
import { ClaimElement, ClaimElementType } from 'app/types'

export interface ExploreSearchClaimInputProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ExploreSearchClaimInput = () => {
  const navigate = useNavigate()
  const [selectedIdentities, setSelectedIdentities] = React.useState<{
    subject: GetAtomQuery['atom'] | null
    predicate: GetAtomQuery['atom'] | null
    object: GetAtomQuery['atom'] | null
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

  const handleIdentitySelection = (
    type: ClaimElementType,
    identity: GetAtomQuery['atom'],
  ) => {
    const updatedIdentities = { ...selectedIdentities, [type]: identity }
    setSelectedIdentities(updatedIdentities)
    setPopoverOpen({ ...popoverOpen, [type]: false })
    updateQueryParams(updatedIdentities)
  }

  const updateQueryParams = (identities: {
    subject: GetAtomQuery['atom'] | null
    predicate: GetAtomQuery['atom'] | null
    object: GetAtomQuery['atom'] | null
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

  const Divider = () => (
    <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem] max-md:hidden" />
  )

  return (
    <div className="flex flex-col w-full gap-2 p-4 theme-border rounded-lg">
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

      <Separator className="mb-6" />
      <div className="flex items-center justify-center max-sm:flex-col max-sm:gap-3">
        <IdentitySelector
          type={ClaimElement.Subject}
          isOpen={popoverOpen.subject}
          onOpenChange={(open) =>
            setPopoverOpen((prev) => ({ ...prev, subject: open }))
          }
          selectedIdentity={selectedIdentities.subject}
          onSelect={(identity) =>
            handleIdentitySelection(ClaimElement.Subject, identity)
          }
        />
        <Divider />
        <IdentitySelector
          type={ClaimElement.Predicate}
          isOpen={popoverOpen.predicate}
          onOpenChange={(open) =>
            setPopoverOpen((prev) => ({ ...prev, predicate: open }))
          }
          selectedIdentity={selectedIdentities.predicate}
          onSelect={(identity) =>
            handleIdentitySelection(ClaimElement.Predicate, identity)
          }
        />
        <Divider />
        <IdentitySelector
          type={ClaimElement.Object}
          isOpen={popoverOpen.object}
          onOpenChange={(open) =>
            setPopoverOpen((prev) => ({ ...prev, object: open }))
          }
          selectedIdentity={selectedIdentities.object}
          onSelect={(identity) =>
            handleIdentitySelection(ClaimElement.Object, identity)
          }
        />
      </div>
    </div>
  )
}

export { ExploreSearchClaimInput }
