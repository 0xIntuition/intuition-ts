import * as React from 'react'

import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
} from '@0xintuition/1ui'
import { GetAtomQuery } from '@0xintuition/graphql'

import { AtomSearchComboboxExtended } from '@components/atom-search-combobox-extended'
import { globalCreateIdentityModalAtom } from '@lib/state/store'
import { useAtom } from 'jotai'

import { isClickOutsideOfTagsInteractionZone } from './ExploreAddTags.utils'

interface TagType {
  name: string
  id: string
}

const ExploreAddTags = ({ inputId }: { inputId: string }) => {
  const tagsContainerRef = React.useRef<HTMLDivElement>(null)
  const popoverContentRef = React.useRef<HTMLDivElement>(null)
  const inputElementRef = React.useRef<HTMLInputElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([])

  const [, setCreateIdentityModalActive] = useAtom(
    globalCreateIdentityModalAtom,
  )

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
    const selectedTagNames = selectedTags.map((tag) => tag.name)
    inputElementRef.current?.setAttribute('value', selectedTagNames.toString())
    const event = new Event('input', { bubbles: true })
    inputElementRef.current?.dispatchEvent(event)
  }, [selectedTags])

  const handleTagSelection = (atom: GetAtomQuery['atom']) => {
    const newTag = {
      name: atom?.label ?? '',
      id: atom?.id ?? '',
    }
    if (!selectedTags.some((tag) => tag.name === newTag.name)) {
      setSelectedTags((prev) => [...prev, newTag])
    }
    setIsPopoverOpen(false)
  }

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
          <AtomSearchComboboxExtended
            onAtomSelect={handleTagSelection}
            onCreateAtomClick={() => setCreateIdentityModalActive(true)}
            placeholder="Search for tags..."
            initialValue=""
            className="w-[600px]"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { ExploreAddTags }
