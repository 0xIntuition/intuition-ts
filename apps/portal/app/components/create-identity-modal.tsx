import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

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
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="w-[600px] bg-neutral-950 rounded-lg shadow theme-border">
        <IdentityForm
          onClose={onClose}
          onSuccess={onSuccess}
          successAction={successAction}
        />
      </DialogContent>
    </Dialog>
  )
}
