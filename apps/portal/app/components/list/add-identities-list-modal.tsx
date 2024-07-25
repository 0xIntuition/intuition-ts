import { Dialog, DialogContent } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

export interface AddIdentitiesListModalProps {
  identity: IdentityPresenter
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddIdentitiesListModal({
  identity,
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
        <div>
          <pre>test</pre>
        </div>
        {/* <TagsForm
          identity={identity}
          mode={mode}
          onClose={onClose}
          onSuccess={onSuccess}
        /> */}
      </DialogContent>
    </Dialog>
  )
}
