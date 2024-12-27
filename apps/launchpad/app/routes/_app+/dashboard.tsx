import { PageHeader } from '@0xintuition/1ui'

import { ChapterProgressBanner } from '@components/ChapterProgressBanner'
import { LevelProgress } from '@components/LevelProgress'
import { PortfolioStats } from '@components/PortfolioStats'

export default function Index() {
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

  const chapterProgress = {
    chapter: 'Chapter I: Genesis',
    progress: 56.6,
  }

  return (
    <>
      <ChapterProgressBanner
        chapter={chapterProgress.chapter}
        progress={chapterProgress.progress}
      />
      <div className="flex-1 p-10 max-lg:p-6">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-8">
          <PageHeader title="Dashboard" />
          <PortfolioStats stats={portfolioStats} />
          <LevelProgress progress={levelProgress} />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-[400px] rounded-xl bg-background/5 border border-border/10" />
            <div className="h-[400px] rounded-xl bg-background/5 border border-border/10" />
          </div>
        </div>
      </div>
    </>
  )
}
