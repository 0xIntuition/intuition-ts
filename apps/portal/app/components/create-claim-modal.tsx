import { Dialog, DialogContent } from '@0xintuition/1ui'

import { ClaimForm } from './create-claim-form'

// import { ClaimForm } from './create-identity-form'

export interface CreateClaimModalProps {
  open?: boolean
  wallet: string
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateClaimModal({
  open,
  wallet,
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
      <DialogContent className="flex flex-col min-w-[640px] h-[420px]">
        <ClaimForm onClose={onClose} onSuccess={onSuccess} wallet={wallet} />
      </DialogContent>
    </Dialog>
  )
}
