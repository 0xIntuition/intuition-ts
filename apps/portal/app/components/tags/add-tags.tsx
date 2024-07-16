import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import logger from '@lib/utils/logger'

interface AddTagsProps {
  selectedTags: IdentityPresenter[]
  onAddTag: (newTag: IdentityPresenter) => void
  onRemoveTag: (id: string) => void
}

export function AddTags({ selectedTags, onAddTag, onRemoveTag }: AddTagsProps) {
  const formattedTags = selectedTags?.map((tag) => ({
    name: tag.display_name,
    id: tag.vault_id,
  }))

  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()

  const handleAddTag = (newTag: IdentityPresenter) => {
    setTags((prevTags) => [...prevTags, newTag])
    if (onAddTag) onAddTag(newTag)
  }

  const handleRemoveTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.vault_id !== id))
    if (onRemoveTag) onRemoveTag(id)
  }

  return (
    <div className="flex flex-col">
      <div className="mb-8 gap-1">
        <Text variant="body" className="text-primary/70">
          Add tags to this identity
        </Text>
        <Text variant="caption" className="text-primary/50">
          Select up to 5 tags to add to this identity.
        </Text>
      </div>
      s
      <Popover>
        <PopoverTrigger asChild></PopoverTrigger>
        <PopoverContent
          className="bg-transparent border-none"
          side="bottom"
          align="center"
          sideOffset={5}
        >
          <IdentitySearchCombobox
            identities={identities}
            onIdentitySelect={(identity) => logger('tag', identity)}
            onValueChange={setSearchQuery}
            onInput={handleInput}
            shouldFilter={false}
          />
        </PopoverContent>
      </Popover>
      <TagsListInput
        variant="tag"
        tags={formattedTags}
        maxTags={5}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />
    </div>
  )
}
