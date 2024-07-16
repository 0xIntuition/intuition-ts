import React, { useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  TagsListInput,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { SEARCH_IDENTITIES_RESOURCE_ROUTE } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'

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

  const [searchQuery, setSearchQuery] = useState('')

  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = (event.target as HTMLInputElement).value
    setSearchQuery(value)
  }

  const [identities, setIdentities] = useState<IdentityPresenter[]>([])
  const identitiesFetcher = useFetcher<IdentityPresenter[]>()

  useEffect(() => {
    logger('identitiesFetcher.data changed:', identitiesFetcher.data)
    if (identitiesFetcher.data) {
      setIdentities(identitiesFetcher.data)
    }
  }, [identitiesFetcher.data])

  useEffect(() => {
    logger('searchQuery changed:', searchQuery)
    if (searchQuery) {
      const searchParam = `?search=${encodeURIComponent(searchQuery)}`
      identitiesFetcher.load(
        `${SEARCH_IDENTITIES_RESOURCE_ROUTE}${searchParam}`,
      )
    }
  }, [searchQuery, SEARCH_IDENTITIES_RESOURCE_ROUTE])

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
