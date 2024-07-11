import { Dialog, DialogContent } from '@0xintuition/1ui'

import { TagsForm } from './tags-form'

export interface TagsModalProps {
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function TagsModal({
  open,
  onClose,
  onSuccess,
}: TagsModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="bg-neutral-950 rounded-xl shadow border border-solid border-black/10">
        <TagsForm onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
