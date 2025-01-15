import { PageHeader } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { MinigameCard } from '@components/minigame-card'
import { OnboardingModal } from '@components/onboarding-modal/onboarding-modal'
import { mockMinigames } from '@lib/data/mock-minigames'
import { onboardingModalAtom } from '@lib/state/store'
import { useAtom } from 'jotai'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

export default function Index() {
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)

  const handleStartOnboarding = (gameId: string) => {
    setOnboardingModal({ isOpen: true, gameId })
  }

  const handleCloseOnboarding = () => {
    setOnboardingModal({ isOpen: false, gameId: null })
  }

  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="grid gap-6 md:grid-cols-2">
        <MinigameCard
          onStart={() => handleStartOnboarding(mockMinigames[0].id)}
          game={mockMinigames[0]}
        />
      </div>
      <OnboardingModal
        isOpen={onboardingModal.isOpen}
        onClose={handleCloseOnboarding}
      />
    </>
  )
}
