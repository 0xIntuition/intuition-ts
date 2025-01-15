import { Dialog, DialogContent } from '@0xintuition/1ui'

import { IntroStep } from './intro-step'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] max-w-[640px] w-full border-none">
        <IntroStep onNext={() => {}} />
      </DialogContent>
    </Dialog>
  )
}
