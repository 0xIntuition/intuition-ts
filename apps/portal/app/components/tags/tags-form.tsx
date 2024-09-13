import { useEffect, useState } from 'react'

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
import { IdentityPresenter, TagEmbeddedPresenter } from '@0xintuition/api'

import { TransactionState } from '@components/transaction-state'
import {
  initialTransactionState,
  transactionReducer,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import { saveListModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { useNavigate } from '@remix-run/react'
import { PATHS } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { useSetAtom } from 'jotai'

import { AddTags } from './add-tags'
import TagsReview from './tags-review'
import { TagSearchCombobox } from './tags-search-combo-box'

interface TagsFormProps {
  identity: IdentityPresenter
  userWallet: string
  mode: 'view' | 'add'
  readOnly?: boolean
  onSuccess?: () => void
  onClose: () => void
}

export function TagsForm({
  identity,
  userWallet,
  mode,
  readOnly = false,
  onSuccess,
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

  const setSaveListModalActive = useSetAtom(saveListModalAtom)

  const handleTagClick = (tag: TagEmbeddedPresenter) => {
    setSaveListModalActive({
      isOpen: true,
      id: tag.vault_id,
      tag,
    })
  }

  useEffect(() => {
    if (state.status === 'complete') {
      onSuccess?.()
    }
  }, [state.status])

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
                      maxStringLength={42}
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
                    label="Existing Tags"
                  />
                  {!readOnly && (
                    <TabsTrigger
                      variant="alternate"
                      value="add"
                      label="Add Tags"
                    />
                  )}
                </TabsList>
                <div className="flex-grow overflow-y-auto overflow-x-visible">
                  {!readOnly && (
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
                  )}
                  <TabsContent value="view" className="h-full">
                    <TagSearchCombobox
                      tags={identity.tags || []}
                      shouldFilter={true}
                      onTagClick={handleTagClick}
                    />
                  </TabsContent>
                </div>
              </Tabs>
              {currentTab === 'add' && (
                <div className="mt-auto py-4">
                  <DialogFooter className="!justify-center !items-center">
                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="primary"
                        disabled={selectedTags.length === 0}
                        onClick={() => dispatch({ type: 'REVIEW_TRANSACTION' })}
                        className="w-40"
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
            <div className="h-full flex flex-col">
              <TagsReview
                dispatch={dispatch}
                subjectVaultId={identity.vault_id}
                tags={selectedTags}
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
            type="tag"
            successButton={
              state.status === 'complete' && (
                <Button
                  type="button"
                  variant="primary"
                  className="w-40"
                  onClick={() => {
                    navigate(
                      identity.is_user
                        ? `${PATHS.PROFILE}/${identity.identity_id}`
                        : `${PATHS.IDENTITY}/${identity.id}`,
                    )

                    onClose()
                  }}
                >
                  View {identity.is_user ? 'profile' : 'identity'}
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
