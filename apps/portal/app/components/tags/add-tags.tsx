import { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import logger from '@lib/utils/logger'

import { TagsListInputPortal } from './tags-list-input-portal'

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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const filteredIdentities = identities.filter(
    (identity) =>
      !selectedTags.some((tag) => tag.vault_id === identity.vault_id),
  )

  const testIdentityTags = [
    'QmNrF6pE3RNXwFNbBCmvJMBBGKbe1yhK1E6YRPsAU23saj',
    'QmVfxo1di6CsaJaVGodnUS6gcGPLahYowHwA6UEUiRqG5v',
    'QmZndE239C65EhKXpX1funQH5XGaMSpaX9cwWC7DA2kBnY',
  ]

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
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverContent className="bg-transparent border-none">
          <IdentitySearchCombobox
            identities={filteredIdentities}
            existingIdentityIds={testIdentityTags}
            onIdentitySelect={(identity) => {
              logger('tag', identity)
              onAddTag(identity)
            }}
            onValueChange={setSearchQuery}
            onInput={handleInput}
            shouldFilter={false}
          />
        </PopoverContent>
        <TagsListInputPortal
          variant="tag"
          tags={formattedTags}
          maxTags={5}
          onAddTag={() => setIsPopoverOpen(true)}
          onRemoveTag={onRemoveTag}
          PopoverTriggerComponent={PopoverTrigger}
        />
      </Popover>
    </div>
  )
}
