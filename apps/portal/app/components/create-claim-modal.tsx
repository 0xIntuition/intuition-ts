import { Dialog, DialogContent } from '@0xintuition/1ui'

import { ClaimForm } from './create-claim-form'

// import { ClaimForm } from './create-identity-form'

export interface CreateClaimModalProps {
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateClaimModal({
  open,
  onClose,
  onSuccess,
}: CreateClaimModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="bg-neutral-950 rounded-xl shadow border border-solid border-black/10">
        <ClaimForm onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
