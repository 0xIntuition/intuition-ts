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
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

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
  // claimId, // leaving this in for now until we know we don't need it
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
    <div className="flex flex-col h-full w-full">
      {!isTransactionStarted && (
        <>
          {state.status === 'idle' && (
            <>
              <DialogHeader>
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
                      maxStringLength={42}
                    />
                  </IdentityTag>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col h-full mt-8">
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
            </>
          )}
          {state.status !== 'review-transaction' && (
            <DialogFooter className="!justify-center !items-center">
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="primary"
                  className="w-40"
                  onClick={() => dispatch({ type: 'REVIEW_TRANSACTION' })}
                >
                  Add Identities
                </Button>
              </div>
            </DialogFooter>
          )}
          {state.status === 'review-transaction' && (
            <div className="h-full flex flex-col">
              <AddIdentitiesReview
                dispatch={dispatch}
                objectVaultId={identity.vault_id}
                identitiesToAdd={selectedIdentities}
              />
            </div>
          )}
        </>
      )}
      {isTransactionStarted && (
        <div className="h-full flex flex-col">
          <TransactionState
            status={state.status}
            txHash={state.txHash}
            type="list"
            successButton={
              state.status === 'complete' && (
                <Button
                  type="button"
                  variant="primary"
                  className="mt-auto w-40"
                  onClick={() => {
                    onClose()
                  }}
                >
                  Close
                </Button>
              )
            }
            errorButton={
              <Button
                type="button"
                variant="primary"
                className="w-40 mt-auto"
                onClick={() => {
                  dispatch({ type: 'START_TRANSACTION' })
                }}
              >
                Retry
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}
