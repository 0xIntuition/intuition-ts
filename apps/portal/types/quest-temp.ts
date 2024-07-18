import {
  QuestCriteriaStatus,
  QuestCriteriaStatusType,
  QuestStatus,
  QuestStatusType,
} from '@0xintuition/1ui'

export type MockQuestPresenter = {
  id: string // Assuming Uuid is a string
  createdAt: Date // Assuming DateTime<Utc> is a Date
  updatedAt: Date
  points: number
  content?: string
  closingContent?: string
  summary?: string
  description?: string
  title?: string
  condition: QuestCriteriaStatusType
  status: QuestStatusType
  progress: number
  dateCompleted?: Date
  dateStarted?: Date
  total?: number
}

function getRandomEnumValue<T extends Record<string, unknown>>(
  enumObj: T,
): T[keyof T] {
  const enumValues = Object.values(enumObj) as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

export function generateRandomQuests(n: number): MockQuestPresenter[] {
  const quests: MockQuestPresenter[] = []
  for (let i = 0; i < n; i++) {
    const quest: MockQuestPresenter = {
      id: (i + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      points: Math.floor(Math.random() * 500),
      content: `Content for quest ${i + 1}`,
      closingContent: `Closing content for quest ${i + 1}`,
      summary: `Summary for quest ${i + 1}`,
      description: `Description for quest ${i + 1}`,
      title: `Quest ${i + 1}`,
      condition: getRandomEnumValue(QuestCriteriaStatus),
      status: getRandomEnumValue(QuestStatus),
      progress: Math.floor(Math.random() * 101),
      dateStarted: new Date(),
      total: Math.floor(Math.random() * 10) + 1,
    }
    quests.push(quest)
  }
  return quests
}
