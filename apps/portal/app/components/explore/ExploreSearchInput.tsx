import * as React from 'react'

import { Input } from '@0xintuition/1ui'

import { Form, useSubmit } from '@remix-run/react'

export interface ExploreSearchInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  searchParam: string
  placeholder?: string
}

const ExploreSearchInput = ({
  searchParam,
  placeholder = 'Search by a username or address',
  ...props
}: ExploreSearchInputProps) => {
  const submit = useSubmit()

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const query = formData.get(searchParam) as string
    const params = new URLSearchParams({ [searchParam]: query })
    const action = `?${params.toString()}`
    submit(event.currentTarget, { action, method: 'get' })
  }

  return (
    <Form
      method="get"
      onChange={(event: React.ChangeEvent<HTMLFormElement>) =>
        handleChange(event)
      }
      className="flex items-center rounded-lg p-5 border border-1 theme-border bg-card/70"
    >
      <Input
        type="text"
        name={searchParam}
        placeholder={placeholder}
        endAdornment="arrow-corner-down-left"
        className="w-full min-w-[610px] bg-card/70 rounded-lg border-none focus:ring-0 focus:outline-none"
        {...props}
      />
    </Form>
  )
}

export { ExploreSearchInput }
