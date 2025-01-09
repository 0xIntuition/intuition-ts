import { useState } from 'react'

import { PageHeader } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { DashboardLayout } from '@components/layouts/dashboard-layout'
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

  const levelProgress = {
    currentLevel: 1,
    tier: 'NOVICE' as const,
    points: 25400,
    requiredPoints: 42000,
    currentPoints: 5200,
  }

  return (
    <DashboardLayout>
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
      <PageHeader title="Dashboard" />
      <PortfolioStats stats={portfolioStats} />
      <LevelProgress progress={levelProgress} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[400px] rounded-xl bg-background/5 border border-border/10" />
        <div className="h-[400px] rounded-xl bg-background/5 border border-border/10" />
      </div>
    </DashboardLayout>
  )
}
