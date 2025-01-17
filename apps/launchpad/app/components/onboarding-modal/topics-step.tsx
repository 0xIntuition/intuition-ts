import {
  Avatar,
  Button,
  IconName,
  ScrollArea,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import LoadingLogo from '@components/loading-logo'
import { Search } from '@components/search'
import { Book } from 'lucide-react'

import { Topic } from './types'

interface TopicsStepProps {
  topics: Topic[]
  isLoadingList: boolean
  onToggleTopic: (id: string) => void
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCreateClick: () => void
}

export function TopicsStep({
  topics,
  isLoadingList,
  onToggleTopic,
  onSearchChange,
  onCreateClick,
}: TopicsStepProps) {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4 pb-5">
          <div className="space-y-1">
            <Text variant="headline" className="font-semibold">
              What is your preferred Web3 Wallet?
            </Text>
            <Text
              variant={TextVariant.footnote}
              className="text-primary/70 flex flex-row gap-1 items-center"
            >
              <Book className="h-4 w-4 text-primary/70" />
              Select your preferred wallet from the list below.
            </Text>
          </div>
        </div>
        <Search handleSearchChange={onSearchChange} />
        {isLoadingList ? (
          <div className="flex flex-col gap-4 justify-center items-center h-[350px]">
            <LoadingLogo size={50} />
            <div className="flex flex-col items-center gap-1">
              <Text variant={TextVariant.bodyLarge}>Loading your atoms...</Text>
              <Text
                variant={TextVariant.body}
                className="italic text-primary/70"
              >
                This will only take a moment.
              </Text>
            </div>
          </div>
        ) : topics.length > 0 ? (
          <ScrollArea className="h-[350px]">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 justify-items-center w-full">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => onToggleTopic(topic.id)}
                    aria-pressed={topic.selected}
                    aria-label={`Select ${topic.name} category`}
                    className={`flex items-center gap-4 rounded-lg border transition-colors w-full md:w-[280px] h-[72px] ${
                      topic.selected
                        ? 'border-accent bg-accent/10'
                        : 'border-[#1A1A1A] hover:border-accent'
                    }`}
                  >
                    <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
                      {topic.image && (
                        <Avatar
                          src={topic.image}
                          name={topic.name}
                          icon={IconName.wallet}
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
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center h-[350px] w-full">
            <Text variant={TextVariant.bodyLarge}>No atoms found.</Text>
            <div className="flex flex-row gap-2 items-center">
              <Text
                variant={TextVariant.body}
                className="italic text-primary/70"
              >
                Would you like to create one?
              </Text>
              <Button variant="secondary" onClick={onCreateClick}>
                Create
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
