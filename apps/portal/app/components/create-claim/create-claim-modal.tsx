import { useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'
import { ClaimPresenter } from '@0xintuition/api'

import AlertDialog from '@components/alert-dialog'
import { ClaimForm } from '@components/create-claim/create-claim-form'
import {
  TransactionSuccessAction,
  TransactionSuccessActionType,
} from 'app/types'

export interface CreateClaimModalProps {
  open?: boolean
  wallet: string
  onClose: () => void
  onSuccess?: (claim: ClaimPresenter) => void
  successAction?: TransactionSuccessActionType
}

export default function CreateClaimModal({
  open,
  wallet,
  onClose,
  onSuccess,
  successAction = TransactionSuccessAction.VIEW,
}: CreateClaimModalProps) {
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
        <DialogContent className="flex flex-col min-w-[640px] h-[420px] max-sm:min-w-0">
          <ClaimForm
            onClose={onClose}
            onSuccess={(claim) => {
              setIsTransactionComplete(true)
              onSuccess?.(claim)
            }}
            successAction={successAction}
            wallet={wallet}
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
