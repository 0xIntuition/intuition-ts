import * as React from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { FAKE_IDENTITIES } from '@lib/utils/fake-data'
import { TagType } from 'types/tags'

import {
  filterSearchResults,
  isClickOutsideOfTagsInteractionZone,
  isTagAlreadySelected,
} from './ExploreAddTags.utils'

const ExploreAddTags = () => {
  const tagsContainerRef = React.useRef(null)
  const popoverContentRef = React.useRef(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([])
  const [identityResults, setIdentityResults] = React.useState<
    IdentityPresenter[]
  >([])
  const [displayResults, setDisplayResults] = React.useState<
    IdentityPresenter[]
  >([])

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

  return (
    <div ref={tagsContainerRef}>
      <Popover open={isPopoverOpen}>
        <TagsListInput
          variant="tag"
          tags={selectedTags}
          maxTags={5}
          onAddTag={() => setIsPopoverOpen(true)}
          onRemoveTag={(id: string) => {
            const updatedTagsList = selectedTags.filter((tag) => tag.id !== id)
            setSelectedTags(updatedTagsList)
            setDisplayResults(
              filterSearchResults(updatedTagsList, identityResults),
            )
          }}
        />
        <PopoverTrigger className="block" />
        <PopoverContent className="w-max border-none" ref={popoverContentRef}>
          <IdentitySearchCombobox
            placeholder="Search for a tag..."
            identities={displayResults}
            onKeyDown={() => {
              // TODO: Search for tags when functionality is available [ENG-2519]
              setIdentityResults(FAKE_IDENTITIES) // keep original results in case a tag is de-selected
              setDisplayResults(
                filterSearchResults(selectedTags, identityResults),
              )
            }}
            onIdentitySelect={(selection: IdentityPresenter) => {
              if (!isTagAlreadySelected(selection, selectedTags)) {
                const updatedTagsList = [
                  ...selectedTags,
                  { name: selection.display_name, id: selection.id },
                ]
                setSelectedTags(updatedTagsList)
                setDisplayResults(
                  filterSearchResults(updatedTagsList, displayResults),
                )
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { ExploreAddTags }
