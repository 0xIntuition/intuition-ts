import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { TagsForm } from './tags-form'

export interface TagsModalProps {
  identity: IdentityPresenter
  userWallet: string
  open?: boolean
  mode: 'view' | 'add'
  readOnly?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function TagsModal({
  identity,
  userWallet,
  open,
  mode,
  readOnly = false,
  onClose,
  onSuccess,
}: TagsModalProps) {
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          onClose?.()
        }}
      >
        <DialogContent className="h-[550px]">
          <TagsForm
            identity={identity}
            userWallet={userWallet}
            mode={mode}
            readOnly={readOnly}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
