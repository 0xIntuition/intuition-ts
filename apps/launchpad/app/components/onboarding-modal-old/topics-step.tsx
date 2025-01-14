import { Button, Text } from '@0xintuition/1ui'

import { Topic } from './types'

interface TopicsStepProps {
  topics: Topic[]
  onToggleTopic: (id: string) => void
  onNext: () => void
}

export function TopicsStep({ topics, onToggleTopic, onNext }: TopicsStepProps) {
  const hasSelection = topics.some((t) => t.selected)

  return (
    <div className="p-8 pb-24">
      <Text variant="headline" className="text-center mb-8">
        What topics interest you?
      </Text>
      <div className="grid grid-cols-2 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onToggleTopic(topic.id)}
            aria-pressed={topic.selected}
            aria-label={`Select ${topic.name} category`}
            className={`flex items-center gap-4 rounded-lg border transition-colors w-[280px] h-[72px] ${
              topic.selected
                ? 'border-accent bg-accent/10'
                : 'border-[#1A1A1A] hover:border-accent'
            }`}
          >
            <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1" />
            <div className="text-left">
              <div className="text-sm text-[#666666] mb-1">{topic.type}</div>
              <div className="text-white text-base leading-5">{topic.name}</div>
            </div>
          </button>
        ))}
      </div>
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
