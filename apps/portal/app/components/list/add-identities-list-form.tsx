import { useState } from 'react'

import {
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
import { TransactionActionType, TransactionStateType } from 'types/transaction'

import { AddIdentities } from './add-identities'

interface AddIdentitiesListFormProps {
  identity: IdentityPresenter
  onSuccess?: () => void
  onClose: () => void
}

export function AddIdentitiesListForm({
  identity,

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

  const existingIdentityIds = identity.tags
    ? identity.tags.map((tag) => tag.identity_id)
    : []

  const handleAddIdentity = (selectedIdentity: IdentityPresenter) => {
    if (selectedIdentities.length < MAX_IDENTITIES_TO_ADD) {
      setSelectedIdentities([...selectedIdentities, selectedIdentity])
    }
  }

  const handleRemoveIdentity = (index: number) => {
    setSelectedIdentities(selectedIdentities.filter((_, i) => i !== index))
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
                selectedIdentities={selectedIdentities}
                onAddIdentity={handleAddIdentity}
                onRemoveIdentity={handleRemoveIdentity}
                maxIdentitiesToAdd={MAX_IDENTITIES_TO_ADD}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
