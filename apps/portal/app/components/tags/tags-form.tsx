import { useState } from 'react'

import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  IdentityTag,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
import { PATHS } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

import { AddTags } from './add-tags'
import TagsReview from './tags-review'
import { TagSearchCombobox } from './tags-search-combo-box'

interface TagsFormProps {
  identity: IdentityPresenter
  userWallet: string
  mode: 'view' | 'add'
  onSuccess?: () => void
  onClose: () => void
}

export function TagsForm({
  identity,
  userWallet,
  mode,
  onClose,
}: TagsFormProps) {
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState(mode)

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
  const [invalidTags, setInvalidTags] = useState<IdentityPresenter[]>([])

  const handleAddTag = (newTag: IdentityPresenter) => {
    setSelectedTags((prevTags) => [...prevTags, newTag])
    logger('selectedTags', selectedTags)
  }

  const handleRemoveTag = (id: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag.vault_id !== id))
  }

  const handleRemoveInvalidTag = (vaultId: string) => {
    setInvalidTags((prev) => prev.filter((tag) => tag.vault_id !== vaultId))
    setSelectedTags((prev) => prev.filter((tag) => tag.vault_id !== vaultId))
  }

  logger('tags on incoming identity', identity.tags)

  return (
    <div className="flex flex-col h-full">
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
              <Tabs
                defaultValue={mode}
                onValueChange={(value) =>
                  setCurrentTab(value as 'view' | 'add')
                }
                className="flex flex-col flex-grow"
              >
                <TabsList className="pb-10">
                  <TabsTrigger
                    variant="alternate"
                    value="view"
                    label="Exisiting Tags"
                  />
                  <TabsTrigger
                    variant="alternate"
                    value="add"
                    label="Add Tags"
                  />
                </TabsList>
                <div className="flex-grow overflow-y-auto overflow-x-visible">
                  <TabsContent value="add" className="h-full">
                    <AddTags
                      selectedTags={selectedTags}
                      existingTagIds={existingTagIds}
                      identity={identity}
                      userWallet={userWallet}
                      onAddTag={handleAddTag}
                      dispatch={dispatch}
                      onRemoveTag={handleRemoveTag}
                      onRemoveInvalidTag={handleRemoveInvalidTag}
                      subjectVaultId={identity.vault_id}
                      invalidTags={invalidTags}
                      setInvalidTags={setInvalidTags}
                    />
                  </TabsContent>
                  <TabsContent value="view" className="h-full">
                    <TagSearchCombobox
                      tags={identity.tags || []}
                      shouldFilter={true}
                    />
                  </TabsContent>
                </div>
              </Tabs>
              {currentTab === 'add' && (
                <div className="mt-auto py-4 bg-neutral-950">
                  <DialogFooter className="!justify-center !items-center">
                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="primary"
                        disabled={selectedTags.length === 0}
                        onClick={() => dispatch({ type: 'REVIEW_TRANSACTION' })}
                      >
                        Add Tags
                      </Button>
                    </div>
                  </DialogFooter>
                </div>
              )}
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
        <div className="flex flex-col items-center justify-center flex-grow">
          <TransactionState
            status={state.status}
            txHash={state.txHash}
            type="tag"
            successButton={
              state.status === 'complete' && (
                <Button
                  type="button"
                  variant="primary"
                  className="w-40"
                  onClick={() => {
                    navigate(`${PATHS.IDENTITY}/${identity.id}`)
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
    </div>
  )
}
