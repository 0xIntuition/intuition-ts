import * as React from 'react'

import { IdentityInput, Separator, Text } from '@0xintuition/1ui'

import { Form, useSubmit } from '@remix-run/react'

export interface ExploreSearchClaimInputProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ExploreSearchClaimInput = () => {
  const submit = useSubmit()

  // const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
  //   const formData = new FormData(event.currentTarget)
  //   const query = formData.get(searchParam) as string
  //   const params = new URLSearchParams({ [searchParam]: query })
  //   const action = `?${params.toString()}`
  //   submit(event.currentTarget, { action, method: 'get' })
  // }

  return (
    <Form
      method="get"
      onChange={(event: React.ChangeEvent<HTMLFormElement>) =>
        handleChange(event)
      }
      className="flex items-center"
    >
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
      {/* TODO: Implement search in ENG-2575 */}
      <IdentityInput
        subject={{
          placeholder: 'Select an identity',
          selectedValue: {},
          onClick: () => {},
        }}
        predicate={{
          placeholder: 'Select an identity',
          selectedValue: {},
          onClick: () => {},
        }}
        object={{
          placeholder: 'Select an identity',
          selectedValue: {},
          onClick: () => {},
        }}
        showLabels
      />
    </Form>
  )
}

export { ExploreSearchClaimInput }
