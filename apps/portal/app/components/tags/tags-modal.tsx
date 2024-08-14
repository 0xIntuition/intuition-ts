import { useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import AlertDialog from '@components/alert-dialog'

import { TagsForm } from './tags-form'

export interface TagsModalProps {
  identity: IdentityPresenter
  userWallet: string
  open?: boolean
  mode: 'view' | 'add'
  onClose: () => void
  onSuccess?: () => void
}

export default function TagsModal({
  identity,
  userWallet,
  mode,
  open,
  onClose,
  onSuccess,
}: TagsModalProps) {
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [isTransactionComplete, setIsTransactionComplete] = useState(false)

  const handleCloseAttempt = () => {
    if (isTransactionComplete) {
      onClose()
    } else {
      setShowAlertDialog(true)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleCloseAttempt}>
        <DialogContent className="h-[550px]">
          <TagsForm
            identity={identity}
            userWallet={userWallet}
            mode={mode}
            onClose={onClose}
            onSuccess={() => {
              setIsTransactionComplete(true)
              onSuccess?.()
            }}
          />
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
        onClose={onClose}
      />
    </>
  )
}
