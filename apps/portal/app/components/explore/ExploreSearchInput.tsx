import * as React from 'react'

import {
  Button,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  TagsListInput,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { FAKE_IDENTITIES } from '@lib/utils/fake-data'
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
  const tagsContainerRef = React.useRef(null)
  const popoverContentRef = React.useRef(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [tags, setTags] = React.useState<{ name: string; id: string }[]>([])
  const [identityResults, setIdentityResults] = React.useState<
    IdentityPresenter[]
  >([])

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const query = formData.get(searchParam) as string
    const params = new URLSearchParams({ [searchParam]: query })
    const action = `?${params.toString()}`
    submit(event.currentTarget, { action, method: 'get' })
  }

  const isUserClickOutsideOfTagsInteractionZone = (
    target: EventTarget | null,
  ) =>
    tagsContainerRef.current &&
    // @ts-ignore - ref current value incorrectly being thought of as type 'never'
    !tagsContainerRef.current.contains(target) &&
    popoverContentRef.current &&
    // @ts-ignore - ref current value incorrectly being thought of as type 'never'
    !popoverContentRef.current.contains(target)

  const removeSelectedTagsFromSearchResults = (results: IdentityPresenter[]) =>
    results.filter(
      (result) => !tags.includes({ name: result.display_name, id: result.id }),
    )

  React.useEffect(() => {
    document.addEventListener('click', (event) => {
      if (
        isPopoverOpen &&
        isUserClickOutsideOfTagsInteractionZone(event.target)
      ) {
        setIsPopoverOpen(false)
      }
    })
  })

  return (
    <Form
      method="get"
      onChange={(event: React.ChangeEvent<HTMLFormElement>) =>
        handleChange(event)
      }
      className="flex flex-col rounded-lg p-5 border border-1 theme-border bg-card/70"
    >
      <div className="flex items-center justify-between">
        <Input
          type="text"
          name={searchParam}
          placeholder={placeholder}
          className="w-full min-w-[610px] bg-card/70 rounded-lg border-none focus:ring-0 focus:outline-none [&>input]:text-lg pl-px"
          {...props}
        />
        <Button type="submit" variant="secondary" size="icon">
          <Icon name="arrow-corner-down-left" />
        </Button>
      </div>
      <Separator className="my-5 in-out-gradient-strong" />
      <div ref={tagsContainerRef}>
        <Popover open={isPopoverOpen}>
          <TagsListInput
            variant="tag"
            tags={tags}
            maxTags={5}
            onAddTag={() => setIsPopoverOpen(true)}
            onRemoveTag={(id: string) =>
              setTags(tags.filter((tag) => tag.id !== id))
            }
          />
          <PopoverTrigger className="block" />
          <PopoverContent className="w-max" ref={popoverContentRef}>
            <IdentitySearchCombobox
              placeholder="Search for a tag..."
              identities={identityResults}
              onKeyDown={() => {
                // TODO: Search for tags when functionality is available [ENG-2519]
                setIdentityResults(
                  removeSelectedTagsFromSearchResults(FAKE_IDENTITIES),
                )
              }}
              onIdentitySelect={(selection: IdentityPresenter) =>
                setTags([
                  ...tags,
                  { name: selection.display_name, id: selection.id },
                ])
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </Form>
  )
}

export { ExploreSearchInput }
