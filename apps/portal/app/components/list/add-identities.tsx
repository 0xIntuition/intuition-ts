import { useEffect, useState } from 'react'

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

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import { createIdentityModalAtom, saveListModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { TagLoaderData } from '@routes/resources+/tag'
import { TAG_PREDICATE_VAULT_ID_TESTNET, TAG_RESOURCE_ROUTE } from 'consts'
import { useAtom } from 'jotai'

import { AddListExistingCta } from './add-list-existing-cta'
import SaveListModal from './save-list-modal'

interface AddIdentitiesProps {
  objectVaultId: string
  identity: IdentityPresenter
  userWallet: string
  selectedIdentities: IdentityPresenter[]
  onAddIdentity: (newTag: IdentityPresenter) => void
  onRemoveIdentity: (id: string) => void
  onRemoveInvalidIdentity: (id: string) => void
  maxIdentitiesToAdd: number
  invalidIdentities: IdentityPresenter[]
  setInvalidIdentities: React.Dispatch<
    React.SetStateAction<IdentityPresenter[]>
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
  const [, setCreateIdentityModalActive] = useAtom(createIdentityModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const [selectedInvalidIdentity, setSelectedInvalidIdentity] =
    useState<IdentityPresenter | null>(null)

  const filteredIdentities = identities.filter(
    (identity) =>
      !selectedIdentities.some(
        (identityToAdd) => identityToAdd.vault_id === identity.vault_id,
      ),
  )

  const tagFetcher = useFetcher<TagLoaderData>()

  const handleIdentitySelect = (identity: IdentityPresenter) => {
    logger('selected identity', identity)
    onAddIdentity(identity)
    setSearchQuery('')
    setIsPopoverOpen(false)

    const searchParams = new URLSearchParams({
      subjectId: identity.vault_id,
      predicateId: TAG_PREDICATE_VAULT_ID_TESTNET.toString(),
      objectId: objectVaultId,
    })

    const finalUrl = `${TAG_RESOURCE_ROUTE}?${searchParams.toString()}`

    tagFetcher.load(finalUrl)
  }

  const handleSaveClick = (invalidIdentity: IdentityPresenter) => {
    setSelectedInvalidIdentity(invalidIdentity)
    setSaveListModalActive({
      isOpen: true,
      identity: invalidIdentity,
    })
  }

  useEffect(() => {
    if (tagFetcher.state === 'idle' && tagFetcher.data !== undefined) {
      const result = tagFetcher.data.result
      const subjectId = tagFetcher.data?.subjectId

      if (result === '0') {
        setInvalidIdentities((prev) =>
          prev.filter((identity) => identity.vault_id !== subjectId),
        )
      } else if (subjectId) {
        const identityToAdd = selectedIdentities.find(
          (identity) => identity.vault_id === subjectId,
        )
        if (identityToAdd) {
          setInvalidIdentities((prev) => {
            if (prev.some((identity) => identity.vault_id === subjectId)) {
              return prev
            }
            return [...prev, identityToAdd]
          })
        }
      }
    }
  }, [
    tagFetcher.state,
    tagFetcher.data,
    setInvalidIdentities,
    selectedIdentities,
  ])

  const validIdentities = selectedIdentities.filter(
    (identity) =>
      !invalidIdentities.some(
        (invalid) => invalid.vault_id === identity.vault_id,
      ),
  )

  return (
    <div className="flex flex-col min-h-36">
      <div className="mb-3 gap-2">
        <Text variant="body" className="text-primary/70">
          Add identities to list
        </Text>
        <Text variant="caption" className="text-primary/50">
          Select up to 5 identities to add to this list.
        </Text>
      </div>
      <Separator />
      <div className="mt-4 max-h-72 overflow-y-auto pr-4">
        {validIdentities.map((identity, index) => (
          <div
            className="flex items-center justify-between gap-2.5 mb-4"
            key={identity.id}
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
                imgSrc={identity.image ?? ''}
              >
                <Trunctacular value={identity.display_name} />
              </IdentityTag>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveIdentity(identity.vault_id)}
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
                <IdentitySearchCombobox
                  onCreateIdentityClick={() =>
                    setCreateIdentityModalActive(true)
                  }
                  identities={filteredIdentities}
                  onIdentitySelect={handleIdentitySelect}
                  onValueChange={setSearchQuery}
                  onInput={handleInput}
                  shouldFilter={false}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        {invalidIdentities.map((invalidIdentity) => (
          <AddListExistingCta
            key={invalidIdentity.vault_id}
            identity={invalidIdentity}
            message="This identity already exists in this list."
            onSaveClick={() => handleSaveClick(invalidIdentity)}
            onClose={() => onRemoveInvalidIdentity(invalidIdentity.vault_id)}
          />
        ))}
      </div>
      {selectedInvalidIdentity && (
        <SaveListModal
          tag={identity}
          identity={selectedInvalidIdentity}
          contract={identity.contract}
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
