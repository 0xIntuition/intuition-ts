import { IdentityPresenter } from '@0xintuition/api'

import { TagType } from 'types/tags'

export const isClickOutsideOfTagsInteractionZone = (
  tagsContainerRef: React.MutableRefObject<null>,
  popoverContentRef: React.MutableRefObject<null>,
  target: EventTarget | null,
) =>
  tagsContainerRef.current &&
  // @ts-ignore - ref current value incorrectly being thought of as type 'never'
  !tagsContainerRef.current.contains(target) &&
  popoverContentRef.current &&
  // @ts-ignore - ref current value incorrectly being thought of as type 'never'
  !popoverContentRef.current.contains(target)

export const isTagAlreadySelected = (
  selection: IdentityPresenter,
  selectedTags: TagType[],
) => selectedTags.filter((tag) => tag.id === selection.id).length > 0

export const filterSearchResults = (
  selectedTags: TagType[],
  results: IdentityPresenter[],
) =>
  results.filter((result) => !selectedTags.some((tag) => tag.id === result.id))
