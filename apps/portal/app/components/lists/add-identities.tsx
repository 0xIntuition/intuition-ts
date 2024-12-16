import { useEffect, useMemo, useState } from 'react'

import {
  Button,
  Icon,
  Identity,
  IdentityTag,
  IdentityTagSize,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'
import { GetAtomQuery } from '@0xintuition/graphql'

import { AtomSearchComboboxExtended } from '@components/atom-search-combobox-extended'
import { InfoTooltip } from '@components/info-tooltip'
import SaveListModal from '@components/save-list/save-list-modal'
import { useCheckClaim } from '@lib/hooks/useCheckClaim'
import useFilteredIdentitySearch from '@lib/hooks/useFilteredIdentitySearch'
import useInvalidItems from '@lib/hooks/useInvalidItems'
import {
  globalCreateIdentityModalAtom,
  saveListModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { identityToAtom } from '@lib/utils/misc'
import { TagLoaderData } from '@routes/resources+/tag'
import { CURRENT_ENV, MULTIVAULT_CONTRACT_ADDRESS } from 'app/consts'
import { useAtom } from 'jotai'

import { AddListExistingCta } from './add-list-existing-cta'

interface AddIdentitiesProps {
  objectVaultId: string
  identity: IdentityPresenter
  userWallet: string
  selectedIdentities: GetAtomQuery['atom'][]
  onAddIdentity: (newIdentity: GetAtomQuery['atom']) => void
  onRemoveIdentity: (id: string) => void
  onRemoveInvalidIdentity: (id: string) => void
  maxIdentitiesToAdd: number
  invalidIdentities: GetAtomQuery['atom'][]
  setInvalidIdentities: React.Dispatch<
    React.SetStateAction<GetAtomQuery['atom'][]>
  >
}

export function AddIdentities({
  objectVaultId,
  identity,
  userWallet,
  selectedIdentities,
  onAddIdentity,
  onRemoveIdentity,
  onRemoveInvalidIdentity,
  maxIdentitiesToAdd,
  invalidIdentities,
  setInvalidIdentities,
}: AddIdentitiesProps) {
  const [, setCreateIdentityModalActive] = useAtom(
    globalCreateIdentityModalAtom,
  )
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  const { setSearchQuery } = useFilteredIdentitySearch({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedItems: selectedIdentities as any[], // TODO: (ENG-4782) temporary type fix until we lock in final types
  })

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const [selectedInvalidIdentity, setSelectedInvalidIdentity] = useState<
    GetAtomQuery['atom'] | null
  >(null)

  const { data: claimCheckData = { result: '0' }, refetch: refetchClaimCheck } =
    useCheckClaim(
      {
        subjectId: selectedIdentities[selectedIdentities.length - 1]?.vault_id,
        predicateId:
          getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId?.toString(),
        objectId: objectVaultId,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        enabled: Boolean(
          selectedIdentities[selectedIdentities.length - 1]?.vault_id,
        ),
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    )

  logger('claimCheckData', claimCheckData)

  const handleIdentitySelect = (atom: GetAtomQuery['atom']) => {
    onAddIdentity(atom)
    setSearchQuery('')
    refetchClaimCheck()
    setIsPopoverOpen(false)
  }

  const handleSaveClick = (
    invalidIdentity: GetAtomQuery['atom'] & { tagClaimId: string },
  ) => {
    setSelectedInvalidIdentity(invalidIdentity)
    setSaveListModalActive({
      isOpen: true,
      identity: invalidIdentity
        ? ({
            id: invalidIdentity?.id ?? '',
            label: invalidIdentity?.label ?? '',
            image: invalidIdentity?.image ?? '',
            vault_id: invalidIdentity?.vault_id,
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
            display_name: invalidIdentity.label ?? '',
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
      id: invalidIdentity.tagClaimId,
    })
  }

  const memoizedSelectedIdentities = useMemo(
    () => selectedIdentities,
    [JSON.stringify(selectedIdentities)],
  )

  logger('claimCheckData in AddIdentities', {
    data: claimCheckData,
    selectedItems: memoizedSelectedIdentities,
  })

  useInvalidItems<GetAtomQuery['atom']>({
    data: claimCheckData as TagLoaderData,
    selectedItems: memoizedSelectedIdentities,
    setInvalidItems: setInvalidIdentities,
    onRemoveItem: onRemoveIdentity,
    idKey: 'vaultId' as keyof GetAtomQuery['atom'],
    dataIdKey: 'subjectId',
  })

  useEffect(() => {
    logger('invalidIdentities changed', invalidIdentities)
  }, [invalidIdentities])

  const validIdentities = selectedIdentities.filter(
    (identity) =>
      !invalidIdentities.some(
        (invalid) => invalid?.vault_id === identity?.vault_id,
      ),
  )

  return (
    <div className="flex flex-col min-h-36">
      <div className="mb-3 gap-2">
        <div className="flex flex-row gap-1">
          <Text variant="body" className="text-primary/70">
            Tag Identities to add them to the List
          </Text>
          <InfoTooltip
            title="Add to List"
            content="Adding Identities to a List is performed by 'Tagging' Identities. You can think of 'Tagging' like hashtags on a Web2 platform, or a note-taking app like Roam Research. You can tag Identities to add them to Lists as you explore Intuition, or you can do it easily here!' For example, to add things to a [Wallet] list, you would tag them with [Wallet]!"
          />
        </div>
        <Text variant="caption" className="text-primary/50">
          Select up to 5 identities to add to this list.
        </Text>
      </div>
      <Separator />
      <div className="mt-4 max-h-72 overflow-y-auto pr-4">
        {validIdentities.map((identity, index) => (
          <div
            className="flex items-center justify-between gap-2.5 mb-4"
            key={identity?.id}
          >
            <div className="flex items-center gap-3 flex-1">
              <Text
                variant="body"
                weight="medium"
                className="text-secondary-foreground/30 w-2"
              >
                {index + 1}.
              </Text>

              <IdentityTag
                size={IdentityTagSize.md}
                variant={Identity.nonUser}
                imgSrc={identity?.image ?? ''}
              >
                <Trunctacular
                  value={identity?.label ?? ''}
                  maxStringLength={42}
                />
              </IdentityTag>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveIdentity(identity?.vault_id ?? '')}
              className="border-none"
            >
              <Icon name="cross-large" className="h-3 w-4" />
            </Button>
          </div>
        ))}
        {validIdentities.length < maxIdentitiesToAdd && (
          <div className="flex flex-row items-center gap-3 mb-8">
            <Text
              variant="body"
              weight="medium"
              className="text-secondary-foreground/30 w-2"
            >
              {validIdentities.length + 1}.
            </Text>
            <Popover
              open={isPopoverOpen}
              onOpenChange={setIsPopoverOpen}
              modal={true}
            >
              <PopoverTrigger asChild>
                <Button variant="secondary">
                  <Icon name="plus-small" />
                  Select Identity
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-transparent border-0 w-max p-0">
                <AtomSearchComboboxExtended
                  onAtomSelect={handleIdentitySelect}
                  onCreateAtomClick={() => setCreateIdentityModalActive(true)}
                  placeholder="Search for identities..."
                  initialValue=""
                  className="w-[600px]"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        {invalidIdentities.map((invalidIdentity) => (
          <AddListExistingCta
            key={invalidIdentity?.vault_id}
            identity={invalidIdentity}
            variant="identity"
            onSaveClick={() => {
              if (invalidIdentity && 'tagClaimId' in invalidIdentity) {
                handleSaveClick(
                  invalidIdentity as GetAtomQuery['atom'] & {
                    tagClaimId: string
                  },
                )
              }
            }}
            onClose={() => onRemoveInvalidIdentity(invalidIdentity?.vault_id)}
          />
        ))}
      </div>
      {selectedInvalidIdentity && (
        <SaveListModal
          contract={identity.contract}
          tagAtom={identityToAtom(identity) as unknown as GetAtomQuery['atom']}
          atom={selectedInvalidIdentity as unknown as GetAtomQuery['atom']}
          userWallet={userWallet}
          open={saveListModalActive.isOpen}
          onClose={() => {
            setSaveListModalActive({
              isOpen: false,
              invalidIdentity: null,
            })
            setSelectedInvalidIdentity(null)
          }}
        />
      )}
    </div>
  )
}
