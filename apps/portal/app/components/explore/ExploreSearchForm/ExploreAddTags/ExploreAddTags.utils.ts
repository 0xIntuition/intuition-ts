import { IdentityPresenter } from '@0xintuition/api'

import { TagType } from 'app/types/tags'

export const isClickOutsideOfTagsInteractionZone = (
  tagsContainerRef: React.RefObject<HTMLDivElement>,
  popoverContentRef: React.RefObject<HTMLDivElement>,
  target: EventTarget | null,
) =>
  !tagsContainerRef.current?.contains(target as Node) &&
  !popoverContentRef.current?.contains(target as Node)

export const isTagAlreadySelected = (
  selection: IdentityPresenter,
  selectedTags: TagType[],
) => selectedTags.filter((tag) => tag.id === selection.id).length > 0
