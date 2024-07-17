import { Dialog, DialogContent } from '@0xintuition/1ui'
import { UserPresenter } from '@0xintuition/api'

import { EditProfileForm } from './form'

export interface EditProfileModalProps {
  userObject: UserPresenter
  open?: boolean
  setUserObject: (userObject: UserPresenter) => void
  onClose: () => void
  onSuccess?: () => void
}

export default function EditProfileModal({
  userObject,
  open,
  setUserObject,
  onClose,
}: EditProfileModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose?.()
        }
      }}
    >
      <DialogContent className="w-[600px] bg-neutral-950 rounded-xl shadow border border-solid border-black/10">
        <EditProfileForm
          userObject={userObject}
          setUserObject={setUserObject}
          onSuccess={() => {
            onClose()
          }}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
