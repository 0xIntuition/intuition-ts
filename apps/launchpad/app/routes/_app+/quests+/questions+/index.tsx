import { Suspense } from 'react'

import { Card, Text } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { MinigameCardWrapper } from '@components/minigame-card-wrapper'
import { OnboardingModal } from '@components/onboarding-modal/onboarding-modal'
import { mockMinigames } from '@lib/data/mock-minigames'
import { onboardingModalAtom } from '@lib/state/store'
import { useAtom } from 'jotai'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

function QuestsSkeleton() {
  return (
    <div className="relative">
      <Card className="h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] blur-sm brightness-50">
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="space-y-2">
            <Text
              variant="headline"
              weight="medium"
              className="text-foreground"
            >
              Loading...
            </Text>
          </div>
        </div>
      </Card>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-background/80 px-6 py-3 rounded-lg backdrop-blur-sm">
          <span className="text-xl font-semibold text-foreground">
            Loading...
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Quests() {
  const [onboardingModal, setOnboardingModal] = useAtom(onboardingModalAtom)

  const handleStartOnboarding = (gameId: string) => {
    setOnboardingModal({ isOpen: true, gameId })
  }

  const handleCloseOnboarding = () => {
    setOnboardingModal({ isOpen: false, gameId: null })
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<QuestsSkeleton />}>
          <MinigameCardWrapper
            questionId={1}
            onStart={() => handleStartOnboarding(mockMinigames[0].id)}
          />
        </Suspense>

        <div className="relative">
          <Card className="h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] blur-sm brightness-50">
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="space-y-2">
                <Text
                  variant="headline"
                  weight="medium"
                  className="text-foreground"
                >
                  Question Two
                </Text>
                <Text
                  variant="body"
                  weight="medium"
                  className="text-foreground/70"
                >
                  Coming Soon
                </Text>
              </div>
            </div>
          </Card>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/80 px-6 py-3 rounded-lg backdrop-blur-sm">
              <span className="text-xl font-semibold text-foreground">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
      <OnboardingModal
        isOpen={onboardingModal.isOpen}
        onClose={handleCloseOnboarding}
      />
    </>
  )
}
