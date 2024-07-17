import { IdentityPresenter } from '@0xintuition/api'

import { TagType } from 'types/tags'

export const isClickOutsideOfTagsInteractionZone = (
  tagsContainerRef: React.RefObject<HTMLDivElement>,
  popoverContentRef: React.RefObject<HTMLDivElement>,
  target: EventTarget | null,
) => {
  console.log(!tagsContainerRef.current?.contains(target as Node))
  console.log(!popoverContentRef.current?.contains(target as Node))
  return (
    !tagsContainerRef.current?.contains(target as Node) &&
    !popoverContentRef.current?.contains(target as Node)
  )
}

export const isTagAlreadySelected = (
  selection: IdentityPresenter,
  selectedTags: TagType[],
) => selectedTags.filter((tag) => tag.id === selection.id).length > 0
