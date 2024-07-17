import { useState } from 'react'

import {
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

import {
  initialTransactionState,
  transactionReducer,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import logger from '@lib/utils/logger'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

import { AddTags } from './add-tags'

// import { useFetcher } from '@remix-run/react'

interface TagsFormProps {
  identity: IdentityPresenter
  mode: 'view' | 'add'
  onSuccess?: () => void
  onClose: () => void
}

export function TagsForm({ identity, mode, onClose }: TagsFormProps) {
  logger('identity', identity)
  logger('onClose', onClose)
  // const tagsForm = useFetcher()

  const [selectedTags, setSelectedTags] = useState<IdentityPresenter[]>([])

  const handleAddTag = (newTag: IdentityPresenter) => {
    setSelectedTags((prevTags) => [...prevTags, newTag])
    logger('selectedTags', selectedTags)
  }

  const handleRemoveTag = (id: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag.vault_id !== id))
  }

  const { state } = useTransactionState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTransactionState)

  const isTransactionStarted = [
    'approve',
    'awaiting',
    'confirm',
    'review-transaction',
    'transaction-pending',
    'transaction-confirmed',
    'complete',
    'error',
  ].includes(state.status)

  return (
    <>
      <>
        {!isTransactionStarted && (
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
                <TabsTrigger variant="alternate" value="add" label="Add tags" />
              </TabsList>
              <div className="my-10">
                <TabsContent value="add">
                  <AddTags
                    selectedTags={selectedTags}
                    onAddTag={handleAddTag}
                    onRemoveTag={handleRemoveTag}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </>
        )}
      </>
    </>
  )
}
