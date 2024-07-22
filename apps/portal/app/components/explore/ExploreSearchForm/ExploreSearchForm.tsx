import * as React from 'react'

import { Separator } from '@0xintuition/1ui'

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
    const params = new URLSearchParams({
      displayNameQuery,
      tagIdQuery,
    })
    const action = `?${params.toString()}`
    submit(event.currentTarget, { action, method: 'get' })
  }

  return (
    <Form
      method="get"
      onChange={handleChange}
      className="flex flex-col rounded-lg p-5 border border-1 theme-border bg-card/70"
    >
      <ExploreSearchInput
        searchParam={searchParam}
        placeholder={inputPlaceholder}
        initialValue={searchParams.get(searchParam)}
      />
      {searchParam === 'identity' && (
        <>
          <Separator className="my-5 in-out-gradient-strong" />
          <ExploreAddTags
            inputId={tagsInputId}
            initialValue={searchParams.get(tagsInputId)}
          />
        </>
      )}
    </Form>
  )
}

export { ExploreSearchForm }
