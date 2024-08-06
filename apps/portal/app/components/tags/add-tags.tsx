import { useEffect, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { AddListExistingCta } from '@components/list/add-list-existing-cta'
import SaveListModal from '@components/list/save-list-modal'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import { createIdentityModalAtom, saveListModalAtom } from '@lib/state/store'
import { useFetcher } from '@remix-run/react'
import { TagLoaderData } from '@routes/resources+/tag'
import { TAG_PREDICATE_VAULT_ID_TESTNET, TAG_RESOURCE_ROUTE } from 'consts'
import { useAtom } from 'jotai'
import { TransactionActionType } from 'types/transaction'

import { TagsListInputPortal } from './tags-list-input-portal'

interface AddTagsProps {
  selectedTags: IdentityPresenter[]
  existingTagIds: string[]
  identity: IdentityPresenter
  userWallet: string
  onAddTag: (newTag: IdentityPresenter) => void
  onRemoveTag: (id: string) => void
  onRemoveInvalidTag: (id: string) => void
  dispatch: (action: TransactionActionType) => void
  subjectVaultId: string
  invalidTags: IdentityPresenter[]
  setInvalidTags: React.Dispatch<React.SetStateAction<IdentityPresenter[]>>
}

export function AddTags({
  selectedTags,
  identity,
  userWallet,
  onAddTag,
  onRemoveTag,
  onRemoveInvalidTag,
  subjectVaultId,
  invalidTags,
  setInvalidTags,
}: AddTagsProps) {
  const formattedTags = selectedTags?.map((tag) => ({
    name: tag.display_name,
    id: tag.vault_id,
  }))

  const [, setCreateIdentityModalActive] = useAtom(createIdentityModalAtom)

  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  const [selectedInvalidTag, setSelectedInvalidTag] =
    useState<IdentityPresenter | null>(null)

  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const filteredIdentities = identities.filter(
    (identity) =>
      !selectedTags.some((tag) => tag.vault_id === identity.vault_id),
  )

  const tagFetcher = useFetcher<TagLoaderData>()

  const handleIdentitySelect = (identity: IdentityPresenter) => {
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

  const handleSaveClick = (invalidTag: IdentityPresenter) => {
    setSelectedInvalidTag(invalidTag)
    setSaveListModalActive({
      isOpen: true,
      identity: invalidTag,
    })
  }

  useEffect(() => {
    if (tagFetcher.state === 'idle' && tagFetcher.data !== undefined) {
      const result = tagFetcher.data.result
      const objectId = tagFetcher.data?.objectId

      if (result === '0') {
        setInvalidTags((prev) =>
          prev.filter((tag) => tag.vault_id !== objectId),
        )
      } else if (objectId) {
        const tagToAdd = selectedTags.find((tag) => tag.vault_id === objectId)
        if (tagToAdd) {
          setInvalidTags((prev) => {
            if (prev.some((tag) => tag.vault_id === objectId)) {
              return prev
            }
            return [...prev, tagToAdd]
          })
          onRemoveTag(objectId)
        }
      }
    }
  }, [
    tagFetcher.state,
    tagFetcher.data,
    setInvalidTags,
    selectedTags,
    onRemoveTag,
  ])

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
      <div className="mt-4 max-h-60 overflow-y-auto pr-4">
        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={true}
        >
          <PopoverContent className="bg-transparent border-none">
            <IdentitySearchCombobox
              onCreateIdentityClick={() => setCreateIdentityModalActive(true)}
              identities={filteredIdentities}
              onIdentitySelect={handleIdentitySelect}
              onValueChange={setSearchQuery}
              onInput={handleInput}
              shouldFilter={false}
            />
          </PopoverContent>
          <div className="mb-8">
            <TagsListInputPortal
              variant="tag"
              tags={formattedTags}
              maxTags={5}
              onAddTag={() => setIsPopoverOpen(true)}
              onRemoveTag={onRemoveTag}
              PopoverTriggerComponent={PopoverTrigger}
            />
          </div>
        </Popover>
        {invalidTags.map((invalidTag) => (
          <AddListExistingCta
            key={invalidTag.vault_id}
            identity={invalidTag}
            variant="tag"
            onSaveClick={() => handleSaveClick(invalidTag)}
            onClose={() => onRemoveInvalidTag(invalidTag.vault_id)}
          />
        ))}
      </div>
      {selectedInvalidTag && (
        <SaveListModal
          tag={selectedInvalidTag}
          identity={identity}
          contract={identity.contract}
          userWallet={userWallet}
          open={saveListModalActive.isOpen}
          onClose={() => {
            setSaveListModalActive({
              isOpen: false,
              invalidIdentity: null,
            })
            setSelectedInvalidTag(null)
          }}
        />
      )}
    </div>
  )
}
