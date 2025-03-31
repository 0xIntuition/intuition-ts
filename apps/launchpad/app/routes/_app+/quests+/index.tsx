import { ErrorPage } from '@components/error-page'
import { PageHeader } from '@components/page-header'
import { QuestRow } from '@components/quest-row'
import { useFeatureFlags } from '@lib/providers/feature-flags-provider'
import { QUESTS } from '@lib/utils/constants'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

export default function Quests() {
  const { featureFlags } = useFeatureFlags()

  const visibleQuests = QUESTS.filter(
    (quest) =>
      quest.index === 1 ||
      quest.index === 3 ||
      featureFlags.FF_BASE_EPOCH_ENABLED === 'true',
  )

  return (
    <>
      <PageHeader
        title="The Awakening"
        subtitle="Dive into a series of experiences meant to awaken your intuition"
      />
      <div className="flex flex-col gap-6">
        {visibleQuests.map((quest) => (
          <QuestRow
            key={quest.link}
            title={quest.title}
            description={quest.description}
            link={quest.link}
            enabled={quest.enabled}
            index={quest.index}
            iqPoints={quest.index === 1 ? 100000 : undefined}
          />
        ))}
      </div>
    </>
  )
}
