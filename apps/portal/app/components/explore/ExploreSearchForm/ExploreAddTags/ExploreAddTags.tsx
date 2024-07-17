import * as React from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
} from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn, SortDirection } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { fetchIdentities, fetchIdentity } from '@lib/utils/fetches'
import { TagType } from 'types/tags'

import {
  filterSearchResults,
  isClickOutsideOfTagsInteractionZone,
  isTagAlreadySelected,
} from './ExploreAddTags.utils'

const ExploreAddTags = ({ initialValue }: { initialValue?: string | null }) => {
  const tagsContainerRef = React.useRef<HTMLDivElement>(null)
  const popoverContentRef = React.useRef<HTMLDivElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([])
  const [identityResults, setIdentityResults] = React.useState<
    IdentityPresenter[]
  >([])
  const [displayResults, setDisplayResults] = React.useState<
    IdentityPresenter[]
  >([])
  const [formElementValue, setFormElementValue] = React.useState('')

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
    // Only run this block once on load
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    const selectedTagIds: string[] = []
    selectedTags.forEach((tag) => selectedTagIds.push(tag.id))
    setFormElementValue(selectedTagIds.toString())
  }, [selectedTags])

  const handleTagSelectionChange = (
    selectedTags: TagType[],
    results: IdentityPresenter[],
  ) => {
    setSelectedTags(selectedTags)
    setDisplayResults(filterSearchResults(selectedTags, results))
  }

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
          onRemoveTag={(id: string) => {
            const updatedTagsList = selectedTags.filter((tag) => tag.id !== id)
            handleTagSelectionChange(updatedTagsList, identityResults)
          }}
        />
        <PopoverTrigger className="block" />
        <PopoverContent
          className="w-max border-none bg-transparent pt-1"
          ref={popoverContentRef}
        >
          <IdentitySearchCombobox
            placeholder="Search for a tag..."
            identities={displayResults}
            onKeyDown={async (event) => {
              const target = event.target as HTMLInputElement
              // TODO: Update logic when functionality is available [ENG-2519]
              const searchResults = await fetchIdentities(
                undefined,
                20, // TODO: Determine appropriate results limit [ENG-2519]
                SortColumn.DISPLAY_NAME,
                SortDirection.ASC,
                target.value,
              )
              if (searchResults?.data) {
                // keep original results in case a tag is de-selected
                setIdentityResults(searchResults.data)
                setDisplayResults(
                  filterSearchResults(selectedTags, identityResults),
                )
              }
            }}
            onIdentitySelect={(selection: IdentityPresenter) => {
              if (!isTagAlreadySelected(selection, selectedTags)) {
                const updatedTagsList = [
                  ...selectedTags,
                  { name: selection.display_name, id: selection.id },
                ]
                handleTagSelectionChange(updatedTagsList, displayResults)
              }
              // TODO: Determine whether we should be launching a toast should this hit an else [ENG-2519]
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { ExploreAddTags }
