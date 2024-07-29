import { useRef } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'

import { useFetcher } from '@remix-run/react'

import { CreateClaimForm } from './create-claim-form'

export interface CreateClaimModalProps {
  userWallet: string
  open: boolean
  onClose: () => void
}

export default function CreateClaimModal({
  userWallet,
  open,
  onClose,
}: CreateClaimModalProps) {
  const fetchReval = useFetcher()
  const formRef = useRef(null)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col min-w-[640px] h-[468px]">
        <div className="flex-grow overflow-y-auto">
          <CreateClaimForm
            fetchReval={fetchReval}
            formRef={formRef}
            wallet={userWallet}
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
