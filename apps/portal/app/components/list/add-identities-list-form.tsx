import { useState } from 'react'

import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  IdentityTag,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { TransactionState } from '@components/transaction-state'
import {
  initialTransactionState,
  transactionReducer,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import logger from '@lib/utils/logger'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

import { AddIdentities } from './add-identities'
import AddIdentitiesReview from './add-identities-review'

interface AddIdentitiesListFormProps {
  identity: IdentityPresenter
  userWallet: string
  claimId: string
  onSuccess?: () => void
  onClose: () => void
}

export function AddIdentitiesListForm({
  identity,
  userWallet,
  // claimId,
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
    'hash',
    'error',
  ].includes(state.status)

  const [selectedIdentities, setSelectedIdentities] = useState<
    IdentityPresenter[]
  >([])

  const MAX_IDENTITIES_TO_ADD = 5

  // const existingIdentityIds = identity.tags
  //   ? identity.tags.map((tag) => tag.identity_id)
  //   : []

  const [invalidIdentities, setInvalidIdentities] = useState<
    IdentityPresenter[]
  >([])

  const handleAddIdentity = (selectedIdentity: IdentityPresenter) => {
    if (selectedIdentities.length < MAX_IDENTITIES_TO_ADD) {
      setSelectedIdentities((prev) => [...prev, selectedIdentity])
    }
  }

  const handleRemoveIdentity = (vaultId: string) => {
    setSelectedIdentities((prev) =>
      prev.filter((identity) => identity.vault_id !== vaultId),
    )
  }
  const handleRemoveInvalidIdentity = (vaultId: string) => {
    setInvalidIdentities((prev) =>
      prev.filter((identity) => identity.vault_id !== vaultId),
    )
    setSelectedIdentities((prev) =>
      prev.filter((identity) => identity.vault_id !== vaultId),
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
                identity={identity}
                userWallet={userWallet}
                selectedIdentities={selectedIdentities}
                onAddIdentity={handleAddIdentity}
                onRemoveIdentity={handleRemoveIdentity}
                maxIdentitiesToAdd={MAX_IDENTITIES_TO_ADD}
                invalidIdentities={invalidIdentities}
                setInvalidIdentities={setInvalidIdentities}
                onRemoveInvalidIdentity={handleRemoveInvalidIdentity}
              />
            </div>
          )}
          {state.status !== 'review-transaction' && (
            <div className="mt-auto py-4 bg-neutral-950">
              <DialogFooter className="!justify-center !items-center">
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="primary"
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
      {isTransactionStarted && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <TransactionState
            status={state.status}
            txHash={state.txHash}
            type="list"
            successButton={
              state.status === 'complete' && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    onClose()
                  }}
                >
                  Close
                </Button>
              )
            }
          />
        </div>
      )}
    </div>
  )
}
