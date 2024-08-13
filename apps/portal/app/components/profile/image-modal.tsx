import {
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  IdentityTag,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

export interface ImageModalProps {
  // imageSrc: string
  // displayName: string
  identity: IdentityPresenter
  open?: boolean
  onClose: () => void
}

export default function ImageModal({
  // displayName,
  // imageSrc,
  identity,
  open,
  onClose,
}: ImageModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="bg-neutral-950 rounded-xl shadow border border-solid border-black/10 h-[550px] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <IdentityTag
              imgSrc={identity?.user?.image ?? identity?.image}
              variant={identity?.user ? 'user' : 'non-user'}
            >
              <Trunctacular
                value={
                  identity?.user?.display_name ??
                  identity?.display_name ??
                  'Identity'
                }
              />
            </IdentityTag>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center w-full h-full p-4">
          <div
            className={cn(
              'relative w-full h-full max-w-[80vw] max-h-[80vh]',
              'sm:max-w-[60vw] sm:max-h-[60vh]',
            )}
          >
            <img
              src={identity?.user?.image ?? identity?.image ?? ''}
              alt="Profile"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
