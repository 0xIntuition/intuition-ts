import { Dialog, DialogContent } from '@0xintuition/1ui'

import { CreateIdentityForm } from './create-identity-form'

export interface CreateIdentityModalProps {
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateProfileModal({
  open,
  onClose,
  onSuccess,
}: CreateIdentityModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="w-[600px] bg-neutral-950 rounded-xl shadow border border-solid border-black/10">
        <CreateIdentityForm onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
