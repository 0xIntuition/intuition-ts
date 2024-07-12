import * as React from 'react'

import { Button, Icon, IconName, Input } from '@0xintuition/1ui'

import { Form, useSubmit } from '@remix-run/react'

export interface ExploreSearchInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  searchParam: string
  placeholder?: string
  onSearch?: () => void
}

const ExploreSearchInput = ({
  searchParam,
  placeholder = 'Search by a username or address',
  onSearch,
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
      onChange={handleChange}
      className="flex items-center rounded-lg px-4 py-2"
      {...props}
    >
      <Input type="text" name={searchParam} placeholder={placeholder} />
      <Button onClick={onSearch} variant="icon" size="lg" className="ml-2">
        <Icon name={IconName.arrowCornerDownLeft} className="h-5 w-5" />
      </Button>
    </Form>
  )
}

export { ExploreSearchInput }
