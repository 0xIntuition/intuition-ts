import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { AddIdentitiesListForm } from './add-identities-list-form'

export interface AddIdentitiesListModalProps {
  identity: IdentityPresenter
  claimId: string
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddIdentitiesListModal({
  identity,
  claimId,
  open,
  onClose,
  onSuccess,
}: AddIdentitiesListModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="bg-neutral-950 rounded-xl shadow border border-solid border-black/10 h-[550px] overflow-hidden flex flex-col">
        <AddIdentitiesListForm
          identity={identity}
          claimId={claimId}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
