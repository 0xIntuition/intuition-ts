import { IdentityPresenter } from '@0xintuition/api'

import { TagType } from 'types/tags'

export const isClickOutsideOfTagsInteractionZone = (
  tagsContainerRef: React.RefObject<HTMLDivElement>,
  popoverContentRef: React.RefObject<HTMLDivElement>,
  target: EventTarget | null,
) =>
  target &&
  tagsContainerRef.current &&
  !tagsContainerRef.current.contains(target as Node) &&
  popoverContentRef.current &&
  !popoverContentRef.current.contains(target as Node)

export const isTagAlreadySelected = (
  selection: IdentityPresenter,
  selectedTags: TagType[],
) => selectedTags.filter((tag) => tag.id === selection.id).length > 0

export const filterSearchResults = (
  selectedTags: TagType[],
  results: IdentityPresenter[],
) =>
  results.filter((result) => !selectedTags.some((tag) => tag.id === result.id))
