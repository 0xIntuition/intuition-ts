import { Dialog, DialogContent } from '@0xintuition/1ui'

import { TagsForm } from './tags-form'

export interface TagsModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  identity: any // TODO: (ENG-4782) temporary type fix until we lock in final types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tagClaims: any[] // TODO: (ENG-4782) temporary type fix until we lock in final types
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
