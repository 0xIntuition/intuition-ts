import * as React from 'react'

import { Separator, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { Form, useSubmit } from '@remix-run/react'

import { ExplorePopoverIdentityInput } from './ExplorePopoverIdentityInput'

export interface ExploreSearchClaimInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  identities?: IdentityPresenter[]
}

const Divider = () => (
  <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
)

const ExploreSearchClaimInput = ({
  identities = [],
}: ExploreSearchClaimInputProps) => {
  const submit = useSubmit()
  const [selectedIdentities, setSelectedIdentities] = React.useState<{
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }>({
    subject: null,
    predicate: null,
    object: null,
  })
  const [searchQuery, setSearchQuery] = React.useState<string>('')

  const handleIdentitySelection = (
    type: 'subject' | 'predicate' | 'object',
    identity: IdentityPresenter,
  ) => {
    const updatedIdentities = { ...selectedIdentities, [type]: identity }
    setSelectedIdentities(updatedIdentities)
    updateQueryParams(updatedIdentities)
  }

  const updateQueryParams = (identities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }) => {
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

  const handleInput = (value: string) => {
    setSearchQuery(value)
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
        <ExplorePopoverIdentityInput
          label="Subject"
          identityType="subject"
          selectedIdentity={selectedIdentities.subject}
          onIdentitySelect={handleIdentitySelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          identities={identities}
          handleInput={handleInput}
        />
        <Divider />
        <ExplorePopoverIdentityInput
          label="Predicate"
          identityType="predicate"
          selectedIdentity={selectedIdentities.predicate}
          onIdentitySelect={handleIdentitySelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          identities={identities}
          handleInput={handleInput}
        />
        <Divider />
        <ExplorePopoverIdentityInput
          label="Object"
          identityType="object"
          selectedIdentity={selectedIdentities.object}
          onIdentitySelect={handleIdentitySelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          identities={identities}
          handleInput={handleInput}
        />
      </div>
    </Form>
  )
}

export { ExploreSearchClaimInput }
