import { Dialog, DialogContent } from '@0xintuition/1ui'

export interface EditSocialLinksModalProps {
  open?: boolean

  onClose: () => void
}

export default function EditSocialLinksModal({
  open,

  onClose,
}: EditSocialLinksModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="w-[600px] bg-neutral-950 rounded-xl shadow border border-solid border-black/10">
        Placeholder for the edit container
      </DialogContent>
    </Dialog>
  )
}
