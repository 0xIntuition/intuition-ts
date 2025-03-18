import { Dialog, DialogContent } from '@0xintuition/1ui'

import { Atom } from 'app/types/atom'
import { Triple } from 'app/types/triple'

import { TagsForm } from './tags-form'

export interface TagsModalProps {
  identity: Atom
  tagClaims: Triple[]
  userWallet: string
  open?: boolean
  mode: 'view' | 'add'
  readOnly?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function TagsModal({
  identity,
  tagClaims,
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
            tagClaims={tagClaims}
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
