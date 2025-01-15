import { useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'

import { STEPS, type Step } from './constants'
import { IntroStep } from './intro-step'
import { TopicsStep } from './topics-step'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>(STEPS.INTRO)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev === STEPS.INTRO) {
        return STEPS.TOPICS
      }
      return prev
    })
  }

  const handleBack = () => {
    setCurrentStep((prev) => {
      if (prev === STEPS.TOPICS) {
        return STEPS.INTRO
      }
      return prev
    })
  }

  const handleSelectWallet = (walletId: string) => {
    setSelectedWallet(walletId)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] max-w-[640px] w-full border-none">
        {currentStep === STEPS.INTRO && <IntroStep onNext={handleNext} />}
        {currentStep === STEPS.TOPICS && (
          <TopicsStep
            onNext={handleNext}
            onBack={handleBack}
            selectedWallet={selectedWallet}
            onSelectWallet={handleSelectWallet}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
