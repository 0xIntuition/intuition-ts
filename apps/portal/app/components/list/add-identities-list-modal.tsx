import { useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import AlertDialog from '@components/alert-dialog'

import { AddIdentitiesListForm } from './add-identities-list-form'

export interface AddIdentitiesListModalProps {
  identity: IdentityPresenter
  userWallet: string
  claimId: string
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddIdentitiesListModal({
  identity,
  userWallet,
  claimId,
  open,
  onClose,
  onSuccess,
}: AddIdentitiesListModalProps) {
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
          <AddIdentitiesListForm
            identity={identity}
            userWallet={userWallet}
            claimId={claimId}
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
