import * as React from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import { fetchIdentity } from '@lib/utils/fetches'
import { TagType } from 'types/tags'

import {
  isClickOutsideOfTagsInteractionZone,
  isTagAlreadySelected,
} from './ExploreAddTags.utils'

const ExploreAddTags = ({ initialValue }: { initialValue?: string | null }) => {
  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()
  const tagsContainerRef = React.useRef<HTMLDivElement>(null)
  const popoverContentRef = React.useRef<HTMLDivElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([])
  const [formElementValue, setFormElementValue] = React.useState('')

  // TODO: FIX THIS
  React.useEffect(() => {
    async function fetchTagData(id: string) {
      return await fetchIdentity(id)
    }

    if (initialValue) {
      const initialValueArray = initialValue.split(',')
      const initialSelectedTags: TagType[] = []
      initialValueArray?.forEach((id) => {
        fetchTagData(id).then((result) => {
          if (result) {
            initialSelectedTags.push({
              name: result.display_name,
              id: result.id,
            })
          }
        })
      })
      setSelectedTags(initialSelectedTags)
    }
    // Only run this block once on load
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    document.addEventListener('click', (event) => {
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
    })
  })

  React.useEffect(() => {
    const selectedTagIds: string[] = []
    selectedTags.forEach((tag) => selectedTagIds.push(tag.id))
    setFormElementValue(selectedTagIds.toString())
  }, [selectedTags])

  return (
    <div ref={tagsContainerRef}>
      {/* Add hidden input element to feed parent form */}
      <input
        className="hidden"
        type="text"
        name="tags"
        value={formElementValue}
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
          className="w-max border-none bg-transparent pt-1"
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
                  { name: selection.display_name, id: selection.id },
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
