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
  inputPlaceholder = 'Search by a username or address',
}: ExploreSearchFormProps) => {
  const [searchParams] = useSearchParams()
  const submit = useSubmit()
  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const tagIds = formData.get('tags') as string
    const query = formData.get(searchParam) as string
    const params = new URLSearchParams({ [searchParam]: query, tags: tagIds })
    const action = `?${params.toString()}`
    submit(event.currentTarget, { action, method: 'get' })
  }

  return (
    <Form
      method="get"
      onChange={(event: React.ChangeEvent<HTMLFormElement>) =>
        handleChange(event)
      }
      className="flex flex-col rounded-lg p-5 border border-1 theme-border bg-card/70"
    >
      <ExploreSearchInput
        searchParam={searchParam}
        placeholder={inputPlaceholder}
        initialValue={searchParams.get(searchParam)}
      />
      <Separator className="my-5 in-out-gradient-strong" />
      <ExploreAddTags initialValue={searchParams.get('tags')} />
    </Form>
  )
}

export { ExploreSearchForm }
