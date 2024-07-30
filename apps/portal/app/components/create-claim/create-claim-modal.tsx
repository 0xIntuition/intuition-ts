import { Dialog, DialogContent } from '@0xintuition/1ui'
import { ClaimPresenter } from '@0xintuition/api'

import { TransactionSuccessAction, TransactionSuccessActionType } from 'types'

import { ClaimForm } from './create-claim-form'

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
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="bg-neutral-950 rounded-xl shadow border border-solid border-black/10">
        <ClaimForm
          onClose={onClose}
          onSuccess={onSuccess}
          successAction={successAction}
          wallet={wallet}
        />
      </DialogContent>
    </Dialog>
  )
}
