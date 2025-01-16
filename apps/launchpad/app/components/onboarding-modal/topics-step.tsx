import { useState } from 'react'

import {
  Avatar,
  Button,
  IconName,
  ScrollArea,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import CreateAtomModal from '@components/create-atom-modal'
import LoadingLogo from '@components/loading-logo'
import { Search } from '@components/search'

import { NewAtomMetadata, Topic } from './types'

interface TopicsStepProps {
  topics: Topic[]
  isLoadingList: boolean
  onToggleTopic: (id: string) => void
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCreationSuccess: (metadata: NewAtomMetadata) => void
}

export function TopicsStep({
  topics,
  isLoadingList,
  onToggleTopic,
  onSearchChange,
  onCreationSuccess,
}: TopicsStepProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="p-8">
        <div className="flex flex-col gap-8">
          <Text variant="headline" className="text-center">
            What is your preferred Web3 Wallet?
          </Text>
          <Search handleSearchChange={onSearchChange} />
          {isLoadingList ? (
            <div className="flex justify-center items-center h-[350px] animate-spin">
              <LoadingLogo size={50} />
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
                <Button variant="secondary" onClick={() => setIsOpen(true)}>
                  Create
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <CreateAtomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreationSuccess={onCreationSuccess}
      />
    </>
  )
}
