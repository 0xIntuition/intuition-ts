import { Dialog, DialogContent } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { TagsForm } from './tags-form'

export interface TagsModalProps {
  identity: IdentityPresenter
  tags: ClaimPresenter[]
  userWallet: string
  open?: boolean
  mode: 'view' | 'add'
  readOnly?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function TagsModal({
  identity,
  tags,
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
            tags={tags}
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
