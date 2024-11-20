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
import { useAtomSearch } from '@lib/hooks/useAtomSearch'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { SEARCH_IDENTITIES_BY_TAGS_RESOURCE_ROUTE } from 'app/consts'
import { IdentityType } from 'app/types'
import { TagType } from 'app/types/tags'

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
  const tagsContainerRef = React.useRef<HTMLDivElement>(null)
  const popoverContentRef = React.useRef<HTMLDivElement>(null)
  const inputElementRef = React.useRef<HTMLInputElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([])

  const selectedAtomIds = selectedTags.map((tag) => tag.id)
  const {
    atoms: identities,
    setSearchQuery,
    handleInput,
  } = useAtomSearch({
    selectedAtomIds,
  })

  const identityTagFetcher = useFetcher<IdentityPresenter[]>()

  logger('initialValue', initialValue)
  React.useEffect(() => {
    if (initialValue) {
      const searchParam = `?tagIds=${encodeURIComponent(initialValue)}`
      identityTagFetcher.load(
        `${SEARCH_IDENTITIES_BY_TAGS_RESOURCE_ROUTE}${searchParam}`,
      )
    }
    // Only run this block once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (identityTagFetcher.data && initialValue) {
      const initialTagNames = initialValue.split(',')
      const tagSet = new Set<string>() // Set to store unique tag IDs
      const initialSelectedTags: TagType[] = identityTagFetcher.data.flatMap(
        (identity) =>
          identity.tags
            ?.filter((tag) => initialTagNames.includes(tag.display_name))
            .map((tag) => ({
              name: tag.display_name,
              id: tag.identity_id,
            }))
            .filter((tag) => {
              if (tagSet.has(tag.id)) {
                return false // Skip if we've already added this tag
              }
              tagSet.add(tag.id)
              return true
            }) ?? [],
      )
      setSelectedTags(initialSelectedTags)
    }
  }, [identityTagFetcher.data, initialValue])

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
            onIdentitySelect={(selection: IdentityType) => {
              if (!isTagAlreadySelected(selection, selectedTags)) {
                setSelectedTags([
                  ...selectedTags,
                  {
                    name: selection.label ?? 'Unknown',
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
