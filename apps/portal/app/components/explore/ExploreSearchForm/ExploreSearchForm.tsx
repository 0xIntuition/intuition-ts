import * as React from 'react'

import {
  RadioGroup,
  RadioGroupDivider,
  RadioGroupItem,
  RadioGroupItemContainer,
  RadioGroupItemLabel,
  Separator,
} from '@0xintuition/1ui'

import { Form, useSearchParams, useSubmit } from '@remix-run/react'

import { ExploreAddTags } from './ExploreAddTags/ExploreAddTags'
import { ExploreSearchInput } from './ExploreSearchInput/ExploreSearchInput'

export interface ExploreSearchFormProps {
  searchParam: string
  inputPlaceholder?: string
}

const ExploreSearchForm = ({
  searchParam,
  inputPlaceholder = searchParam === 'user'
    ? 'Search by a username or address'
    : searchParam === 'identity'
      ? 'Search by identity'
      : 'Search',
}: ExploreSearchFormProps) => {
  const tagsInputId = 'tagIds'
  const [searchParams] = useSearchParams()
  const submit = useSubmit()

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const tagIdQuery = formData.get(tagsInputId) as string
    const displayNameQuery = formData.get(searchParam) as string
    const isUser = formData.get('isUser') as string

    const params = new URLSearchParams()

    if (displayNameQuery) {
      params.append(searchParam, displayNameQuery)
    }

    if (tagIdQuery) {
      params.append('tagIds', tagIdQuery)
    }

    if (isUser === 'true' || isUser === 'false') {
      params.append('isUser', isUser)
    }

    const action = `?${params.toString()}`
    submit(event.currentTarget, { action, method: 'get' })
  }

  const radioGroupData = [
    {
      id: 'all',
      value: '',
      displayValue: 'All',
    },
    {
      id: 'users',
      value: 'true',
      displayValue: 'Users',
    },
    {
      id: 'non-users',
      value: 'false',
      displayValue: 'Non-users',
    },
  ]

  const numberOfRadioGroupItems = radioGroupData.length

  return (
    <Form
      method="get"
      onChange={handleChange}
      className="flex flex-col rounded-lg p-5 border border-1 theme-border bg-card/70 gap-4 max-md:w-full"
    >
      <ExploreSearchInput
        searchParam={searchParam}
        placeholder={inputPlaceholder}
        initialValue={searchParams.get(searchParam)}
      />
      {searchParam === 'identity' && (
        <>
          <Separator className="my-5 in-out-gradient-strong max-md:m-0" />
          <ExploreAddTags
            inputId={tagsInputId}
            initialValue={searchParams.get(tagsInputId)}
          />
          <Separator className="my-5 in-out-gradient-strong max-md:m-0" />
          <RadioGroup name="isUser" defaultValue="">
            {radioGroupData.map((item, index) => (
              <div key={index}>
                <RadioGroupItemContainer>
                  <RadioGroupItemLabel
                    htmlFor={item.id}
                    value={item.displayValue}
                    subValue={'test'}
                  />
                  <RadioGroupItem value={item.value} id={item.id} />
                </RadioGroupItemContainer>
                {index < numberOfRadioGroupItems - 1 && <RadioGroupDivider />}
              </div>
            ))}
          </RadioGroup>
        </>
      )}
    </Form>
  )
}

export { ExploreSearchForm }
