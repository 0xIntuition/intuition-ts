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

// import ErrorList from '@components/error-list'
import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'
import { createIdentityModalAtom } from '@lib/state/store'
// import {
//   TAG_PREDICATE_VAULT_ID_TESTNET,
//   TAG_RESOURCE_ROUTE,
// } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
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
  onRemoveIdentity: (index: number) => void
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
              >
                <Trunctacular value={identity.display_name} />
              </IdentityTag>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveIdentity(index)}
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
                  onIdentitySelect={onAddIdentity}
                  onValueChange={setSearchQuery}
                  onInput={handleInput}
                  shouldFilter={false}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  )
}
