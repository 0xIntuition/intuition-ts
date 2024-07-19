import { useState } from 'react'

import {
  Button,
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Identity,
  IdentityCard,
  IdentityTag,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TransactionStatusType,
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
import { useNavigate } from '@remix-run/react'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

import { AddTags } from './add-tags'
import TagsReview from './tags-review'
import { TagSearchCombobox } from './tags-search-combo-box'

interface TagsFormProps {
  identity: IdentityPresenter
  mode: 'view' | 'add'
  onSuccess?: () => void
  onClose: () => void
}

export function TagsForm({ identity, mode, onClose }: TagsFormProps) {
  const navigate = useNavigate()

  const existingTagIds = identity.tags
    ? identity.tags.map((tag) => tag.identity_id)
    : []

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

  const [selectedTags, setSelectedTags] = useState<IdentityPresenter[]>([])
  const [invalidTags, setInvalidTags] = useState<string[]>([])

  const handleAddTag = (newTag: IdentityPresenter) => {
    setSelectedTags((prevTags) => [...prevTags, newTag])
    logger('selectedTags', selectedTags)
  }

  const handleRemoveTag = (id: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag.vault_id !== id))
    setInvalidTags((prev) => prev.filter((tagId) => tagId !== id))
  }

  logger('tags on incoming identity', identity.tags)

  return (
    <>
      {!isTransactionStarted && (
        <>
          {state.status === 'idle' && (
            <>
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
              <Tabs defaultValue={mode}>
                <TabsList>
                  <TabsTrigger
                    variant="alternate"
                    value="view"
                    label="View tags"
                  />
                  <TabsTrigger
                    variant="alternate"
                    value="add"
                    label="Add tags"
                  />
                </TabsList>
                <div className="my-10">
                  <TabsContent value="add">
                    <AddTags
                      selectedTags={selectedTags}
                      existingTagIds={existingTagIds}
                      onAddTag={handleAddTag}
                      dispatch={dispatch}
                      onRemoveTag={handleRemoveTag}
                      subjectVaultId={identity.vault_id}
                      invalidTags={invalidTags}
                      setInvalidTags={setInvalidTags}
                    />
                  </TabsContent>
                </div>
                <div className="my-10">
                  <TabsContent value="view">
                    <TagSearchCombobox
                      tags={identity.tags || []}
                      shouldFilter={true}
                      />
                  </TabsContent>
                </div>
              </Tabs>
              <DialogFooter className="!justify-center !items-center mt-20">
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="primary"
                    disabled={
                      selectedTags.length === 0 || invalidTags.length !== 0
                    }
                    onClick={() => dispatch({ type: 'REVIEW_TRANSACTION' })}
                  >
                    Add Tags
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
          {state.status === 'review-transaction' && (
            <TagsReview
              dispatch={dispatch}
              subjectVaultId={identity.vault_id}
              tags={selectedTags}
            />
          )}
        </>
      )}
      {isTransactionStarted && (
        <div className="flex flex-col items-center justify-center min-h-96">
          <TransactionState
            status={state.status as TransactionStatusType}
            txHash={state.txHash}
            type="tag"
            successButton={
              state.status === 'complete' && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    navigate(`/app/identity/${identity.identity_id}`)
                    onClose()
                  }}
                >
                  View identity
                </Button>
              )
            }
          />
        </div>
      )}
    </>
  )
}
