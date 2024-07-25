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

import ErrorList from '@components/error-list'
// import ErrorList from '@components/error-list'
import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import { createIdentityModalAtom } from '@lib/state/store'
// import {
//   TAG_PREDICATE_VAULT_ID_TESTNET,
//   TAG_RESOURCE_ROUTE,
// } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { TagLoaderData } from '@routes/resources+/tag'
import { TAG_PREDICATE_VAULT_ID_TESTNET, TAG_RESOURCE_ROUTE } from 'consts'
// import { useFetcher } from '@remix-run/react'
// import { TagLoaderData } from '@routes/resources+/tag'
import { useAtom } from 'jotai'
import { TransactionActionType } from 'types/transaction'

// import { TransactionActionType } from 'types/transaction'

interface AddIdentitiesProps {
  objectVaultId: string
  selectedIdentities: IdentityPresenter[]
  // existingTagIds: string[]
  onAddIdentity: (newTag: IdentityPresenter) => void
  onRemoveIdentity: (id: string) => void
  maxIdentitiesToAdd: number
  // subjectVaultId: string
  invalidIdentities: string[]
  setInvalidIdentities: React.Dispatch<React.SetStateAction<string[]>>
}

export function AddIdentities({
  objectVaultId,
  selectedIdentities,
  onAddIdentity,
  onRemoveIdentity,
  maxIdentitiesToAdd,
  invalidIdentities,
  setInvalidIdentities,
}: AddIdentitiesProps) {
  const [, setCreateIdentityModalActive] = useAtom(createIdentityModalAtom)

  const { setSearchQuery, identities, handleInput } = useIdentityServerSearch()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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

  useEffect(() => {
    if (tagFetcher.state === 'idle' && tagFetcher.data !== undefined) {
      const result = tagFetcher.data.result
      if (result === '0') {
        logger('in fetcher: valid')

        setInvalidIdentities((prev) =>
          prev.filter((id) => id !== tagFetcher?.data?.subjectId),
        )
      } else {
        logger('in fetcher: invalid')
        setInvalidIdentities((prev) => {
          const subjectId = tagFetcher?.data?.subjectId
          return subjectId
            ? prev.includes(subjectId)
              ? prev
              : [...prev, subjectId]
            : prev
        })
      }
    }
  }, [tagFetcher.state, tagFetcher.data, setInvalidIdentities])

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
      <div className="mt-4 space-y-2">
        {selectedIdentities.map((identity, index) => (
          <div
            className="flex items-center justify-between gap-2.5"
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
                className={
                  invalidIdentities.includes(identity.vault_id)
                    ? 'border-red-500 hover:border-red-500'
                    : ''
                }
              >
                <Trunctacular value={identity.display_name} />
              </IdentityTag>
              {invalidIdentities.includes(identity.vault_id) && (
                <ErrorList
                  errors={['Selected identity already exists in this list.']}
                />
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveIdentity(identity.vault_id)}
              className="border-none"
            >
              <Icon name="cross-large" className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {selectedIdentities.length < maxIdentitiesToAdd && (
          <div className="flex flex-row items-center gap-3">
            <Text
              variant="body"
              weight="medium"
              className="text-secondary-foreground/30 w-2"
            >
              {selectedIdentities.length + 1}.
            </Text>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
                  // existingIdentityIds={identities.map((id) => id.vault_id)}
                  onIdentitySelect={handleIdentitySelect}
                  onValueChange={setSearchQuery}
                  onInput={handleInput}
                  shouldFilter={false}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      {invalidIdentities.length !== 0 && (
        <div className="mt-4">
          <ErrorList errors={['Selection(s) already exist on this list.']} />
        </div>
      )}
    </div>
  )
}
