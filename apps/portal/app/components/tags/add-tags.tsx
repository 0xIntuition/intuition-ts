import { useMemo, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'
import { GetAtomQuery } from '@0xintuition/graphql'

import { AtomSearchComboboxExtended } from '@components/atom-search-combobox-extended'
import { InfoTooltip } from '@components/info-tooltip'
import { AddListExistingCta } from '@components/lists/add-list-existing-cta'
import SaveListModal from '@components/save-list/save-list-modal'
import { useCheckClaim } from '@lib/hooks/useCheckClaim'
import useFilteredIdentitySearch from '@lib/hooks/useFilteredIdentitySearch'
import useInvalidItems from '@lib/hooks/useInvalidItems'
import {
  globalCreateIdentityModalAtom,
  saveListModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import { TagLoaderData } from '@routes/resources+/tag'
import { CURRENT_ENV, MULTIVAULT_CONTRACT_ADDRESS } from 'app/consts'
import { TransactionActionType } from 'app/types/transaction'
import { useAtom } from 'jotai'

import { TagsListInputPortal } from './tags-list-input-portal'

interface AddTagsProps {
  selectedTags: GetAtomQuery['atom'][]
  existingTagIds: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  identity: any // TODO: (ENG-4782) temporary type fix until we lock in final types
  userWallet: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddTag: (newTag: any) => void // TODO: (ENG-4782) temporary type fix until we lock in final types
  onRemoveTag: (id: string) => void
  onRemoveInvalidTag: (id: string) => void
  dispatch: (action: TransactionActionType) => void
  subjectVaultId: string
  invalidTags: GetAtomQuery['atom'][]
  setInvalidTags: React.Dispatch<React.SetStateAction<GetAtomQuery['atom'][]>>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedTags = selectedTags?.map((tag) => ({
    name: tag?.label ?? '',
    id: tag?.vault_id ?? '',
    tagCount: 0, // TODO: (ENG-4782) temporary until we have tag count
  }))

  const [, setCreateIdentityModalActive] = useAtom(
    globalCreateIdentityModalAtom,
  )

  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  const [selectedInvalidTag, setSelectedInvalidTag] = useState<
    GetAtomQuery['atom'] | null
  >(null)

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const { setSearchQuery } = useFilteredIdentitySearch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedItems: selectedTags as any[], // TODO: (ENG-4782) temporary type fix until we lock in final types
  })

  const { data: claimCheckData = { result: '0' }, refetch: refetchClaimCheck } =
    useCheckClaim(
      {
        subjectId: subjectVaultId,
        predicateId:
          getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId?.toString(),
        objectId: selectedTags[selectedTags.length - 1]?.vault_id,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        enabled: Boolean(selectedTags[selectedTags.length - 1]?.vault_id),
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    )

  console.log('claimCheckData', claimCheckData)

  const handleIdentitySelect = (atom: GetAtomQuery['atom']) => {
    onAddTag(atom)
    setSearchQuery('')
    refetchClaimCheck()
    setIsPopoverOpen(false)
  }

  const handleSaveClick = (
    invalidTag: GetAtomQuery['atom'] & { tagClaimId: string },
  ) => {
    setSelectedInvalidTag(invalidTag)
    setSaveListModalActive({
      isOpen: true,
      identity: invalidTag
        ? ({
            id: invalidTag?.id ?? '',
            label: invalidTag?.label ?? '',
            image: invalidTag?.image ?? '',
            vault_id: invalidTag?.vault_id,
            assets_sum: '0',
            user_assets: '0',
            contract: MULTIVAULT_CONTRACT_ADDRESS,
            asset_delta: '0',
            conviction_price: '0',
            conviction_price_delta: '0',
            conviction_sum: '0',
            num_positions: 0,
            price: '0',
            price_delta: '0',
            status: 'active',
            total_conviction: '0',
            type: 'user',
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            creator_address: '',
            display_name: invalidTag.label ?? '',
            follow_vault_id: '',
            user: null,
            creator: null,
            identity_hash: '',
            identity_id: '',
            is_contract: false,
            is_user: true,
            pending: false,
            pending_type: null,
            pending_vault_id: null,
          } as unknown as IdentityPresenter)
        : undefined,
      id: invalidTag.tagClaimId,
    })
  }

  const memoizedSelectedTags = useMemo(
    () => selectedTags,
    [JSON.stringify(selectedTags)],
  )

  useInvalidItems<GetAtomQuery['atom']>({
    data: claimCheckData as TagLoaderData,
    selectedItems: memoizedSelectedTags,
    setInvalidItems: setInvalidTags,
    onRemoveItem: onRemoveTag,
    idKey: 'vaultId' as keyof GetAtomQuery['atom'],
    dataIdKey: 'objectId',
  })

  return (
    <div className="flex flex-col min-h-36">
      <div className="mb-3 gap-2">
        <div className="flex flex-row gap-1 items-center">
          <Text variant="body" className="text-primary/70">
            Add tags to this identity
          </Text>
          <InfoTooltip
            title="Add Tags"
            content="Adding Tags to an Identity helps with discoverability for you and others later! Tagging is also how you add Identities to Lists. For example, to add this identity to the [Wallets] List, you would tag it with [Wallet]!

  Behind the scenes, tagging involves creating a Triple with the Predicate [has tag]."
          />
        </div>
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
            <AtomSearchComboboxExtended
              onAtomSelect={handleIdentitySelect}
              onCreateAtomClick={() => setCreateIdentityModalActive(true)}
              placeholder="Search for tags..."
              initialValue=""
              className="w-[600px]"
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
        {invalidTags.filter(Boolean).map((invalidTag) => (
          <AddListExistingCta
            key={invalidTag?.vault_id ?? ''}
            identity={invalidTag}
            variant="tag"
            onSaveClick={() => {
              if (invalidTag && 'tagClaimId' in invalidTag) {
                handleSaveClick(
                  invalidTag as GetAtomQuery['atom'] & { tagClaimId: string },
                )
              }
            }}
            onClose={() => onRemoveInvalidTag(invalidTag?.vault_id ?? '')}
          />
        ))}
      </div>
      {selectedInvalidTag && (
        <SaveListModal
          contract={identity.contract}
          tagAtom={selectedInvalidTag}
          atom={identity}
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
