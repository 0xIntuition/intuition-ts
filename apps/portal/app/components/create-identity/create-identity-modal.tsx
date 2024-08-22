import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentityForm } from './create-identity-form'

export interface CreateIdentityModalProps {
  open?: boolean
  wallet?: string
  onClose: () => void
  onSuccess?: (identity: IdentityPresenter) => void
  successAction?: 'view' | 'close'
}

export default function CreateIdentityModal({
  open,
  wallet,
  onClose,
  onSuccess,
  successAction = 'view',
}: CreateIdentityModalProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="flex flex-col max-sm:min-w-0"
        >
          <IdentityForm
            wallet={wallet}
            onClose={onClose}
            onSuccess={(identity) => {
              onSuccess?.(identity)
            }}
            successAction={successAction}
          />
        </DialogContent>
      </Dialog>
    </> // TODO: [ENG-3436] -- Add AlertDialog interaction back in
  )
}
