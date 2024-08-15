import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import AlertDialog from '@components/alert-dialog'
import useHandleCloseAttempt from '@lib/hooks/useHandleCloseAttempt'

import { IdentityForm } from './create-identity-form'

export interface CreateIdentityModalProps {
  open?: boolean
  onClose: () => void
  onSuccess?: (identity: IdentityPresenter) => void
  successAction?: 'view' | 'close'
}

export default function CreateIdentityModal({
  open,
  onClose,
  onSuccess,
  successAction = 'view',
}: CreateIdentityModalProps) {
  const {
    showAlertDialog,
    setShowAlertDialog,
    setIsTransactionComplete,
    handleCloseAttempt,
  } = useHandleCloseAttempt(onClose)

  return (
    <>
      <Dialog open={open} onOpenChange={handleCloseAttempt}>
        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="flex flex-col max-sm:min-w-0"
        >
          <IdentityForm
            onClose={onClose}
            onSuccess={(identity) => {
              setIsTransactionComplete(true)
              onSuccess?.(identity)
            }}
            successAction={successAction}
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
