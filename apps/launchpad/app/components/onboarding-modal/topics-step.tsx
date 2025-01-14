import { Button, Text } from '@0xintuition/1ui'

import { Search } from '@components/search'
import { Loader2Icon } from 'lucide-react'

import { Topic } from './types'

interface TopicsStepProps {
  topics: Topic[]
  isLoadingList: boolean
  onToggleTopic: (id: string) => void
  onNext: () => void
  onBack: () => void
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const WALLETS = [
  { id: 'metamask', name: 'MetaMask' },
  { id: 'coinbase', name: 'Coinbase Wallet' },
  { id: 'rainbow', name: 'Rainbow' },
  { id: 'trust', name: 'Trust Wallet' },
]

export function TopicsStep({
  topics,
  isLoadingList,
  onToggleTopic,
  onNext,
  onBack,
  onSearchChange,
}: TopicsStepProps) {
  return (
    <div className="p-8">
      <Text variant="headline" className="text-center mb-8">
        What is your preferred Web3 Wallet?
      </Text>
      <Search handleSearchChange={onSearchChange} />
      <div className="grid grid-cols-2 gap-4">
        {isLoadingList ? (
          <div className="flex justify-center items-center h-full">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          topics.map((topic) => (
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
          ))
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
          disabled={!selectedWallet}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
