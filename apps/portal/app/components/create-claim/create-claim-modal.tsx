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
      <DialogContent className="flex flex-col w-[762px] h-[468px] gap-0">
        <ClaimForm onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
