import { ErrorPage } from '@components/error-page'
import { PageHeader } from '@components/page-header'
import { QuestRow } from '@components/quest-row'
import { QUESTS } from '@lib/utils/constants'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

export default function Quests() {
  return (
    <>
      <PageHeader
        title="The Awakening"
        subtitle="Dive into a series of experiences meant to awaken your intuition"
      />
      <div className="flex flex-col gap-6">
        {QUESTS.map((quest) => (
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
        <QuestRow
          title="Map the Ecosystems"
          description="REPLACE ME"
          link="/quests/ecosystems"
          enabled={true}
          index={3}
        />
      </div>
    </>
  )
}
