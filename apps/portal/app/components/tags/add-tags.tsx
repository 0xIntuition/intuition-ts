import React, { useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox, IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { SEARCH_IDENTITIES_RESOURCE_ROUTE } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'


interface AddTagsProps {
  selectedTags?: IdentityPresenter[] | []
  onAddTag?: (newTag: IdentityPresenter) => void
  onRemoveTag?: (id: string) => void
}

export function AddTags({ selectedTags, onAddTag, onRemoveTag }: AddTagsProps) {
  const formattedTags = selectedTags?.map((tag) => ({
    name: tag.display_name,
    id: tag.vault_id,
  }))

  const { searchQuery, setSearchQuery, identities, handleInput } = useIdentityServerSearch()


  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <div className="mb-8 gap-1">
            <Text variant="body" className="text-primary/70">
              Add tags to this identity
            </Text>
            <Text variant="caption" className="text-primary/50">
              Select up to 5 tags to add to this identity.
            </Text>
          </div>
        </PopoverTrigger>
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
      {/* <TagsListInput
        variant="tag"
        tags={formattedTags}
        maxTags={5}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      /> */}
    </div>
  )
}
