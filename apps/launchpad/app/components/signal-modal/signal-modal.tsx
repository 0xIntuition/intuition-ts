import { useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'

import { AtomType, TripleType } from 'app/types'
import { ClientOnly } from 'remix-utils/client-only'

import { SignalStep } from './signal-step'

export interface SignalModalProps {
  isOpen: boolean
  onClose: () => void
  vaultId: string
  atom?: AtomType
  triple?: TripleType
  mode: 'deposit' | 'redeem'
  setMode: (mode: 'deposit' | 'redeem') => void
  initialTicks?: number
  isSimplifiedRedeem?: boolean
}

export function SignalModal({
  isOpen,
  onClose,
  vaultId,
  atom,
  triple,
  initialTicks,
  isSimplifiedRedeem,
}: Omit<SignalModalProps, 'mode' | 'setMode'>) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = () => {
    onClose()
  }

  return (
    <ClientOnly>
      {() => (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[600px] p-0">
            <SignalStep
              vaultId={vaultId}
              counterVaultId={triple?.counter_vault_id?.toString()}
              atom={atom}
              triple={triple}
              setTxState={() => {
                // We don't need to track tx state in simplified mode
              }}
              onStakingSuccess={handleSuccess}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              open={isOpen}
              initialTicks={initialTicks}
              isSimplifiedRedeem={isSimplifiedRedeem}
            />
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
