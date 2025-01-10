import { Button, Text } from '@0xintuition/1ui'

import { Topic } from './types'

interface SubTopicsStepProps {
  selectedTopics: Topic[]
  onToggleSubTopic: (topicId: string, subTopicId: string) => void
  onNext: () => void
}

export function SubTopicsStep({
  selectedTopics,
  onToggleSubTopic,
  onNext,
}: SubTopicsStepProps) {
  const hasSelection = selectedTopics.some((topic) =>
    topic.subTopics.some((sub) => sub.selected),
  )

  return (
    <div className="p-8 pb-24">
      <Text variant="headline" className="text-center mb-8">
        Select your specific interests
      </Text>
      {selectedTopics.map((topic) => (
        <div key={topic.id} className="mb-8">
          <Text variant="subtitle" className="mb-4">
            {topic.name}
          </Text>
          <div className="grid grid-cols-2 gap-4">
            {topic.subTopics.map((subTopic) => (
              <button
                key={subTopic.id}
                onClick={() => onToggleSubTopic(topic.id, subTopic.id)}
                aria-pressed={subTopic.selected}
                aria-label={`Select ${subTopic.name} from ${topic.name}`}
                className={`flex items-center gap-4 rounded-lg border transition-colors w-[280px] h-[72px] ${
                  subTopic.selected
                    ? 'border-accent bg-accent/10'
                    : 'border-[#1A1A1A] hover:border-accent'
                }`}
              >
                <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1" />
                <div className="text-left">
                  <div className="text-sm text-[#666666] mb-1">
                    {topic.name}
                  </div>
                  <div className="text-white text-base leading-5">
                    {subTopic.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 right-8">
        <Button
          variant="secondary"
          onClick={onNext}
          className="bg-[#1A1A1A]"
          disabled={!hasSelection}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
