import { QuestHeaderCard } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ProfileOverview() {
  const { message } = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  logger('message from profile overview loader', message)

  return (
    <div className="flex flex-col gap-10 mt-10">
      <QuestHeaderCard
        title="Primitive Island"
        subtitle="Continue your journey."
        numberOfCompletedQuests={1}
        totalNumberOfQuests={10}
        onButtonClick={() => navigate('/app/quests')} // we can change this as we lock in the quests route struture
      />
      <h2>About</h2>
      <h2>User Stats</h2>
    </div>
  )
}
