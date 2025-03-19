import { Dialog, DialogContent } from '@0xintuition/1ui'

import { Atom } from 'app/types/atom'

import { AddIdentitiesListForm } from './add-identities-list-form'

export interface AddIdentitiesListModalProps {
  identity: Atom
  userWallet: string
  claimId?: string
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddIdentitiesListModal({
  identity,
  userWallet,
  claimId,
  open,
  onClose,
  onSuccess,
}: AddIdentitiesListModalProps) {
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          onClose?.()
        }}
      >
        <DialogContent className="h-[550px]">
          <AddIdentitiesListForm
            identity={identity}
            userWallet={userWallet}
            claimId={claimId}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
