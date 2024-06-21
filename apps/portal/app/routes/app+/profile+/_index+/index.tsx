import { QuestHeaderCard } from '@0xintuition/1ui'

import { json } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'

export async function loader() {
  const mockUserQuestsData = {
    currentQuest: {
      title: 'Primitive Island',
      subtitle: 'Continue your journey',
    },
    questsCompleted: 1,
    totalQuests: 10,
  }

  return json({
    userQuests: mockUserQuestsData,
  })
}

export default function ProfileOverview() {
  const { userQuests } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-10 mt-10">
      <QuestHeaderCard
        title={userQuests.currentQuest.title}
        subtitle={userQuests.currentQuest.subtitle}
        numberOfCompletedQuests={userQuests.questsCompleted}
        totalNumberOfQuests={userQuests.totalQuests}
        onButtonClick={() => navigate('/app/quests')}
      />
      <h2 className="font-medium text-xl text-secondary-foreground">About</h2>
      <h2 className="font-medium text-xl text-secondary-foreground">
        User Stats
      </h2>
    </div>
  )
}
