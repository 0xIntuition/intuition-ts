import { PageHeader } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { QuestCard } from '@components/quest-card'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

const QUESTS = [
  {
    title: 'What are your preferences?',
    description: 'Answer questions about your preferences to earn IQ!',
    link: '/quests/questions',
    enabled: true,
    index: 1,
  },
  {
    title: 'What are your preferences?',
    description: 'Answer questions about your preferences to earn IQ!',
    link: '/quests/preferences',
    enabled: false,
    index: 2,
  },
]

export default function Quests() {
  return (
    <>
      <PageHeader title="Quests" />

      <div className="flex flex-col gap-6">
        {QUESTS.map((quest) => (
          <QuestCard
            key={quest.link}
            title={quest.title}
            description={quest.description}
            link={quest.link}
            enabled={quest.enabled}
            index={quest.index}
          />
        ))}
      </div>
    </>
  )
}
