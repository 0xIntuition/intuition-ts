import { TAG_PREDICATE_VAULT_ID_TESTNET, TAG_RESOURCE_ROUTE } from 'constants'
import { useEffect, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import ErrorList from '@components/error-list'
import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import { createIdentityModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { TagLoaderData } from '@routes/resources+/tag'
import { useAtom } from 'jotai'
import { TransactionActionType } from 'types/transaction'

import { TagsListInputPortal } from './tags-list-input-portal'

interface AddTagsProps {
  selectedTags: IdentityPresenter[]
  existingTagIds: string[]
  onAddTag: (newTag: IdentityPresenter) => void
  onRemoveTag: (id: string) => void
  dispatch: (action: TransactionActionType) => void
  subjectVaultId: string
  invalidTags: string[]
  setInvalidTags: React.Dispatch<React.SetStateAction<string[]>>
}

export function AddTags({
  selectedTags,
  existingTagIds,
  onAddTag,
  onRemoveTag,
  subjectVaultId,
  invalidTags,
  setInvalidTags,
}: AddTagsProps) {
  const formattedTags = selectedTags?.map((tag) => ({
    name: tag.display_name,
    id: tag.vault_id,
  }))

  const [, setCreateIdentityModalActive] = useAtom(createIdentityModalAtom)

  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const filteredIdentities = identities.filter(
    (identity) =>
      !selectedTags.some((tag) => tag.vault_id === identity.vault_id),
  )

  const tagFetcher = useFetcher<TagLoaderData>()

  const handleIdentitySelect = (identity: IdentityPresenter) => {
    logger('tag', identity)
    onAddTag(identity)
    setSearchQuery('')

    const searchParams = new URLSearchParams({
      subjectId: subjectVaultId,
      predicateId: TAG_PREDICATE_VAULT_ID_TESTNET.toString(),
      objectId: identity.vault_id,
    })

    const finalUrl = `${TAG_RESOURCE_ROUTE}?${searchParams.toString()}`

    tagFetcher.load(finalUrl)
  }

  useEffect(() => {
    if (tagFetcher.state === 'idle' && tagFetcher.data !== undefined) {
      const result = tagFetcher.data.result
      if (result === '0') {
        logger('in fetcher: valid')

        setInvalidTags((prev) =>
          prev.filter((id) => id !== tagFetcher?.data?.objectId),
        )
      } else {
        logger('in fetcher: invalid')
        setInvalidTags((prev) => {
          const objectId = tagFetcher?.data?.objectId
          return objectId ? [...prev, objectId] : prev
        })
      }
    }
  }, [tagFetcher.state, tagFetcher.data, setInvalidTags])

  return (
    <div className="flex flex-col min-h-36">
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
            onCreateIdentityClick={() => setCreateIdentityModalActive(true)}
            identities={filteredIdentities}
            existingIdentityIds={existingTagIds}
            onIdentitySelect={handleIdentitySelect}
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
          invalidTags={invalidTags}
        />
      </Popover>
      {invalidTags.length !== 0 && (
        <div className="mt-4">
          <ErrorList
            errors={['Selected tag(s) already exist on this identity.']}
          />
        </div>
      )}
    </div>
  )
}
