import { useState } from 'react'

import { Button, Text, TextVariant } from '@0xintuition/1ui'

import CreateAtomModal from '@components/create-atom-modal'
import LoadingLogo from '@components/loading-logo'
import { Search } from '@components/search'

import { Topic } from './types'

interface TopicsStepProps {
  topics: Topic[]
  isLoadingList: boolean
  onToggleTopic: (id: string) => void
  onNext: () => void
  onBack: () => void
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TopicsStep({
  topics,
  isLoadingList,
  onToggleTopic,
  onNext,
  onBack,
  onSearchChange,
}: TopicsStepProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasSelection = topics.some((t) => t.selected)

  return (
    <>
      <div className="p-8">
        <div className="flex flex-col gap-8">
          <Text variant="headline" className="text-center">
            What is your preferred Web3 Wallet?
          </Text>
          <Search handleSearchChange={onSearchChange} />
          {isLoadingList ? (
            <div className="flex justify-center items-center h-full animate-spin">
              <LoadingLogo size={50} />
            </div>
          ) : topics.length > 0 ? (
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
                  <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
                    {topic.image && (
                      <img
                        src={topic.image}
                        alt={topic.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-white text-base leading-5">
                      {topic.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center h-full w-full">
              <Text variant={TextVariant.bodyLarge}>No atoms found.</Text>
              <div className="flex flex-row gap-2 items-center">
                <Text
                  variant={TextVariant.body}
                  className="italic text-primary/70"
                >
                  Would you like to create one?
                </Text>
                <Button variant="secondary" onClick={() => setIsOpen(true)}>
                  Create
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
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
      <CreateAtomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
