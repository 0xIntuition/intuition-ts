import { useState } from 'react'

import { PageHeader } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { LevelProgress } from '@components/level-progress'
import { OnboardingModal } from '@components/onboarding-modal/onboarding-modal'
import { PortfolioStats } from '@components/portfolio-stats'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(true)

  const portfolioStats = {
    value: 0.0,
    change: 0.0,
    points: 0,
  }

  const skill = {
    name: 'Protocol',
    points: 25400,
  }

  return (
    <>
      <PageHeader title="Dashboard" />
      <PortfolioStats stats={portfolioStats} />
      <LevelProgress
        skill={skill}
        levels={[
          { name: 'Novice', pointsThreshold: 1000 },
          { name: 'Apprentice', pointsThreshold: 5000 },
          { name: 'Adept', pointsThreshold: 10000 },
          { name: 'Expert', pointsThreshold: 20000 },
          { name: 'Master', pointsThreshold: 35000 },
          { name: 'Grandmaster', pointsThreshold: 50000 },
        ]}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[400px] rounded-xl bg-background/5 border border-border/10" />
        <div className="h-[400px] rounded-xl bg-background/5 border border-border/10" />
      </div>
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </>
  )
}
