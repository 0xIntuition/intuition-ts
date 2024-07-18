import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  QuestCriteriaCard,
  QuestCriteriaStatus,
  QuestCriteriaType,
  QuestStatusCard,
  Text,
} from '@0xintuition/1ui'

import questPlaceholder from '@assets/quest-placeholder.png'
import { MDXContent } from '@content-collections/mdx/react'
import { getQuestContentBySlug } from '@lib/utils/quest'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { generateRandomQuests } from 'types/quest-temp'

export async function loader() {
  const quest = generateRandomQuests(1)[0] // MOCK
  const questContent = getQuestContentBySlug(`${quest.id}-main`)
  const questClosing = getQuestContentBySlug(`${quest.id}-closing`)
  return json({
    quest,
    questContent,
    questClosing,
  })
}

export default function Quests() {
  const { quest, questContent, questClosing } = useLoaderData<typeof loader>()
  // const questContent = getQuestContentBySlug(quest.id)

  return (
    <div className="px-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-10 mb-5">
        <img
          src={questPlaceholder}
          alt="Quest Placeholder"
          className="object-cover w-full h-[350px] border-x border-b border-border/20 rounded-b-lg"
        />
        <div className="flex flex-col gap-10">
          <Link to="/app/quest">
            <Button variant={ButtonVariant.secondary} className="w-fit">
              <div className="flex items-center gap-2">
                <Icon name={IconName.arrowLeft} />
              </div>
            </Button>
          </Link>
          <div className="flex items-bottom justify-between w-full">
            <Text variant="heading4" weight="medium">
              {quest.title}
            </Text>
            <QuestStatusCard status={quest.status} />
          </div>

          <Text variant="bodyLarge" className="text-foreground/50">
            The island of identity beckons. But what secrets will you uncover?
            As you explore the shores of your digital self, you&apos;ll discover
            hidden coves of knowledge and secrets waiting to be uncovered. Will
            you uncover the truth about your digital identity? Each task unlocks
            new learnings and earns you points.
          </Text>
          <QuestCriteriaCard
            title={quest.title}
            criteria={
              {
                status: QuestCriteriaStatus.notStarted,
                criteria: 'Placeholder for quest criteria',
              } as QuestCriteriaType
            }
            questStatus={quest.status}
            points={quest.points}
          />
        </div>
        {questContent.body && (
          <div className="flex flex-col gap-5 py-5">
            <MDXContent
              code={questContent.body}
              components={{
                h1: (props) => (
                  <Text variant="headline" weight="medium" {...props} />
                ),
                p: (props) => (
                  <Text
                    variant="bodyLarge"
                    className="text-foreground/50"
                    {...props}
                  />
                ),
              }}
            />
          </div>
        )}
        <div className="bg-warning/5 rounded-lg theme-border p-5 flex justify-center align-items h-96 border-warning/30 border-dashed text-warning/30 text-bold">
          Quest Activity
        </div>
        {questClosing.body && (
          <div className="flex flex-col gap-5 py-5">
            <MDXContent
              code={questClosing.body}
              components={{
                h1: (props) => (
                  <Text variant="headline" weight="medium" {...props} />
                ),
                p: (props) => (
                  <Text
                    variant="bodyLarge"
                    className="text-foreground/50"
                    {...props}
                  />
                ),
              }}
            />
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full gap-2 pb-20">
          <Button variant={ButtonVariant.primary} size={ButtonSize.lg}>
            Complete Quest
          </Button>
          <Text variant="bodyLarge" className="text-foreground/50">
            +{quest.points} Points
          </Text>
        </div>
      </div>
    </div>
  )
}
