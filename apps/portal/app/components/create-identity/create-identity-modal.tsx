import { useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'

import { type Atom } from '../atom-forms/types'
import { CreateStep } from './create-step'

interface CreateIdentityModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (identity: Atom) => void
  wallet: `0x${string}`
}

export function CreateIdentityModal({
  isOpen,
  onClose,
  onSuccess,
  wallet,
}: CreateIdentityModalProps) {
  const [isTransactionStarted, setIsTransactionStarted] = useState(false)

  const handleSuccess = (identity: Atom) => {
    onSuccess(identity)
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && !isTransactionStarted && onClose()}
    >
      <DialogContent className="max-w-3xl">
        <CreateStep
          onSuccess={handleSuccess}
          onCancel={onClose}
          setIsTransactionStarted={setIsTransactionStarted}
          wallet={wallet}
        />
      </DialogContent>
    </Dialog>
  )
}
