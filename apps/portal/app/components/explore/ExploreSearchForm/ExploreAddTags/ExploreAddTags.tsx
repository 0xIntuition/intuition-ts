import * as React from 'react'

import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import { useFetcher } from '@remix-run/react'
import { GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE } from 'consts'
import { TagType } from 'types/tags'

import {
  isClickOutsideOfTagsInteractionZone,
  isTagAlreadySelected,
} from './ExploreAddTags.utils'

const ExploreAddTags = ({
  inputId,
  initialValue,
}: {
  inputId: string
  initialValue?: string | null
}) => {
  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()
  const identityFetcher = useFetcher<IdentityPresenter[]>()
  const tagsContainerRef = React.useRef<HTMLDivElement>(null)
  const popoverContentRef = React.useRef<HTMLDivElement>(null)
  const inputElementRef = React.useRef<HTMLInputElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([])

  React.useEffect(() => {
    if (initialValue) {
      const searchParam = `?id=${encodeURIComponent(initialValue)}`
      identityFetcher.load(
        `${GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE}${searchParam}`,
      )
    }
    // Only run this block once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const initialSelectedTags: TagType[] = []
    const result = identityFetcher.data
    result?.forEach((result) =>
      initialSelectedTags.push({
        name: result.display_name,
        id: result.id,
      }),
    )
    setSelectedTags(initialSelectedTags)
  }, [identityFetcher.data])

  React.useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      if (
        isPopoverOpen &&
        isClickOutsideOfTagsInteractionZone(
          tagsContainerRef,
          popoverContentRef,
          event.target,
        )
      ) {
        setIsPopoverOpen(false)
      }
    }
    document.addEventListener('click', handleClickEvent)
    return () => window.removeEventListener('click', handleClickEvent)
  })

  React.useEffect(() => {
    const selectedTagIds: string[] = []
    selectedTags.forEach((tag) => selectedTagIds.push(tag.name))
    // trigger input value change and onChange event to update parent form
    inputElementRef.current?.setAttribute('value', selectedTagIds.toString())
    const event = new Event('input', { bubbles: true })
    inputElementRef.current?.dispatchEvent(event)
  }, [selectedTags])

  return (
    <div ref={tagsContainerRef}>
      {/* Add hidden input element to feed parent form */}
      <Input
        ref={inputElementRef}
        className="hidden"
        type="text"
        name={inputId}
      />
      <Popover open={isPopoverOpen}>
        <TagsListInput
          variant="tag"
          tags={selectedTags}
          maxTags={5}
          onAddTag={() => setIsPopoverOpen(true)}
          onRemoveTag={(id: string) =>
            setSelectedTags(selectedTags.filter((tag) => tag.id !== id))
          }
        />
        <PopoverTrigger className="block" />
        <PopoverContent
          className="w-max border-none bg-transparent pt-1 max-md:w-[50%]"
          ref={popoverContentRef}
        >
          <IdentitySearchCombobox
            placeholder="Search for a tag..."
            identities={identities.filter(
              (identity) => !selectedTags.some((tag) => tag.id === identity.id),
            )}
            onIdentitySelect={(selection: IdentityPresenter) => {
              if (!isTagAlreadySelected(selection, selectedTags)) {
                setSelectedTags([
                  ...selectedTags,
                  {
                    name: selection.display_name,
                    id: selection.id,
                  },
                ])
              }
            }}
            onValueChange={setSearchQuery}
            onInput={handleInput}
            shouldFilter={false}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { ExploreAddTags }
