import { Button, Text } from '@0xintuition/1ui'

import { Topic } from './types'

interface SummaryStepProps {
  selectedTopics: Topic[]
  onSubmit: () => void
  isSubmitting: boolean
}

export function SummaryStep({
  selectedTopics,
  onSubmit,
  isSubmitting,
}: SummaryStepProps) {
  return (
    <div className="p-8 pb-24">
      <Text variant="headline" className="text-center mb-8">
        Your Selected Preferences
      </Text>
      <div className="bg-[#1A1A1A] rounded-lg p-6 font-mono text-sm">
        <div className="text-white mb-4">preferences/</div>
        {selectedTopics.map((topic) => {
          const selectedSubTopics = topic.subTopics.filter(
            (sub) => sub.selected,
          )
          if (selectedSubTopics.length === 0) {
            return null
          }
          return (
            <div key={topic.id} className="ml-4 mb-4">
              <div className="text-accent">├── {topic.name}/</div>
              {selectedSubTopics.map((sub, i) => (
                <div key={sub.id} className="ml-4 text-gray-400">
                  {i === selectedSubTopics.length - 1 ? '└──' : '├──'}{' '}
                  {sub.name}
                </div>
              ))}
            </div>
          )
        })}
      </div>
      <div className="absolute bottom-8 right-8">
        <Button
          variant="secondary"
          onClick={onSubmit}
          className="bg-[#1A1A1A]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding to Profile...' : 'Add Preferences to Profile'}
        </Button>
      </div>
    </div>
  )
}
