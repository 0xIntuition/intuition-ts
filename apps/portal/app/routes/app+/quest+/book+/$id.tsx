import {
  ProgressCard,
  QuestCard,
  QuestCriteriaStatus,
  QuestStatus,
  Text,
} from '@0xintuition/1ui'

import questPlaceholder from '@assets/quest-placeholder.png'
import questThumbnailPlaceholder from '@assets/quest-thumbnail-placeholder.png'
import { json } from '@remix-run/node'
import { Link } from '@remix-run/react'

export async function loader() {
  return json({})
}

export default function Quests() {
  function pickRandomQuestStatus() {
    const statuses = Object.values(QuestStatus)
    return statuses[Math.floor(Math.random() * statuses.length)]
  }
  function pickRandomQuestCriteriaStatus() {
    const statuses = Object.values(QuestCriteriaStatus)
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
      <div className="space-y-10 mb-5">
        <img
          src={questPlaceholder}
          alt="Quest Placeholder"
          className="object-cover w-full h-[350px] border-x border-b border-border/20 rounded-b-lg"
        />
        <div className="flex flex-col gap-5">
          <Text variant="heading4" weight="medium">
            Quest Title
          </Text>
          <Text variant="bodyLarge" className="text-foreground/50">
            The island of identity beckons. But what secrets will you uncover?
            As you explore the shores of your digital self, you&apos;ll discover
            hidden coves of knowledge and secrets waiting to be uncovered. Will
            you uncover the truth about your digital identity? Each task unlocks
            new learnings and earns you points.
          </Text>
          <ProgressCard
            title="Quest Progress"
            numberCompleted={5}
            numberTotal={10}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Text variant="headline">Chapters</Text>

        <div className="flex flex-col gap-10">
          {[...Array(5)].map((_, i) => (
            <Link to={`/app/quest/chapter/${i}`} key={`${i}-quest-card`}>
              <div>
                <QuestCard
                  imgSrc={questThumbnailPlaceholder}
                  title="Create Identity"
                  description="1 Sentence Summary. I'm baby blue bottle shabby chic cred, meggings cliche ugh migas."
                  questStatus={pickRandomQuestStatus()}
                  label={`Chapter ${i + 1}`}
                  points={69}
                  questCriteria={'Placeholder for quest criteria'}
                  questCriteriaStatus={pickRandomQuestCriteriaStatus()}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
