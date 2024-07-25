import { useEffect, useState } from 'react'

import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  IdentityTag,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import {
  initialTransactionState,
  transactionReducer,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

import { AddIdentities } from './add-identities'
import AddIdentitiesReview from './add-identities-review'

interface AddIdentitiesListFormProps {
  identity: IdentityPresenter
  claimId: string
  onSuccess?: () => void
  onClose: () => void
}

export function AddIdentitiesListForm({
  identity,
  claimId,
  onClose,
}: AddIdentitiesListFormProps) {
  const { state, dispatch } = useTransactionState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTransactionState)

  const isTransactionStarted = [
    'approve',
    'awaiting',
    'confirm',
    'transaction-pending',
    'transaction-confirmed',
    'complete',
    'error',
  ].includes(state.status)

  const [selectedIdentities, setSelectedIdentities] = useState<
    IdentityPresenter[]
  >([])

  const MAX_IDENTITIES_TO_ADD = 5

  // const existingIdentityIds = identity.tags
  //   ? identity.tags.map((tag) => tag.identity_id)
  //   : []

  const [invalidIdentities, setInvalidIdentities] = useState<string[]>([])

  const handleAddIdentity = (selectedIdentity: IdentityPresenter) => {
    if (selectedIdentities.length < MAX_IDENTITIES_TO_ADD) {
      setSelectedIdentities([...selectedIdentities, selectedIdentity])
    }
  }

  const handleRemoveIdentity = (vaultId: string) => {
    setSelectedIdentities(
      selectedIdentities.filter((identity) => identity.vault_id !== vaultId),
    )
    setInvalidIdentities((prev) =>
      prev.filter((invalidId) => invalidId !== vaultId),
    )
  }

  return (
    <div className="flex flex-col h-full">
      {!isTransactionStarted && (
        <>
          {state.status === 'idle' && (
            <div>
              <DialogHeader className="py-4">
                <DialogTitle>
                  <IdentityTag
                    imgSrc={identity?.user?.image ?? identity?.image}
                    variant={identity?.user ? 'user' : 'non-user'}
                  >
                    <Trunctacular
                      value={
                        identity?.user?.display_name ??
                        identity?.display_name ??
                        'Identity'
                      }
                    />
                  </IdentityTag>
                </DialogTitle>
              </DialogHeader>
              <AddIdentities
                objectVaultId={identity.vault_id}
                selectedIdentities={selectedIdentities}
                onAddIdentity={handleAddIdentity}
                onRemoveIdentity={handleRemoveIdentity}
                maxIdentitiesToAdd={MAX_IDENTITIES_TO_ADD}
                invalidIdentities={invalidIdentities}
                setInvalidIdentities={setInvalidIdentities}
              />
            </div>
          )}
          {state.status !== 'review-transaction' && (
            <div className="mt-auto py-4 bg-neutral-950">
              <DialogFooter className="!justify-center !items-center">
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="primary"
                    disabled={
                      selectedIdentities.length === 0 ||
                      invalidIdentities.length !== 0
                    }
                    onClick={() => dispatch({ type: 'REVIEW_TRANSACTION' })}
                  >
                    Add Identities
                  </Button>
                </div>
              </DialogFooter>
            </div>
          )}
          {state.status === 'review-transaction' && (
            <AddIdentitiesReview
              dispatch={dispatch}
              objectVaultId={identity.vault_id}
              identitiesToAdd={selectedIdentities}
            />
          )}
        </>
      )}
    </div>
  )
}
