import { PageHeader } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'
import { QuestRow } from '@components/quest-row'
import { QUESTS } from '@lib/utils/constants'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}

export default function Quests() {
  return (
    <>
      <PageHeader title="Quests" />

      <div className="flex flex-col gap-6">
        {QUESTS.map((quest) => (
          <QuestRow
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
