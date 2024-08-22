import { Dialog, DialogContent } from '@0xintuition/1ui'
import { ClaimPresenter } from '@0xintuition/api'

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
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="flex flex-col min-w-[640px] h-[420px] max-sm:min-w-0">
          <ClaimForm
            onClose={onClose}
            onSuccess={(claim) => {
              onSuccess?.(claim)
            }}
            successAction={successAction}
            wallet={wallet}
          />
        </DialogContent>
      </Dialog>
    </> // TODO: [ENG-3436] -- Add AlertDialog interaction back in
  )
}
